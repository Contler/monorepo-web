export interface MoneyInterface {
  name: string;
  symbol: string;
}

export interface MoneyInput {
  money: MoneyInterface;
  staticMoney: boolean;
  nameSelect: string;
}
