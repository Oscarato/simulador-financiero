import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ReactNode } from 'react';

type Props = {
  title: string;
  backHref?: string;
  children: ReactNode;
};

export default function PageContainer({ title, backHref, children }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="bg-[var(--surface)] border border-[var(--border)] rounded-md p-6 w-full max-w-md">
        {backHref && (
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:underline"
          >
            <ArrowLeft size={16} strokeWidth={2} />
            <span>Regresar</span>
          </Link>
        )}

        <h1 className="text-xl font-semibold mt-2 text-center">
          {title}
        </h1>
        {children}
      </div>     
    </main>
  );
}
