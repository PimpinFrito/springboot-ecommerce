const config = {
  domain: 'dev-eawonebv5dnnraat.us.auth0.com',
  clientId: 'LZpBpacNI3TN0I7wtzxe5GOVO2QYwE2q',
  authorizationParams: {
    audience: 'https://dev-eawonebv5dnnraat.us.auth0.com/api/v2/',
  },
  apiUri: 'http://localhost:8080',
  appUri: 'http://localhost:4200',
  errorPath: '/error',
};

const {
  domain,
  clientId,
  authorizationParams: { audience },
  apiUri,
  errorPath,
} = config;

export const environment = {
  production: false,
  auth: {
    domain,
    clientId,
    authorizationParams: {
      ...(audience && audience !== 'localhost:8080' ? { audience } : null),
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
};
