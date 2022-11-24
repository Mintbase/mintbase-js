
import { writeFileSync, unlinkSync, createReadStream } from 'fs';
import { uploadFileToArweave } from './uploads';
import superagent from 'superagent';

const fakeFileName = './uploadTest.json';

jest.mock('superagent', () => ({
  post: jest.fn().mockReturnThis(),
  set: jest.fn().mockReturnThis(),
  attach: jest.fn().mockReturnThis(),
}));

describe('upload tests', () => {
  beforeAll(() => {
    // jest.spyOn(console, 'error').mockImplementation(() => null);
    writeFileSync(fakeFileName, '{"hello":"storage"}');

  });
  afterAll(() => {
    unlinkSync(fakeFileName);
  });

  test('uploads to arweave service', async () => {
    (superagent.attach as jest.Mock).mockResolvedValueOnce({
      body: {
        id: 'new-upload-hash',
      },
    });
    const file = createReadStream(fakeFileName);
    const upload = await uploadFileToArweave(file as unknown as File, 'test.json');
    expect(upload.id).toBeDefined();
  });

  test('should fail with anon header', async () => {
    (superagent.attach as jest.Mock).mockRejectedValueOnce({
      code: 403,
    });
    expect(uploadFileToArweave(createReadStream(fakeFileName) as unknown as File, 'test.json'))
      .rejects
      .toThrow();
  });
});
