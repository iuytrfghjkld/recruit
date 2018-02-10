const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/my-chat'
mongoose.connect(DB_URL)
//表示成功连入mongo
// mongoose.connection.on('connected',function(){
//     console.log('mongo connect success')
// })
const models={
    user:{
        user:{type:String,require:true},
        pwd:{type:String,require:true},
        type:{type:String,require:true},
        //头像
        avatar:{type:String},
        //个人简介或职位简介
        desc:{type:String},
        //职位名
        title:{type:String},
        //如果你是BOSS还得有公司名
        company:{type:String},
        money:{type:String},//薪资
    },
    chat:{
        chatid:{type:String,require:true},//在发送人ID和接受人ID之间组合成一个新字符串以此来一次性查询聊天记录
        from:{type:String,require:true},//发送人
        to:{type:String,require:true},//接受人
        read:{type:Boolean,default:false},//是否已读
        content:{type:String,require:true,default:''},//内容
        create_time:{type:Number,default:Date.now}//发送时间
    }
}
for(let m in models){
    mongoose.model(m,new mongoose.Schema(models[m]))
}
module.exports={
    getModel:function (name) {
       return mongoose.model(name)
    }
}