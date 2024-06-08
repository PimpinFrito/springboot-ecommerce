const config = {
  domain: 'EXAMPLE DOMAIN',
  clientId: 'CLIENT ID',
  authorizationParams: {
    audience: 'API IDENTIFIER',
  },
  apiUri: 'API URI',
  appUri: 'WEB APP URI',
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
};
