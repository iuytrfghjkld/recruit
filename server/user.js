const express = require('express');
const Router = express.Router();
const utils=require('utility')
const model=require('./model');
const User=model.getModel('user');
const Chat=model.getModel('chat');
const filter={pwd:0}
Router.get('/del',function (req,res) {
    // User.remove({},function (err,doc) {
    //     res.json({code:0})
    // })
    Chat.remove({},function (err,doc) {
        res.json({code:0})
    })
})
Router.get('/list',function (req,res) {
    const {type}=req.query
    User.find({type},function (err,doc) {
        res.json({data:doc,code:0})
    })
})

Router.get('/getmsglist',function (req,res) {
    const {userid}=req.cookies
    User.find({},function (e,userdoc) {
        let users={}
        userdoc.forEach((v)=>{
            users[v._id]={name:v.user,avatar:v.avatar}
        })
        Chat.find({'$or':[{from:userid},{to:userid}]},function (err,doc) {

            if (!err){
                doc.unshift({read:true});
                res.json({code:0,msgs:doc,users:users})
            }
        })
    })

})


Router.post('/login',function (req,res) {
    const {user,pwd} =req.body
    User.findOne({user,pwd:utils.md5(pwd)},filter,function (err,doc) {
        if (!doc){
            return res.json({code:1,msg:'用户名或密码错误'})
        }
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
Router.post('/register',function (req,res) {
    const {user,pwd,type}=req.body;
    console.log({user,pwd,type});
    User.findOne({user},function (err,doc) {
        if (doc){
            return res.json({code:1,msg:'用户已存在'})
        }
        var userModel=new User({user,type,pwd:utils.md5(pwd)})
        userModel.save(function (err,doc) {
            if (err){
                return res.json({code:1,msg:'后端错误'})
            }
            const {user,type,_id}=doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
        // User.create({user,type,pwd:utils.md5(pwd)},function (e,d) {
        //     if (e){
        //         return res.json({code:1,msg:'后端错误'})
        //     }
        //     return res.json({code:0,msg:'注册成功'})
        // })
    })
})
Router.post('/update',function (req,res) {
    const {userid}=req.cookies
    const body=req.body
    if (!userid){
        res.json({'code':'1'})
    }
    User.findByIdAndUpdate(userid,body,function (err,doc) {
        if (err){
            res.json({'code':'1',msg:'后端出错'});
        }
        const data=Object.assign({},{user:doc.user,type:doc.type},body)
        res.json({'code':'0',data:data})
    })
})
Router.get('/info',function (req,res) {
    const {userid} =req.cookies
    if(!userid){
        res.json({'code':'1'});
    }
    User.findOne({_id:userid},filter,function (err,doc) {
        if (err){
            res.json({'code':'1',msg:'后端出错'});
        }
        if (doc){
            res.json({'code':'0',data:doc});
        }
    })

    Router.post('/readmsg',function (req,res) {
        const {userid} =req.cookies
        const {to}=req.body
        Chat.update(
        {from:to,to:userid},
        {"$set":{read:true}},
        {'multi':true},
        function (err,doc) {
            if (!err){
               return res.json({num:doc.nModified,code:0});
            }
            return res.json({code:1});
        })

    })

})
module.exports=Router