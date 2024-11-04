const express = require('express');
const session = require('express-session');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

function isLoggedIn(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.redirect('/login'); 
    }
}


app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs'); 

app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use(express.urlencoded({ extended: true })); 
app.use(session({ secret: 'secret-key', resave: false, saveUninitialized: true }));

app.get('/', (req, res) => {
    const user = req.session && req.session.user;
    res.render('index', { user }); 
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    const usernameRegex = /^[a-zA-Z0-9_]{3,15}$/;
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*]{6,20}$/;

    if (!usernameRegex.test(username)) {
        return res.status(400).send('Invalid username format');
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).send('Invalid password format');
    }

    fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Server Error');
        }

        const users = JSON.parse(data);
        const user = users.find(user => user.username === username && user.password === password);

        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.status(401).send('Invalid credentials');
        }
    });
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).send('Logout failed');
        }
        res.redirect('/');
    });
});




app.get('/teams', isLoggedIn, (req, res) => {
    const teamMembers = [
        { name: 'C Ronaldo', photo: '/images/ronaldo.jpg' },
        { name: 'M papai', photo: '/images/image.jpeg' },
        // adauga jucatori Add players
    ];
    res.render('teams', { teamMembers });
});



app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);


app.use((req, res, next) => {
    res.status(404).render('404'); 
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

