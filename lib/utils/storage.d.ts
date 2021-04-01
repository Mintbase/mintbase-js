/// <reference types="node" />
import 'isomorphic-unfetch';
import 'firebase/storage';
/**
 * Uploads raw binary data to the cloud. This method is useful because
 * we can trigger an arweave upload via an http request with the returned file name.
 * @param buffer the raw binary data of the file to upload
 * @param contentType the content type
 * @returns the filename
 */
export declare const uploadCloud: (buffer: ArrayBuffer | Buffer, contentType: string) => Promise<string>;
/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */
export declare const uploadToArweave: (file: File) => Promise<{
    id: string;
    contentType: string;
}>;
/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */
export declare const uploadMetadata: (metadata: unknown) => Promise<string>;
