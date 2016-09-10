module.exports= {
  "facebookauth":{
    'name'          : 'QuickPoll',
    'clientID'      : '1678941889093740',
    'secret'        : 'a499ec26dbd161f06fb0829fef062714',
    'callbackURL'   : 'http://localhost:8080/auth/facebook/callback'
  },
  "googleauth":{
    'name': 'QuickPoll',
    'clientID': '661759976298-mamu3igf6n3hsc3uapur0eq4cl06j5pa.apps.googleusercontent.com',
    'secret': 'Vg3AQ0cSGNAJausFmrZf_RVU',
    'callbackURL': 'http://127.0.0.1:8080/auth/google/callback',
    'passReqToCallback'   : true
  },
  "githubauth":{
    'name'     : 'QuickPoll',
    'clientID' : 'f409e33dacdc5249620d',
    'secret'   : 'cb5f764539eda73c6aec1241a62c6b2de6b0fc30',
    'callbackURL': 'http://localhost:8080/auth/github/callback'
  }
}