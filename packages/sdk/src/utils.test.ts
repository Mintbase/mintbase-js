import { dateToTimestamp } from './utils';

describe('utility functions tests', () => {

  test('dateToTimestamp', () => {
    // Standard date
    expect(dateToTimestamp(new Date('2024-05-28T12:34:56.789Z'))).toEqual('1716899696789000000');
    // Unix Epoch
    expect(dateToTimestamp(new Date('1970-01-01T00:00:00.000Z'))).toEqual('0');
    // the distant future: https://www.youtube.com/watch?v=2IPAOxrH7Ro
    expect(dateToTimestamp(new Date('3000-01-01T00:00:00.000Z'))).toEqual('32503680000000000000');
    // far past date!
    expect(dateToTimestamp(new Date('1000-01-01T00:00:00.000Z'))).toEqual('-30610224000000000000');
  });
});
