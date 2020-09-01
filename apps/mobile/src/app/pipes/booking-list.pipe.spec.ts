import { BookingListPipe } from './booking-list.pipe';

describe('BookingListPipe', () => {
  it('create an instance', () => {
    const pipe = new BookingListPipe();
    expect(pipe).toBeTruthy();
  });
});
