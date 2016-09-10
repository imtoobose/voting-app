var
  FacebookStrategy = require('passport-facebook').Strategy,
  GoogleStrategy   = require('passport-google-oauth2').Strategy;

var
  User         = require('../mongo/user'),
  config       = require('./configauth'),
  fbconfig     = config.facebookauth,
  googleconfig =  config.googleauth;

function userLogin(through, accessToken, profile, done) {
  var searchFor;
  switch(through){
    case "github": searchFor = {
      'github.id': profile.id
    }
    break;
    case "facebook": searchFor = {
      'facebook.id': profile.id
    }
    break;
    case 'google': searchFor = {
      'google.id': profile.id
    }
    break;
  }

  User.findOne(searchFor, function(err, user){
    if(err) return done(err);

    if(user){
      return done(null, user);
    }

    else{
      var newUser = new User();
      newUser[through].id = profile.id;
      newUser[through].token = accessToken;
      newUser[through].name = profile.displayName;
      newUser.save(function(err){
        if(err) throw err;
        return done(null, newUser);
      });
    }
  });
}

module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new GoogleStrategy({
    clientID:     googleconfig.clientID,
    clientSecret: googleconfig.secret,
    callbackURL:  googleconfig.callbackURL,
    passReqToCallback   : true
  },
    function(request, accessToken, refreshToken, profile, done){
      userLogin('google', accessToken, profile, done);
    }
  ));

  passport.use(new FacebookStrategy({
      clientID : fbconfig.clientID,
      clientSecret : fbconfig.secret,
      callbackURL : fbconfig.callbackURL
    },

    function(accessToken, refreshToken, profile, done){
      userLogin('facebook', accessToken, profile, done);
    }
  ));
}