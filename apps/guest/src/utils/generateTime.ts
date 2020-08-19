import { roundToNearestMinutes, startOfTomorrow } from 'date-fns';

export default function() {
  const actual = roundToNearestMinutes(new Date(), { nearestTo: 30 });
  const finish = startOfTomorrow();
  const result = [actual];
  while (result[result.length - 1] < finish) {
    const preview = result[result.length - 1];
    const next = new Date(preview.getTime() + 30 * 60 * 1000);
    result.push(next);
  }
  return result;
}
