var router= require('express').Router();
module.exports= function(passport){
  router.get('/facebook', 
    passport.authenticate('facebook', 
    {successRedirect:'/', failureRedirect: '/'})
  );

  router.get('/facebook/callback', 
    passport.authenticate('facebook', {
      successRedirect: '/',
      failureRedirect: '/'
    }));

  return router;
}