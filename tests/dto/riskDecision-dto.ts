export class riskDecision {
  income: number
  debt: number
  age: number
  employed: boolean
  loanAmount: number
  loanPeriod: number

  public constructor(
    income: number,
    debt: number,
    age: number,
    employed: boolean,
    loanAmount: number,
    loanPeriod: number,
  ) {
    this.income = income
    this.debt = debt
    this.age = age
    this.employed = employed
    this.loanAmount = loanAmount
    this.loanPeriod = loanPeriod
  }

  static randomRiskDecisionData(): riskDecision {
    const income = Math.floor(Math.random() * 10000) + 1
    const debt = Math.floor(Math.random() * 5000)
    const age = Math.floor(Math.random() * 50) + 17
    const employed = true
    const loanAmount = Math.floor(Math.random() * 10000) + 100
    const loanPeriodOptions = [3, 6, 9, 12, 18, 24, 30, 36]
    const loanPeriod = loanPeriodOptions[Math.floor(Math.random() * loanPeriodOptions.length)]

    return new riskDecision(income, debt, age, employed, loanAmount, loanPeriod)
  }
}
