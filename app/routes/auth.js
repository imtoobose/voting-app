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

  router.get('/google',
    passport.authenticate('google', { 
      scope: ['https://www.googleapis.com/auth/plus.login'],
      successRedirect:'/', 
      failureRedirect:'/'
    }));

  router.get('/google/callback',
    passport.authenticate('google', {
      successRedirect:'/',
      failureRedirect:'/'
    }));

  router.get('/logout', 
    function(req, res, next){
      req.logout();
      res.end();
      res.redirect('/');
    })
  return router;
}