export function esNumeroValido(valor: string): boolean {
  if (!valor) return false
  if (valor.includes('e')) return false

  const n = Number(valor)
  return !isNaN(n) && n > 0
}
