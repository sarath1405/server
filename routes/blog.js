const express = require('express')
const router = express.Router();
const blog = require('../modules/blog')
const likes = require('../modules/likes')
const saved = require('../modules/saved')

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