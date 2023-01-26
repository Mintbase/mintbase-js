/**
 * @jest-environment jsdom
 */
import { uploadReference } from './uploads';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('upload tests in browser', () => {
  beforeAll(() => {
    jest.spyOn(console, 'warn').mockImplementation(() => null);
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
        id: '123',
        block: 'abc',
        name: 'test.txt',
        mimeType: 'text/plain',
      }),
    } as Response));

    const result = await uploadReference(referenceObject);

    expect(result).toEqual({
      status: 200,
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
      json: () => Promise.resolve({
        id: '123',
        block: 'abc',
        name: 'test.txt',
        mimeType: 'text/plain',
      }),
    } as Response));

    const result = await uploadReference(referenceObject);

    expect(result).toEqual({
      status: 200,
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
      json: () => Promise.resolve({
        id: '123',
        block: 'abc',
        name: 'test.txt',
        mimeType: 'text/plain',
      }),
    } as Response));

    const result = await uploadReference(referenceObject);

    expect(result).toEqual({
      status: 200,
    });
  });

});
