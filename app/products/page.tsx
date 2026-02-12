import products from '@/data/products.json';
import { Product } from '@/types/product';
import ProductsClient from './ProductsClient';
import PageContainer from '@/app/components/PageContainer';

// Se regenera cada 60 s
export const revalidate = 60;

export default function ProductsPage() {

  // Datos mock
  const list = products as Product[];

  return (
    <PageContainer
      title="Productos de Ahorro"
      backHref="/"
    >
      {/* plista de productos con el filtro :D */}
      <ProductsClient products={list} />
    </PageContainer>
  );
}
