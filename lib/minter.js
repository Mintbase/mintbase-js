"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Minter = void 0;
const storage_1 = require("./utils/storage");
const constants_1 = require("./constants");
const types_1 = require("./types");
const validFileFormat = {
    [types_1.MetadataField.Image]: ['image/jpeg', 'image/png', 'image/gif'],
    [types_1.MetadataField.Animation_url]: [
        'audio/ogg',
        'video/webm',
        'video/mp4',
        'audio/mpeg',
        'audio/mp3',
    ],
};
/**
 * A programmatic metadata generator.
 */
class Minter {
    constructor() {
        this.latestMints = {};
        this.currentMint = {};
    }
    /**
     * Uploads the current metadata object and returns its content identifier.
     */
    getMetadataId() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.currentMint &&
                Object.keys(this.currentMint).length === 0 &&
                this.currentMint.constructor === Object)
                throw new Error('Metadata is empty.');
            const id = yield storage_1.uploadMetadata(this.currentMint);
            this.latestMints = Object.assign(Object.assign({}, this.latestMints), { [id]: this.currentMint });
            this.currentMint = {};
            return id;
        });
    }
    /**
     * Set a field in metadata.
     * @param key The field key.
     * @param value The field value.
     */
    setField(key, value) {
        // this.fieldChecks(key, value)
        this.currentMint[key] = value;
    }
    setMetadata(metadata, override) {
        if (override) {
            this.currentMint = Object.assign(Object.assign({}, this.currentMint), metadata);
        }
        else {
            this.currentMint = Object.assign(Object.assign({}, metadata), this.currentMint);
        }
    }
    /**
     * Uploads file and sets its corresponding URI to a field.
     * @param field The metadata field.
     * @param file The file to upload.
     */
    upload(field, file) {
        return __awaiter(this, void 0, void 0, function* () {
            // TODO: allowedFiles
            if (!validFileFormat[field].includes(file.type))
                throw new Error('File type not accepted.');
            // TODO: validateFile
            // TODO: check file size limits
            const result = yield storage_1.uploadToArweave(file);
            this.currentMint[field] = `${constants_1.BASE_ARWEAVE_URI}/${result === null || result === void 0 ? void 0 : result.id}`;
        });
    }
    // TODO: implement all checks
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fieldChecks(key, value) {
        switch (key) {
            case types_1.MetadataField.Youtube_url:
                if (typeof value !== 'string')
                    throw new Error('Value is not of type string.');
                // eslint-disable-next-line no-case-declarations
                const urlRegex = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
                // eslint-disable-next-line no-case-declarations
                const regex = new RegExp(urlRegex);
                if (!value.match(regex))
                    throw new Error('URL is not well formatted.');
                break;
            case types_1.MetadataField.Name:
                if (typeof value !== 'string')
                    throw new Error('Value is not of type string.');
                break;
            case types_1.MetadataField.Description:
                if (typeof value !== 'string')
                    throw new Error('Value is not of type string.');
                break;
            default:
                break;
        }
    }
}
exports.Minter = Minter;
//# sourceMappingURL=minter.js.map