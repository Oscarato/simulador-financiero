export function calculateInterest(
  initialAmount: number,
  monthlyContribution: number,
  months: number,
  rate: number
) {
  let total = initialAmount;

  for (let i = 0; i < months; i++) {
    total += monthlyContribution;
    total += total * rate;
  }

  return total;
}
