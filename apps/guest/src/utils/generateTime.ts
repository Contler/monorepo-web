import { roundToNearestMinutes, startOfTomorrow, startOfToday } from 'date-fns';

export default function () {
  const actual = roundToNearestMinutes(new Date(), { nearestTo: 30 });
  return generateRange(actual);
}

export function fullRangeDates() {
  const actual = startOfToday();
  const range = generateRange(actual);
  return range.slice(0, range.length - 1);
}

function generateRange(init: Date) {
  const finish = startOfTomorrow();
  const result = [init];
  while (result[result.length - 1] < finish) {
    const preview = result[result.length - 1];
    const next = new Date(preview.getTime() + 30 * 60 * 1000);
    result.push(next);
  }
  return result;
}
