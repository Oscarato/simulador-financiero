/**
 * Debounce con tipado genérico estricto para evitar el error de 'any'.
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void, 
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (...args: Args) {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}