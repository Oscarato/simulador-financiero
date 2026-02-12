'use client';

import { useState, useCallback, useSyncExternalStore } from 'react';
import PageContainer from '@/app/components/PageContainer';

type Errors = {
  name?: string;
  email?: string;
  amount?: string;
  captcha?: string;
};

type Captcha = {
  a: number;
  b: number;
  result: number;
};

const createRandomCaptcha = (): Captcha => {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, result: a + b };
};

// Suscriptor para saber si estamos en el cliente sin usar useEffect
const subscribe = () => () => { }; // No necesitamos suscribirnos a cambios reales
const getSnapshot = () => true;    // En el cliente siempre es true
const getServerSnapshot = () => false; // En el servidor siempre es false

export default function OnboardingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    captcha: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  /**
   * SOLUCIÓN DEFINITIVA AL LINTER:
   * useSyncExternalStore es la forma recomendada por React para evitar 
   * el patrón "useEffect + setState". Le dice a React qué renderizar 
   * en el servidor vs cliente de forma segura y sin renders extra.
   */
  const isClient = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Inicialización perezosa para el captcha
  const [captcha, setCaptcha] = useState<Captcha>(() => createRandomCaptcha());

  const handleGenerateCaptcha = useCallback(() => {
    setCaptcha(createRandomCaptcha());
  }, []);

  const validate = () => {
    const newErrors: Errors = {};
    if (!form.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!form.email.trim()) {
      newErrors.email = 'El correo electrónico es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'El correo electrónico no es válido';
    }
    if (!form.amount.trim()) {
      newErrors.amount = 'El monto es obligatorio';
    } else if (Number(form.amount) <= 0) {
      newErrors.amount = 'El monto debe ser mayor a cero';
    }

    if (!form.captcha.trim()) {
      newErrors.captcha = 'Debe resolver la operación';
    } else if (Number(form.captcha) !== captcha.result) {
      newErrors.captcha = 'La respuesta es incorrecta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof Errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  };

  const clear = () => {
    setForm({ name: '', email: '', amount: '', captcha: '' });
    setErrors({});
    setSubmitted(false);
    handleGenerateCaptcha();
  };

  return (
    <PageContainer title="Registro de intención" backHref="/">
      {/* Renderizado condicional basado en useSyncExternalStore.
          Evita el error de hidratación porque React ya sabe que el 
          servidor renderizará el skeleton y el cliente el formulario real.
      */}
      {!isClient ? (
        <div className="w-full max-w-md h-96 animate-pulse bg-gray-100 dark:bg-slate-800 rounded-md" />
      ) : submitted ? (
        <div className="max-w-md border rounded-md p-7 bg-green-50 dark:bg-green-900/10">
          <h2 className="text-lg font-semibold mb-2 text-green-800 dark:text-green-200">Solicitud enviada</h2>
          <p className="text-sm mb-4 text-green-700 dark:text-green-300">Hemos recibido tu información correctamente.</p>
          <button
            onClick={clear}
            className="px-4 py-2 border rounded-md hover:bg-white dark:hover:bg-slate-800 transition-colors"
          >
            Registrar otra solicitud
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
          <div>
            <label className="block text-sm mb-1 font-medium">Nombre completo</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Correo electrónico</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-sm mb-1 font-medium">Monto inicial</label>
            <input
              name="amount"
              type="number"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 border rounded-md dark:bg-slate-900 outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.amount && <p className="text-sm text-red-600 mt-1">{errors.amount}</p>}
          </div>

          <div className="border border-dashed border-[var(--border)] rounded-md p-3 bg-gray-50 ">
            <label className="block text-sm font-semibold mb-2">Seguridad</label>
            <div className="text-sm mb-2">
              ¿Cuánto es <span className="font-bold text-blue-600">{captcha.a}</span> + <span className="font-bold text-blue-600">{captcha.b}</span>?
            </div>
            <input
              name="captcha"
              value={form.captcha}
              onChange={handleChange}
              autoComplete="off"
              className="w-full p-2 border rounded-md dark:bg-slate-900 outline-none focus:border-blue-500"
            />
            {errors.captcha && <p className="text-sm text-red-600 mt-1">{errors.captcha}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            Enviar solicitud
          </button>
        </form>
      )}
    </PageContainer>
  );
}