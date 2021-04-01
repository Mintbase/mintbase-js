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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMetadata = exports.uploadToArweave = exports.uploadCloud = void 0;
require("isomorphic-unfetch");
const app_1 = __importDefault(require("firebase/app"));
require("firebase/storage");
const browser_or_node_1 = require("browser-or-node");
const uuid_1 = require("uuid");
const constants_1 = require("../constants");
if (!app_1.default.apps.length) {
    app_1.default.initializeApp(constants_1.CLOUD_STORAGE_CONFIG);
}
const storage = app_1.default.storage();
const ARWEAVE_FOLDER = 'arweave';
/**
 * Uploads raw binary data to the cloud. This method is useful because
 * we can trigger an arweave upload via an http request with the returned file name.
 * @param buffer the raw binary data of the file to upload
 * @param contentType the content type
 * @returns the filename
 */
const uploadCloud = (buffer, contentType) => __awaiter(void 0, void 0, void 0, function* () {
    if (browser_or_node_1.isNode)
        throw new Error('Node environment does not yet supports uploads.');
    const fileName = uuid_1.v4();
    yield storage
        .ref(`${ARWEAVE_FOLDER}/${fileName}`)
        .put(buffer, { contentType: contentType });
    return fileName;
});
exports.uploadCloud = uploadCloud;
/**
 * Upload file to Arweave via a cloud function
 * @param file the file to upload
 * @returns retunrns an object containing the arweave content identifier and the content type.
 */
const uploadToArweave = (file) => __awaiter(void 0, void 0, void 0, function* () {
    if (browser_or_node_1.isNode)
        throw new Error('Node environment does not yet supports uploads.');
    const buffer = yield file.arrayBuffer();
    const contentType = file.type;
    // Uploads to google cloud
    const fileName = yield exports.uploadCloud(buffer, contentType);
    alert(constants_1.CLOUD_GET_FILE_METADATA_URI(fileName));
    // Fetches arweave id. This request will trigger an upload in the cloud
    const request = yield fetch(constants_1.CLOUD_GET_FILE_METADATA_URI(fileName));
    const data = yield request.json();
    return { id: data === null || data === void 0 ? void 0 : data.id, contentType: data === null || data === void 0 ? void 0 : data.contentType };
});
exports.uploadToArweave = uploadToArweave;
/**
 * Uploads metadata to Arweave via a cloud function
 * @param metadata metadata object
 * @returns arweave content identifier
 */
const uploadMetadata = (metadata) => __awaiter(void 0, void 0, void 0, function* () {
    const request = yield fetch(constants_1.CLOUD_POST_METADATA_URI(), {
        method: 'POST',
        body: JSON.stringify(metadata),
    });
    const data = yield request.json();
    return data === null || data === void 0 ? void 0 : data.id;
});
exports.uploadMetadata = uploadMetadata;
//# sourceMappingURL=storage.js.map