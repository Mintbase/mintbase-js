
import { mbjs } from './config';

describe('generic config tests', () => {
  test('module scopes settings globally', () => {
    expect(mbjs.keys.apiKey).toEqual(
      globalThis.mbjs.apiKey,
    );
    mbjs.config({
      apiKey: 'foo',
    });
    expect(mbjs.keys.apiKey).toEqual(
      globalThis.mbjs.apiKey,
    );
  });
});
