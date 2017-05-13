import { FirebaseAuthProvider } from "./providers/auth-providers/firebase-auth.provider";

export const coreConstants = () => {
    const options = {
        "API_URL": "/api",
        "cacheID": "traffic",
        "MAIN_TOAST_POSITION": "bottom left",
        "GOOGLE_MAP": {
            "LINK": "https://maps.googleapis.com/maps/api/js",
            "OPTIONS": {
                "LIBS": ["places"]
            }
        },
        "AUTH": {
            "PROVIDER": FirebaseAuthProvider,
        }
    };

    return options;
};