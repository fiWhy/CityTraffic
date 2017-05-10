import { FirebaseAuthProvider } from "./providers/auth-providers/firebase-auth.provider";

export const coreConstants = () => {
    const options = {
        "API_URL": "/api",
        "cacheID": "traffic",
        "AUTH": {
            "PROVIDER": FirebaseAuthProvider,
        }
    };

    return options;
};