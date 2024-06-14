//FROM AUTH0
const config = {
  domain: 'your-auth-domain.com',
  clientId: 'your-client-id',
  authorizationParams: {
    audience: 'your-audience',
  },
  apiUri: 'http://localhost:3001',
  appUri: 'https://localhost:4200',
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
      audience,
      redirect_uri: window.location.origin,
    },
    errorPath,
  },
  httpInterceptor: {
    allowedList: [`${apiUri}/*`],
  },
  restApiUrl: 'https://localhost:8443/api',
};
