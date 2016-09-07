//====AUTHORIZATION ROUTES==================================

var router= require('express').Router();
module.exports= function(passport){

  //====FACEBOOK AUTHORIZATION===================================
  router.get('/facebook', 
    passport.authenticate('facebook', 
    {successRedirect:'/', failureRedirect: '/'})
  );

  router.get('/facebook/callback', 
    passport.authenticate('facebook', {
      //successRedirect: '/',
      successRedirect: 'localhost:3000',
      failureRedirect: '/'
    }));

  //====GOOGLE AUTHORIZATION======================================
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

  //====LOGOUT USER==============================================
  router.get('/logout', 
    function(req, res, next){
      req.logout();
      res.end();
      res.redirect('/');
    })
  return router;
}