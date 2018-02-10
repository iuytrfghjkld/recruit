
import csshook from 'css-modules-require-hook/preset'
import assethook from 'asset-require-hook'
assethook({
    extensions: ['png','jpg'],
    limit: 10000
})
import  staticPath from '../build/asset-manifest.json'
import React from 'react'
import {renderToString} from 'react-dom/server'
import {createStore,applyMiddleware,compose} from 'redux'
import {Provider} from 'react-redux'
import {StaticRouter} from 'react-router-dom'
import thunk from 'redux-thunk'
import reducers from '../src/reducer'
import App from '../src/app'

import express from 'express'
// const express = require('express')
import userRouter from './user'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'

const app = express()
const server=require('http').Server(app)
const io=require('socket.io')(server)


// function App() {
//     return(
//         <div>
//             <p>server render</p>
//             <p>server render2</p>
//         </div>
//     )
// }

const model=require('./model');
const User=model.getModel('user');
const Chat=model.getModel('chat');

io.on('connection',function (socket) {
    socket.on('sendMsg',function (data) {
        // io.emit('recvmsg',{msg:data.text})
        console.log(data);
        const {from,to,msg}=data
        const chatid=[from,to].sort().join('-');
        Chat.create({chatid,from,to,content:msg},function (err,doc) {
            console.log(doc);
            io.emit('recvmsg',Object.assign({},doc._doc))
        })
    })
})


app.use(bodyParser.json())
app.use(cookieParser())
app.use('/user',userRouter)
app.use((req,res,next)=>{
    console.log(req.url);
    if (req.url.startsWith('/user/')||req.url.startsWith('/static/')){
        return next()
    }

    const store=createStore(reducers,compose(
        applyMiddleware(thunk)
    ))
    let context={}
    const markup=renderToString((
        <Provider store={store}>
            <StaticRouter location={req.url} context={context} >
                <App/>
            </StaticRouter>
        </Provider>
    ))

    const pageHtml=`<!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            <meta name="theme-color" content="#000000">
                <link rel="stylesheet" href="/${staticPath["main.css"]}">
            <title>React App</title>
          </head>
          <body>
            <div id="root">${markup}</div>
            <script src="/${staticPath["main.js"]}"></script>
          </body>
        </html>
    `
    // return res.sendFile(path.resolve('build/index.html'))
    return res.send(pageHtml)
})
//设置静态资源地址
app.use('/',express.static(path.resolve('build')))//在最外层查找build以此来引入

server.listen(9093,function(){
	console.log('Node app start at port 9093')
})



