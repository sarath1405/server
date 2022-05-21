const express = require('express')
const router = express.Router();
const blog = require('../modules/blog')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const feedback1 = require('../modules/feedback')
require('dotenv').config()

router.route('/create').post(async (req, res) => {
    const title = req.body.title;
    const user = req.body.username;
    const avatar = req.body.avatar;
    const content = req.body.content;
    const description = req.body.description;
    const type = req.body.type;

    const newBlog = {
        title : title,
        user : user,
        avatar : avatar, 
        content : content,
        description : description,
        type : type,
        date : new Date()
    }

    const response = await blog.create(newBlog);
    if(response) {
        return res.json({
            status : 'ok',
        })
    }
    return res.json({
        status : 'error',
        message : 'error occured!'
    })
}) 

router.route('/signup').post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const c_password = req.body.confirmPassword;
    const avatar = req.body.avatar;

    if(avatar === 0) {
        return res.json({
            status : 'error',
            message : 'select any one avatar!'
        })
    }

    if(password !== c_password) {
        return res.json({
            status : 'error',
            message : 'passwords not matched!'
        })
    }

    let l=0, n=0;
    for(let i=0; i<username.length; i++) {
        if((username[i]>='A' && username[i]<='z') || (username[i]>='a' && username[i]<='z')) l++;
        if(username[i]>='0' && username[i]<='9') n++;
    }
    
    if(l === 0) {
        return res.json({
            status : 'error',
            message : 'username must contain atleast one alphabet!'
        })
    }

    if(n === 0) {
        return res.json({
            status : 'error',
            message : 'username must contain atleast one number!'
        })
    }

    if(password.length < 6) {
        return res.json({
            status : 'error',
            message : 'password should be atleast 6 characters long!'
        })
    }

    const response = await user.find({
        username : username
    })

    if(response.length > 0) {
        return res.json({
            status : 'error',
            message : 'username already exists!'
        })
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(req.body.password, salt);

    const newUser = {
        username : username,
        password : hash_password,
        avatar : avatar
    }

    const response1 = await user.create(newUser);
    if(response1) {
       return res.json({
            status : 'ok'
        })
    }
})

router.route('/auth').get(async (req, res) => {
    const token = req.headers['x-access-token'];
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const username = decode.username
        const data = await user.findOne({
            username : username
        })
        if(data) {
            return res.json({
                status : 'ok',
                username : decode.username,
                avatar : decode.avatar,
            })
        }   
    }catch(error) {
        return res.json({
            status : 'error'
        })
    }
})

router.route('/feedback').post(async (req, res) => {
    const name = req.body.name;
    const star = req.body.star;
    const feedback = req.body.feedback;

    const response = await feedback1.create({
        name : name,
        star : star,
        feedback : feedback
    })

    if(response) {
        return res.json({
            status : 'ok',
        })
    }
})

router.route('/login').post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const response = await user.findOne({
        username : username
    })

    if(!response) {
        return res.json({
            status : 'error',
            message : 'No user found, please register!'
        })
    }

    const hash_password = await bcrypt.compare(password, response.password);

    if(hash_password) {

        const token = jwt.sign({
            username : username,
            avatar : response.avatar
        }, process.env.JWT_SECRET, {expiresIn : '1d'});

        return res.json({
            status : 'ok',
            data : token
        })  
    }

    return res.json({
        status : 'error',
        message : 'incorrect password!'
    })
})

router.route('/getBlogs').get(async (req, res) => {
    const user = req.headers['user']
    const response = await blog.find({
        user : {$ne : user},
        type : 'public',
    });

    return res.json({
        status : 'ok',
        data : response
    })

    return res.json({
        status : 'error',
        message : 'errour occured!'
    })
})

router.route('/getPersonalBlogs').get(async (req, res) => {
    const user = req.headers['user']
    const response = await blog.find({
        user : user,
    });

    if(response.length === 0) {
        return res.json({
            status : 'error',
            message : 'no blogs created!'
        })
    }

    return res.json({
        status : 'ok',
        data : response
    })

    return res.json({
        status : 'error',
        message : 'errour occured!'
    })
})

router.route('/delete').post(async (req, res) => {
    const id = req.body.id;
    const response = await blog.deleteOne({
        _id : id
    })

    if(response) {
        return res.json({
            status : 'ok'
        })
    }
})

module.exports = router