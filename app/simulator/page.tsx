'use client';

import { useState } from 'react';
import PageContainer from '@/app/components/PageContainer';
import { calculateFutureValue } from '@/lib/simulator';

type Errors = {
  initialAmount?: string;
  monthlyAmount?: string;
  months?: string;
};

const formatCOP = (value: number) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(value);

export default function SimulatorPage() {
  const [form, setForm] = useState({
    initialAmount: '',
    monthlyAmount: '',
    months: '',
  });

  const [result, setResult] = useState<number | null>(null);
  const [errors, setErrors] = useState<Errors>({});

  const isValidNumber = (value: string) => /^\d+$/.test(value);

  const validate = () => {
    const newErrors: Errors = {};

    if (!form.initialAmount.trim()) {
      newErrors.initialAmount = 'El monto inicial es obligatorio';
    } else if (!isValidNumber(form.initialAmount)) {
      newErrors.initialAmount = 'Ingrese solo números, sin puntos ni letras';
    }

    if (!form.monthlyAmount.trim()) {
      newErrors.monthlyAmount = 'El aporte mensual es obligatorio';
    } else if (!isValidNumber(form.monthlyAmount)) {
      newErrors.monthlyAmount = 'Ingrese solo números, sin puntos ni letras';
    }

    if (!form.months.trim()) {
      newErrors.months = 'El plazo es obligatorio';
    } else if (!isValidNumber(form.months)) {
      newErrors.months = 'Ingrese solo números';
    } else if (Number(form.months) <= 0) {
      newErrors.months = 'El plazo debe ser mayor a cero';
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

    const initial = Number(form.initialAmount);
    const monthly = Number(form.monthlyAmount);
    const months = Number(form.months);

    const rate = 0.01;

    const total = calculateFutureValue(
      {
        initial,
        monthly,
        months,
        rate,
      }
    );    

    setResult(Math.round(total));
  };

  return (
    <PageContainer title="Simulador de Rentabilidad" backHref="/">
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        {/* Monto inicial */}
        <div>
          <label className="block text-sm mb-1">Monto inicial</label>
          <input
            name="initialAmount"
            value={form.initialAmount}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
          {errors.initialAmount && (
            <p className="text-sm text-red-600 mt-1">
              {errors.initialAmount}
            </p>
          )}
        </div>

        {/* Aporte mensual */}
        <div>
          <label className="block text-sm mb-1">Aporte mensual</label>
          <input
            name="monthlyAmount"
            value={form.monthlyAmount}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
          {errors.monthlyAmount && (
            <p className="text-sm text-red-600 mt-1">
              {errors.monthlyAmount}
            </p>
          )}
        </div>

        {/* Meses */}
        <div>
          <label className="block text-sm mb-1">Plazo (meses)</label>
          <input
            name="months"
            value={form.months}
            onChange={handleChange}
            className="w-full p-2 rounded-md"
          />
          {errors.months && (
            <p className="text-sm text-red-600 mt-1">
              {errors.months}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Simular
        </button>

        {result !== null && (
          <div className="mt-4 p-3 border rounded-md bg-gray-50 dark:bg-slate-900">
            <p className="text-sm">Valor estimado al final del plazo:</p>
            <p className="text-lg font-semibold">
              {formatCOP(result)}
            </p>
          </div>
        )}
      </form>
    </PageContainer>
  );
}
