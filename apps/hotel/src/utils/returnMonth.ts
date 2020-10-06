import { MONTHS } from './const/month';

export function convertMonthToString() {
  const currentMonth = new Date().getMonth();
  return MONTHS[currentMonth - 1];
}
