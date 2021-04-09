import 'isomorphic-unfetch';
import 'firebase/storage';
/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */
export declare const uploadToArweave: (file: File, apiKey?: string | undefined) => Promise<{
    id: string;
    contentType: string;
}>;
/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */
export declare const uploadMetadata: (metadata: unknown, apiKey?: string | undefined) => Promise<string>;
