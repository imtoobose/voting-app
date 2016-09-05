var
  FacebookStrategy = require('passport-facebook').Strategy;

var
  User     = require('../mongo/user'),
  config   = require('./configauth'),
  fbconfig = config.facebookauth;


module.exports = function(passport){

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use(new FacebookStrategy({
      clientID : fbconfig.clientID,
      clientSecret : fbconfig.secret,
      callbackURL : fbconfig.callbackURL
    },

    function(accessToken, refreshToken, profile, done){
      User.findOne({'facebook.id': profile.id}, function(err, user){
        if(err) return done(err);

        if(user){
          return done(null, user);
        }

        else{
          var newUser = new User();
          newUser.facebook.id = profile.id;
          newUser.facebook.token = accessToken;
          newUser.facebook.name = profile.displayName;
          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          });
        }
      });
    }
  ));
}