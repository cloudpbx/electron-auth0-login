"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptography = void 0;
const crypto_1 = __importDefault(require("crypto"));
const framework_1 = require("../framework");
const cryptography = () => framework_1.context('cryptography', {
    /**
     * PKCE requires a cryptographic pair of a random b64 string encoded, then the encoded hash of the first string
     */
    getPKCEChallengePair: () => {
        const seed = base64random(32);
        const verifier = urlEncodeBase64String(seed);
        const challenge = urlEncodeBase64String(base64hash(verifier));
        return { verifier, challenge };
    }
});
exports.cryptography = cryptography;
function urlEncodeBase64String(str) {
    return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}
function base64hash(str) {
    return crypto_1.default.createHash('sha256').update(str).digest().toString('base64');
}
function base64random(bytes) {
    return crypto_1.default.randomBytes(bytes).toString('base64');
}
