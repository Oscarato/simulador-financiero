'use client';

import { useEffect, useState } from 'react';
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

export default function OnboardingPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    amount: '',
    captcha: '',
  });

  const [errors, setErrors] = useState<Errors>({});
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  const [submitted, setSubmitted] = useState(false);

  const generateCaptcha = () => {
    const a = Math.floor(Math.random() * 9) + 1;
    const b = Math.floor(Math.random() * 9) + 1;
    setCaptcha({ a, b, result: a + b });
  }

  useEffect(() => {
    generateCaptcha();
  }, []);

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.name.trim()) {
      newErrors.name = 'El nombre es obligatorio';
    }

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

    if (!captcha) {
      newErrors.captcha = 'Error al generar el captcha';
    } else if (!form.captcha.trim()) {
      newErrors.captcha = 'Debe resolver la operación';
    } else if (Number(form.captcha) !== captcha.result) {
      newErrors.captcha = 'La respuesta es incorrecta';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));

    setErrors(prev => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
  };

  const clear = () => {
    setForm({
      name: '',
      email: '',
      amount: '',
      captcha: '',
    })
    setSubmitted(false)
    generateCaptcha();
  } 

  return (
    <PageContainer title="Registro de intención" backHref="/">

      {submitted && (
        <div className="max-w-md border rounded-md p-7 bg-green-50 ">
          <h2 className="text-lg font-semibold mb-2">
            Solicitud enviada
          </h2>

          <p className="text-sm mb-4">
            Hemos recibido tu información correctamente. Un asesor se comunicará contigo para continuar el proceso.
          </p>

          <button
            onClick={clear}
            className="px-4 py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            Registrar otra solicitud
          </button>
        </div>
      )}

      {!submitted && (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
          {/* Nombre */}
          <div>
            <label className="block text-sm mb-1">Nombre completo</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm mb-1">Correo electrónico</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email}
              </p>
            )}
          </div>

          {/* Monto */}
          <div>
            <label className="block text-sm mb-1">Monto inicial</label>
            <input
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full p-2 rounded-md"
            />
            {errors.amount && (
              <p className="text-sm text-red-600 mt-1">
                {errors.amount}
              </p>
            )}
          </div>

          {/* Captcha */}
          {captcha && (
            <div className="border border-dashed border-[var(--border)] rounded-md p-3 bg-gray-50 ">
              <label className="block text-sm font-medium mb-2">
                Verificación de seguridad
              </label>

              <div className="text-sm mb-2">
                ¿Cuánto es <strong>{captcha.a}</strong> + <strong>{captcha.b}</strong>?
              </div>

              <input
                name="captcha"
                value={form.captcha}
                onChange={handleChange}
                className="w-full p-2 rounded-md"
              />

              {errors.captcha && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.captcha}
                </p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Enviar solicitud
          </button>
        </form>
      )
      }

    </PageContainer>
  );
}
