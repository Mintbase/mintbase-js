"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataField = exports.DisplayType = exports.Visibility = exports.Network = exports.Chain = void 0;
var Chain;
(function (Chain) {
    Chain["near"] = "near";
})(Chain = exports.Chain || (exports.Chain = {}));
var Network;
(function (Network) {
    Network["main"] = "main";
    Network["testnet"] = "testnet";
})(Network = exports.Network || (exports.Network = {}));
var Visibility;
(function (Visibility) {
    Visibility["nsfw"] = "nsfw";
    Visibility["safe"] = "safe";
})(Visibility = exports.Visibility || (exports.Visibility = {}));
var DisplayType;
(function (DisplayType) {
    DisplayType["boostNumber"] = "boost_number";
    DisplayType["boostPercentage"] = "boost_percentage";
    DisplayType["number"] = "number";
    DisplayType["date"] = "date";
    DisplayType["location"] = "location";
    DisplayType["website"] = "website";
    DisplayType["zoom"] = "zoom";
    DisplayType["placeId"] = "place_id";
    DisplayType["rarity"] = "rarity";
    DisplayType["youtubeUrl"] = "youtube_url";
    DisplayType["latitude"] = "latitude";
    DisplayType["longitude"] = "longitude";
})(DisplayType = exports.DisplayType || (exports.DisplayType = {}));
var MetadataField;
(function (MetadataField) {
    MetadataField["Id"] = "id";
    MetadataField["Name"] = "name";
    MetadataField["Description"] = "description";
    MetadataField["Image"] = "image";
    MetadataField["Price"] = "price";
    MetadataField["Category"] = "category";
    MetadataField["ForSale"] = "forSale";
    MetadataField["ImagePreview"] = "imagePreview";
    MetadataField["AmountToMint"] = "amountToMint";
    MetadataField["NumAvailable"] = "numAvailable";
    MetadataField["StripePrice"] = "stripePrice";
    MetadataField["MetaId"] = "metaId";
    MetadataField["Minter"] = "minter";
    MetadataField["Minted"] = "minted";
    MetadataField["MintOn"] = "mintedOn";
    MetadataField["LastMinted"] = "lastMinted";
    MetadataField["Tags"] = "tags";
    MetadataField["Image_data"] = "image_data";
    MetadataField["External_data"] = "external_data";
    MetadataField["External_url"] = "external_url";
    MetadataField["Background_color"] = "background_color";
    MetadataField["Animation_url"] = "animation_url";
    MetadataField["Youtube_url"] = "youtube_url";
    MetadataField["Attributes"] = "attributes";
    MetadataField["ContractAddress"] = "contractAddress";
    MetadataField["Document"] = "document";
    MetadataField["Lock"] = "lock";
    MetadataField["Visibility"] = "visibility";
    MetadataField["Chain"] = "chain";
    MetadataField["Store"] = "store";
    MetadataField["Royalty"] = "royalty";
    MetadataField["Royalty_perc"] = "royalty_perc";
})(MetadataField = exports.MetadataField || (exports.MetadataField = {}));
//# sourceMappingURL=types.js.map