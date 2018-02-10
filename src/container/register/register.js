import React,{Component} from 'react'

import Logo from '../../component/logo/logo'
import { List, InputItem,Button,WhiteSpace,WingBlank,Radio } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import register from '../../redux/user.redux'
import handleChange from '../../component/handlechange/handlechange'
@connect(
    state=>state.user,
    {register}
)
@handleChange
export default class Register extends Component{
    constructor(props){
        super(props)
        this.handleRegister=this.handleRegister.bind(this)
    }
    componentDidMount(){
        this.props.handleChange('type','genius')
    }

    handleRegister(){
        this.props.register(this.props.state.user,this.props.state.pwd,this.props.state.repeatpwd,this.props.state.type)
    }
    render(){
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo?<Redirect to={this.props.redirectTo} /> :null}
                <Logo></Logo>
                <List>
                    {this.props.msg?<p>{this.props.msg}</p>:null}
                    <InputItem onChange={v=>this.props.handleChange('user',v)}>用户名</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v=>this.props.handleChange('pwd',v)}>密码</InputItem>
                    <WhiteSpace/>
                    <InputItem type="password" onChange={v=>this.props.handleChange('repeatpwd',v)}>确认密码</InputItem>
                    <WhiteSpace/>
                    <RadioItem onChange={()=>this.props.handleChange('type','genius')} checked={this.props.state.type=='genius'}>
                        牛人
                    </RadioItem>
                    <RadioItem onChange={()=>this.props.handleChange('type','boss')} checked={this.props.state.type=='boss'}>
                        BOSS
                    </RadioItem>
                </List>
                <WingBlank>
                    <WhiteSpace/>
                    <Button onClick={this.handleRegister} type="primary">注册</Button>
                </WingBlank>
            </div>
        )
    }
}