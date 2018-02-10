import axios from 'axios'
import {redirectTo} from '../utils'
const AUTH_SUCCESS='AUTH_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LOAD_DATA='LOAD_DATA'
const LOGOUT='LOGOUT'
const initState={
    user:'',
    type:'',
    msg:'',
    redirectTo:''
}
export function user(state=initState,action) {
    switch (action.type){
        case AUTH_SUCCESS: return {...state,redirectTo:redirectTo(action.payload),msg:'',...action.payload}
        case LOAD_DATA: return {...state,...action.payload}
        case LOGOUT:return{...initState}
        case ERROR_MSG :return {...state,msg:action.msg}
        default : return state
    }
}
function errorMsg(msg) {
    return {type:ERROR_MSG,msg:msg}
}



function authSuccess(data) {
    return {type:AUTH_SUCCESS,payload:data}
}

export function logoutSubmit() {
    return {type:LOGOUT}
}

export function loadData(data) {
    return {type:LOAD_DATA,payload:data}
}


export function update(data) {
    return dispatch=>{
        axios.post('/user/update',data).then((res)=>{
            if (res.status==200 && res.data.code==0){
                dispatch(authSuccess(res.data.data))
            }else{
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}

export function login({user,pwd}) {
    if (!user || !pwd){
        return errorMsg('用户名密码必须输入')
    }
   return async dispatch=>{
        const res= await axios.post('/user/login',{user,pwd})
            if (res.status==200){
                if (res.data.code==0){
                    dispatch(authSuccess(res.data.data))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
    }

}
export default function register(user,pwd,repearpwd,type) {
    if (!user || !pwd){
        return errorMsg('请输入用户名或密码')
    }
    if(pwd!==repearpwd){
        return errorMsg('两次密码不正确')
    }
    return dispatch=>{
        axios.post('/user/register',{user,pwd,type}).then((res)=>{
            if (res.status==200){
                if (res.data.code==0){
                    console.log(res.data.data._id);
                    dispatch(authSuccess({user,pwd,repearpwd,type,_id:res.data.data._id}))
                }else{
                    dispatch(errorMsg(res.data.msg))
                }
            }
        })
    }
}