const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const List = require('./database/usersList');
app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))


let users = List();



app.get('/', (req, res)=>{
    let user = req.session.user;
    if (user){
        res.status(200).send({status:'success', firstname: user.firstname, lastname: user.lastname});
    }

})

app.get('/home', (req, res)=>{    
    if (req.session.user){
        res.status(200).send({status:'success', data: {firstname: req.session.user.firstname, lastname: req.session.user.lastname}})
    }else {
        res.status(404).send({status:'error'})
    }
    
})

//Login endpoint
app.post('/signin', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let rememberMe = req.body.rememberMe;
    let userFound = users.filter(user=>user.email===email && user.password===password);
    if (userFound.length>0){
        req.session.regenerate(err=>{
            if (err)next(err)
            else {
                let user = { firstname: userFound[0].firstname, lastname: userFound[0].lastname, email: userFound[0].email}
                req.session.save(err=>{
                    if (err)next(err)
                    req.session.user = user;
                    if (rememberMe===true){
                        req.session.cookie.maxAge = 1000 * 60 * 5;   // If remember me is checked, then the session cookie expires in 5 mins
                    }
                    res.status(200).send({status:'success'});
                });
            }
        })        
    }else{
        res.status(404).send({status:'not found', message:'Incorrect email and password!'})
    }
})

//Signup endpoint
app.post('/signup', (req, res)=>{
    const id = Math.floor(Math.random()*1000)+1;
    const newUser = {id, ...req.body};
    users.push(newUser);
    
    res.status(200).send({status:'success'});
})

//Signout endpoint
app.get('/signout', (req, res)=>{
    req.session.user = null;
    req.session.save(err=>{
        if (err)next(err)
        else {
            req.session.regenerate(err=>{
                if (err)next(err)
                else {
                    res.status(200).send({status:'success'});
                }
            })
        }
    })
})

//Forgot Password endpoint
app.get('/forgot_password/:id', (req, res)=>{
    let email = req.params.id;
    let emailFound = users.filter(user=>user.email===email);
    if (emailFound.length>0){
        res.status(200).send({status:'success'})
    }else{
        res.status(404).send({status:'not found', message:'Email address unknown!'})
    }
})


//Reset password endpoint
app.patch('/reset_password', (req, res)=>{
    let password = req.body.password;
    let email = req.body.email;
    let foundUser = users.filter(user=>user.email===email);
    if (foundUser.length>0){
        foundUser[0].password = password;
        res.status(200).send({status:'success', message:'Password has been successfully changed!'})
    }else{
        res.status(403).send({status:'forbidden', message:'Something occured at the server!'})
    }
})

app.listen(5000, ()=>{
    console.log('server started on port 5000');
})
