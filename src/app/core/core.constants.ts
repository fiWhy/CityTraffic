import { FirebaseAuthProvider } from "./providers/auth-providers/firebase-auth.provider";
import { FirebaseRequestProvider } from "./providers/request-providers/firebase-request.provider";

export const coreConstants = () => {
    const options = {
        "API_URL": "/api",
        "cacheID": "traffic",
        "MAIN_TOAST_POSITION": "bottom left",
        "AUTH": {
            "PROVIDER": FirebaseAuthProvider,
        },
        "REQUEST": {
            "PROVIDER": FirebaseRequestProvider,
        }
    };

    return options;
};