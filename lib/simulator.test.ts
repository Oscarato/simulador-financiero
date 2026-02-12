import { calculateFutureValue } from './simulator'

describe('Simulador de rentabilidad', () => {
  it('calcula el valor futuro con monto inicial y aportes', () => {
    const result = calculateFutureValue({
      initial: 1000000,
      monthly: 200000,
      months: 12,
      rate: 0.01,
    })

    expect(result).toBeGreaterThan(0)
  })

  it('retorna solo el monto inicial si no hay aportes', () => {
    const result = calculateFutureValue({
      initial: 1000000,
      monthly: 0,
      months: 12,
      rate: 0.01,
    })

    expect(result).toBeGreaterThan(1000000)
  })

  it('retorna 0 si los meses son 0', () => {
    const result = calculateFutureValue({
      initial: 1000000,
      monthly: 100000,
      months: 0,
      rate: 0.01,
    })

    expect(result).toBe(0)
  })
})
