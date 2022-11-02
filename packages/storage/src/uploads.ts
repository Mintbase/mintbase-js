import { supportedStorageServices } from './constants';
import { setup } from './services';

export const uploadBuffer = async (
  buffer: Buffer,
  contentType: string,
): Promise<string> => {
  const bundlr = setup(supportedStorageServices.arweave.bundlr);

  const uploadResult = await bundlr.uploader.upload(buffer, [
    { name: 'Content-Type', value: contentType },
  ]);

  const { data } = uploadResult;

  return data.id;
};
