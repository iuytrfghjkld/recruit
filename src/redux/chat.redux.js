import axios from 'axios'
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
//获取聊天列表
const MSG_LIST='MSG_LIST'
//读取信息
const MSG_RECV='MSG_RECV'
//标识已读
const MSG_READ='MSG_READ'

const initState={
    chatmsg:[],//聊天信息
    users:{},//所有用户的名字以及头像
    unread:0//是否已读,未读数量
}
export function chat(state=initState,action) {
    switch (action.type){
        case MSG_LIST:
                return {...state,users:action.payload.users,chatmsg:action.payload.msgs,unread:action.payload.msgs.filter(v=>(!v.read && v.to==action.payload.userid)).length}
        case MSG_RECV:
                const unread=action.userid==action.payload.to?1:0
            return {...state,chatmsg:[...state.chatmsg,action.payload],unread:state.unread+unread}
        case MSG_READ:
            //to表示对面ID
            const {to,num}=action.payload
                return {...state,chatmsg:state.chatmsg.map((v)=>{
                    //to==v.from表示如果对面的id等于发送人id就把状态改为true
                    to==v.from?v.read=true:v.read=v.read
                    return v
                }),unread:state.unread-num}
        default:return state
    }
}

export function sendMsg({from,to,msg}) {
    return dispatch=>{
        socket.emit('sendMsg',{from,to,msg})
    }
}

function msgList(msgs,users,userid) {
    return {type:MSG_LIST,payload:{msgs,users,userid}}
}

function msgRecv(data,userid) {
    return {userid,type:MSG_RECV,payload:data}
}
function msgRead({from,to,num}) {
    return {type:MSG_READ,payload:{from,to,num}}
}

export function readMsg(to) {

    return (dispatch,getState)=>{
        axios.post('/user/readmsg',{to}).then((res)=>{
            console.log(res);
            if(res.status==200 && res.data.code==0){
                const from = getState().user._id
                dispatch(msgRead({from,to,num:res.data.num}))
            }
        })
    }

}

export function recvMsg() {
    return (dispatch,getState)=>{
        socket.on('recvmsg',function (data) {
            const userid=getState().user._id
            dispatch(msgRecv(data,userid));
        })
    }
}



export function getMsgList() {

    return (dispatch,getState)=>{
        axios.get('/user/getmsglist').then((res)=>{
            console.log(getState());
            if (res.status==200 && res.data.code==0){
                const userid=getState().user._id
                dispatch(msgList(res.data.msgs,res.data.users,userid))
            }
        })
    }
}