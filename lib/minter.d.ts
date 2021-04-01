import { MetadataField } from './types';
/**
 * A programmatic metadata generator.
 */
export declare class Minter {
    latestMints: any;
    currentMint: any;
    constructor();
    /**
     * Uploads the current metadata object and returns its content identifier.
     */
    getMetadataId(): Promise<string>;
    /**
     * Set a field in metadata.
     * @param key The field key.
     * @param value The field value.
     */
    setField(key: MetadataField, value: unknown): void;
    setMetadata(metadata: any, override?: boolean): void;
    /**
     * Uploads file and sets its corresponding URI to a field.
     * @param field The metadata field.
     * @param file The file to upload.
     */
    upload(field: string, file: File): Promise<void>;
    private fieldChecks;
}
