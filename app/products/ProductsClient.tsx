'use client';

import { useEffect, useMemo, useState } from 'react';
import { Product } from '@/types/product';
import { debounce } from '@/lib/debounce';

type Props = {
  products: Product[];
};

export default function ProductsClient({ products }: Props) {

  // Estados para los filtros
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(products);

  const filterProducts = (value: string) => {
    const q = value.toLowerCase();
    setFiltered(
      products.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.type.toLowerCase().includes(q)
      )
    );
  };

  // Nos ayuda a evitar recrear funciones
  const debouncedFilter = useMemo(
    () => debounce(filterProducts, 300),
    [products]
  );

  useEffect(() => {
    debouncedFilter(query);
  }, [query, debouncedFilter]);

  return (
    <>
      {/* Filtro */}
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Buscar por nombre o tipo"
        className="w-full mb-4 p-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
      />

      {/* Lista de productos */}
      <ul className="space-y-3">
        {filtered.map(p => (
          <li
            key={p.id}
            className="border rounded-md p-4 bg-white hover:bg-gray-50 transition"
          >
            <div className="font-medium">{p.name}</div>
            <div className="text-sm text-gray-600">{p.type}</div>
          </li>
        ))}
      </ul>

      {filtered.length === 0 && (
        <div className="text-sm text-gray-500 mt-4">
          No se encontraron productos
        </div>
      )}
    </>
  );
}
