const AuthenticationClient = require('auth0').AuthenticationClient;
require("dotenv").config()
const auth0 = new AuthenticationClient({
  domain:process.env.DOMAIN,
  clientId:process.env.CLIENT_ID,
});

async function routeADD(req) {
      const accessToken = req.headers.authorization.split(' ')[1]; // should be present & safe because auth0 middleware already validated auth token.
    
      const userProfile = await auth0.getProfile(accessToken);
    
      return userProfile.email
    }
module.exports=routeADD