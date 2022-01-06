import { Adapter, Config } from '../types';
export declare function library(adapter: Adapter, config: Config): {
    getToken: () => Promise<string>;
    isLoggedIn: () => Promise<boolean>;
    login: () => Promise<string>;
    logout: () => Promise<void>;
};
