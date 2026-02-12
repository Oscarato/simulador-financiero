import { esNumeroValido } from './validators'

describe('Validaciones numéricas', () => {
  it('acepta números positivos', () => {
    expect(esNumeroValido('1000')).toBe(true)
  })

  it('rechaza valores exponenciales', () => {
    expect(esNumeroValido('1e5')).toBe(false)
  })

  it('rechaza números negativos', () => {
    expect(esNumeroValido('-10')).toBe(false)
  })

  it('rechaza texto', () => {
    expect(esNumeroValido('abc')).toBe(false)
  })
})
