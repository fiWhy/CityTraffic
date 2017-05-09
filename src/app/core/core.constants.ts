export const coreConstants = () => {
    const options = {
        "API_URL": "/api",
        "cacheID": "traffic",
        "AUTH": {
            "PROVIDERS": {
                "DEFAULT": null,
                "GOOGLE": new firebase.auth.GoogleAuthProvider
            }
        }
    };

    options.AUTH.PROVIDERS.DEFAULT = options.AUTH.PROVIDERS.GOOGLE;
    return options;
};