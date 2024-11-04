const express = require('express');
const router = express.Router();




router.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'password') { 
    req.session.user = { name: username };
    res.redirect('/');
  } else {
    res.redirect('/'); 
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error('Failed to destroy session:', err);
    }
    res.redirect('/');
  });
});




router.get('/about', (req, res) => {
    res.render('about');
});


router.get('/teams', (req, res) => {
    res.render('teams');
});


router.get('/history', (req, res) => {
    res.render('history');
});



router.get('/contact', (req, res) => {
    res.render('contact');
});






module.exports = router;

