/**
 * @jest-environment jsdom
 */
import { getFormDataFromJson, uploadReference } from './uploads';
import fetchMock from 'jest-fetch-mock';
import { mbjs } from '@mintbase-js/sdk';
fetchMock.enableMocks();

const FAKE_API_KEY = 'foo';

const ArweaveResponseMock = {
  id: '123',
  block: 'abc',
  name: 'test.txt',
  mimeType: 'text/plain',
  media_hash: 'odkMrNBZ9rAl9fi6hFy20qh89oDVG91px7iMnZJPxo4',
};

describe('upload tests in browser', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);
    mbjs.config({ apiKey: FAKE_API_KEY });
  });

  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('uploads reference object with media and animation to arweave', async () => {
    const media = new File([''], 'test.txt', { type: 'text/plain' });
    const referenceObject = {
      title: 'title',
      media: media,
      animation_url: media,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      status: 200,
      json: () => Promise.resolve({

      }),
    } as Response));

    const result = await uploadReference(referenceObject);

    const [call] = fetchMock.mock.calls;
    type Call = {headers: Record<string, string>}[]
    expect((call as Call)[1].headers['mb-api-key']).toBe(FAKE_API_KEY);
    expect(result).toEqual({
      status: 200,
      media_url: 'https://arweave.net/undefined',
    });
  });

  test('uploads reference object with animation to arweave', async () => {
    const media = new File([''], 'test.txt', { type: 'text/plain' });
    const referenceObject = {
      title: 'title',
      animation_url: media,
    };

    fetchMock.mockResponse(JSON.stringify({
      status: 200,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      json: () => Promise.resolve(ArweaveResponseMock),
    } as Response));

    const result = await uploadReference(referenceObject);

    expect(result).toEqual({
      status: 200,
      media_url: 'https://arweave.net/undefined',
    });
  });

  test('uploads reference object with media and animation to arweave', async () => {
    const media = new File([''], 'test.txt', { type: 'text/plain' });
    const referenceObject = {
      title: 'title',
      media: media,
      animation_url: media,
    };

    fetchMock.mockResponse(JSON.stringify({
      status: 200,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      json: () => Promise.resolve(ArweaveResponseMock),
    } as Response));

    const result = await uploadReference(referenceObject);

    expect(result).toEqual({
      status: 200,
      media_url: 'https://arweave.net/undefined',
    });
  });

  test('getFormData should grab fields and media', async () => {
    const media = new File([''], 'test.txt', { type: 'text/plain' });
    const referenceObject = {
      title: 'title',
      media: media,
      animation_url: media,
    };

    const result = await getFormDataFromJson(referenceObject);
    expect(result.get('title')).toContain('title');
    expect(result.get('media')).toHaveLength;
    expect(result.get('animation_url')).toHaveLength;
  });

  test('grabs fields with weird names', async () => {
    const referenceObject = {
      bogusField: 'bogus',
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await getFormDataFromJson(referenceObject as any);
    expect(result.get('bogusField')).toContain('bogus');

  });

  test('getFormData with mislabeled media key', async () => {
    const referenceObject = {
      media: 'yeet',

    };

    const result = await getFormDataFromJson(referenceObject);
    expect(result.get('media')).toContain('yeet');

  });

  test('getFormData with mislabeled media value', async () => {
    const media = new File([''], 'test.txt', { type: 'text/plain' });
    const referenceObject = {
      yeet: media,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(() => getFormDataFromJson(referenceObject as any))
      .toThrowError('The provided field has a key that is not recognized by our service and will not be uploaded to arweave, try using media, animation_url or document');


  });

});
