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
exports.authAPI = void 0;
const got_1 = __importDefault(require("got"));
const framework_1 = require("../framework");
const authAPI = (config) => framework_1.context('authAPI', {
    /**
     * After receiving auth code, use second half of PKCE pair to get a token (PKCE second leg)
     */
    exchangeAuthCode: (authCode, pair) => __awaiter(void 0, void 0, void 0, function* () {
        return got_1.default.post(`https://${config.auth0.domain}/oauth/token`, {
            json: {
                grant_type: 'authorization_code',
                client_id: config.auth0.clientId,
                code_verifier: pair.verifier,
                code: authCode,
                redirect_uri: `https://${config.auth0.domain}/mobile`
            }
        }).json();
    }),
    /**
     * Used to restore login state for persistent login
     */
    exchangeRefreshToken: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        return got_1.default.post(`https://${config.auth0.domain}/oauth/token`, {
            json: {
                grant_type: 'refresh_token',
                client_id: config.auth0.clientId,
                refresh_token: refreshToken
            }
        }).json();
    })
});
exports.authAPI = authAPI;
