import React,{Component} from 'react'
import Logo from '../../component/logo/logo'
import {login} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import handleChange from '../../component/handlechange/handlechange'
import { List, InputItem,Button,WhiteSpace,WingBlank } from 'antd-mobile';


// class Hellow extends Component{
//     render(){
//         return <h2>基础组件原有的内容</h2>
//     }
// }
//
// function wapperHellow(Comp) {
//     class WrapHellow extends Component{
//         render(){
//             return(
//                 <div>
//                     <h2>这是高阶组件的内容</h2>
//                     <Comp></Comp>
//                 </div>
//             )
//         }
//     }
//     return WrapHellow
// }
// Hellow=wapperHellow(Hellow)

@connect(
    (state)=>state.user,
    {login}
    )
@handleChange
export default class Login extends Component{
    constructor(props){
        super(props)
        this.toRegister=this.toRegister.bind(this)
        this.toLogin=this.toLogin.bind(this)
    }
    toLogin(){
        this.props.login(this.props.state)
    }

    toRegister(){
     this.props.history.push('/register')
    }
    render(){
        return (
            <div>
                <Logo></Logo>
                {this.props.msg?<p>{this.props.msg}</p>:null}
                {(this.props.redirectTo&&this.props.redirectTo!='/login')?<Redirect to={this.props.redirectTo}/>:null}
                <List>
                    <InputItem  onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                </List>
                <WingBlank>
                    <WhiteSpace/>
                    <Button onClick={this.toLogin} type="primary">登录</Button>
                    <WhiteSpace/>
                    <Button onClick={this.toRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
            )
    }
}