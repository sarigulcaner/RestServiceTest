const router = require('express').Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.get('',(req,res)=>{
    res.send('user called');

});

router.post('/register',async (req,res) =>
{

   const emailIsExist = await User.findOne({email:req.body.email});
    if(emailIsExist)
    {
        return res.status(200).send('Email already exists');
    }
    var salt = await bcrypt.genSalt(12);
    const hashpassword = await bcrypt.hash(req.body.password,salt);

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashpassword
    });
    
try{
   const savedUser = await user.save();
res.send(savedUser);

}catch(err)
{
    res.status(400).send(err);
}
    
});

router.post('/login',async (req,res) =>{
    const user = await User.findOne({email:req.body.email});
    if(!user)
    {
        return res.status(200).send('Email or password wrong');
    }
const isVaild  =await bcrypt.compare(req.body.password,user.password);
if(!isVaild)
{
return res.status(400).send('password is wrong');

}
const token = jwt.sign({_id:user._id },"313131",{ expiresIn: 10 });

res.header('token',token).send(token);
});



module.exports = router;
