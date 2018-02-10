//校验用户状态
import {Component} from 'react'
import { withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {loadData} from '../../redux/user.redux'
import axios from 'axios'
@withRouter//加上这个之后就能使用this.props.history
@connect(state=>state.user,{loadData})
export default class AuthRouter extends Component{
    componentDidMount(){
        console.log(this.props.location.pathname);
        // this.props.location.pathname（用来判断当前url）
        const publicList=['/login','/register'];
        if (publicList.indexOf(this.props.location.pathname)>-1){
            return null
        }
        axios.get('/user/info').then((res)=>{
            if (res.status==200){
                if(res.data.code==0){
                    this.props.loadData(res.data.data)
                }else{
                    this.props.history.push('/login')
                }
            }
        })
    }
    render(){
        return null
    }
}