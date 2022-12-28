/**
 * @jest-environment jsdom
 */

import { ARWEAVE_SERVICE_HOST, MAX_UPLOAD_ERROR_MSG, MINTBASE_API_KEY } from './constants';
import { MAX_UPLOAD_BYTES, uploadFile } from './uploads';

const fetchMock = jest.spyOn(global, 'fetch');

describe('upload tests in browser', () => {
  beforeAll(() => {
    //jest.spyOn(console, 'error').mockImplementation(() => null);
    jest.spyOn(console, 'warn').mockImplementation(() => null);
  });

  afterEach(() => {
    fetchMock.mockReset();
  });

  test('uploads to arweave service', async () => {
    const file = new File([''], 'test.txt', { type: 'text/plain' });

    fetchMock.mockResolvedValue( {
      status: 200,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      json: () => Promise.resolve({
        id: '123',
        block: 'abc',
        name: 'test.txt',
        mimeType: 'text/plain',
      }),
    } as Response);

    const result = await uploadFile(file);

    expect(result).toEqual({
      id: '123',
      block: 'abc',
      name: 'test.txt',
      mimeType: 'text/plain',
    });

    expect(fetchMock).toHaveBeenCalledWith(ARWEAVE_SERVICE_HOST, {
      method: 'POST',
      headers: { 'mb-api-key': MINTBASE_API_KEY },
      body: expect.any(FormData),
      redirect: 'follow',
    });
  });


  test('throws with big file', async () => {
    fetchMock.mockResolvedValue( {
      status: 200,
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      json: () => Promise.resolve({
        id: '123',
        block: 'abc',
        name: 'empty.bin',
        mimeType: 'application/octet-stream',
      }),
    } as Response);

    const size = MAX_UPLOAD_BYTES + 10;
    const fileContents = new Uint8Array(size);
    for (let i = 0; i < size; i++) {
      fileContents[i] = 0;
    }
    const blob = new Blob([fileContents], { type: 'application/octet-stream' });
    const file = new File([blob], 'empty.bin', { type: 'application/octet-stream' });
    
    await expect(uploadFile(file)).rejects.toThrow(
      MAX_UPLOAD_ERROR_MSG,
    );
  });
});
