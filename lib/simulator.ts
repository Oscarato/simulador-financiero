export type SimulatorInput = {
  initial: number
  monthly: number
  months: number
  rate: number
}

export function calculateFutureValue({
  initial,
  monthly,
  months,
  rate,
}: SimulatorInput): number {
  if (months <= 0) return 0

  const vfInicial = initial * Math.pow(1 + rate, months)
  const vfAportes =
    monthly * ((Math.pow(1 + rate, months) - 1) / rate)

  return vfInicial + vfAportes
}
