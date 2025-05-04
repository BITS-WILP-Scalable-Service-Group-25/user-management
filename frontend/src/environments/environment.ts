export const environment = {
  production: false,
  auth0: {
    domain: 'dev-fxbspsa7ploz2070.us.auth0.com',
    clientId: 'PAyC91hOPE4uKRLGoZUXrRhctzC4Kjcv',
    authorizationParams: {
      redirect_uri: 'http://localhost:4203',
      scope: 'openid profile email',
      response_type: 'code'
    }
  },
  api: {
    serverUrl: 'http://localhost:3000'
  }
};
