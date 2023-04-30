interface IMonth {
  month: string;
  days: number;
  listDays?: number[];
  index?: number
}

const months: IMonth[] = [
  // Até o mês de julho os meses ímpares tem 31 dias 
  { month: 'Janeiro', days: 31 },
  // Se o ano for bisexto o mês de fevereiro tem 29 dias 
  { month: 'Fevereiro', days: 28 },
  { month: 'Março', days: 31 },
  { month: 'Abril', days: 30 },
  { month: 'Maio', days: 31 },
  { month: 'Junho', days: 30 },
  { month: 'Julho', days: 31 },
  // Depois de julho os meses pares tem 31 dias
  { month: 'Agosto', days: 31 },
  { month: 'Setembro', days: 30 },
  { month: 'Outubro', days: 31 },
  { month: 'Novembro', days: 30 },
  { month: 'Dezembro', days: 31 },
]


months.forEach((month, key) => {
  month.listDays = Array.from({ length: month.days }, (v, i) => i + 1);
  month.index = key;
})


export { months };
export type { IMonth };
