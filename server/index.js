const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const List = require('./database/usersList');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: 'session', 
    saveUninitialized:true, 
    resave:true,
    proxy: true,
}));



app.get('/', (req, res)=>{
    let sess = req.session;
    if (sess.email){
        res.status(200).send({status:'success'})
    }else{
        res.status(403).send({status:'forbidden'})
    }
})

app.get('/home', (req, res)=>{
    let sess = req.session;
    if (sess.email){
        res.status(200).send({status:'success', data: {firstname: sess.firstname, lastname: sess.lastname}})
    }
})
app.post('/signin', (req, res)=>{
    let email = req.body.email;
    let password = req.body.password;
    let sess = req.session;
    
    let userFound = List().filter(user=>user.email===email && user.password===password);
    if (userFound.length>0){
        sess.email = req.body.email;
        sess.firstname = userFound[0].firstname;
        sess.lastname = userFound[0].lastname;
        res.status(200).send({status:'success'});
    }else{
        res.status(404).send({status:'not found', message:'Incorrect email and password!'})
    }
    
})

app.post('/signup', (req, res)=>{
    const id = Math.floor(Math.random()*1000)+1;
    const newUser = {id, ...req.body};
    List().push(newUser);
    res.status(200).send({status:'success'});
})


app.get('/signout', (req, res)=>{
    req.session.destroy(err=>{
        if (err){
            console.log(err);
        }else{
            res.status(200).send({status:'success'})
        }
    })
})


app.get('/forgot_password/:id', (req, res)=>{
    let email = req.params.id;
    let emailFound = List().filter(user=>user.email===email);
    if (emailFound.length>0){
        res.status(200).send({status:'success'})
    }else{
        res.status(404).send({status:'not found', message:'Email address unknown!'})
    }
})

app.patch('/reset_password', (req, res)=>{
    let password = req.body.password;
    let email = req.body.email;
    let foundUser = List().filter(user=>user.email===email);
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
