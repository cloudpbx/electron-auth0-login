import { Config } from './types';
export declare function auth0Login(config: Config): {
    getToken: () => Promise<string>;
    isLoggedIn: () => Promise<boolean>;
    login: () => Promise<string>;
    logout: () => Promise<void>;
};
