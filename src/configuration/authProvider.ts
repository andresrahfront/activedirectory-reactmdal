import { MsalAuthProvider, LoginType } from 'react-aad-msal'
import { Configuration, AuthenticationParameters } from 'msal';

const tenant :string = 'smartgridb2c.onmicrosoft.com'
const signInPolicy :string = 'B2C_1_react_sign_in'
const applicationID :string = '0b7f5f40-a57d-43d2-86e3-1d781a5299c4'
const reactRedirectUri :string = 'http://localhost:3000'
const tenantSubdomain :string = tenant.split(".")[0];
const instance :string = `https://${tenantSubdomain}.b2clogin.com/tfp/`;
const signInAuthority :string = `${instance}${tenant}/${signInPolicy}`;

// Msal Configurations
const signInConfig: Configuration = {
  auth: {
    authority: signInAuthority,
    clientId: applicationID,
    redirectUri: reactRedirectUri,
    validateAuthority: false
  },
  cache: {
    cacheLocation: "sessionStorage",
    storeAuthStateInCookie: true
  }
};
// Authentication Parameters
const authenticationParameters: AuthenticationParameters = {
  scopes: [
    "https://graph.microsoft.com/Directory.Read.All",
    "https://smartgridb2c.onmicrosoft.com/api-1/user_impersonation"
  ]
};
// Options
const options = {
  loginType: LoginType.Redirect,
  tokenRefreshUri: window.location.origin + "/auth.html"
};

export const signInAuthProvider = new MsalAuthProvider (
  signInConfig,
  authenticationParameters,
  options
);
