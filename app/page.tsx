import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-md p-6 w-full max-w-md">
        <h1 className="text-xl font-semibold mb-4 text-center">
          Simulador de Ahorro Digital
        </h1>

        <ul className="space-y-3">
          <li>
            <Link
              href="/products"
              className="block w-full text-center px-4 py-2 border rounded-md hover:border-blue-500 hover:border-3 hover:text-white transition"
            >
              Ver productos
            </Link>
          </li>

          <li>
            <Link
              href="/simulator"
              className="block w-full text-center px-4 py-2 border rounded-md hover:border-blue-500 hover:border-3 hover:text-white transition"
            >
              Simular ahorro
            </Link>
          </li>

          <li>
            <Link
              href="/onboarding"
              className="block w-full text-center px-4 py-2 border rounded-md hover:border-blue-500 hover:border-3 hover:text-white transition"
            >
              Iniciar solicitud
            </Link>
          </li>
        </ul>
      </div>
    </main>
  );
}
