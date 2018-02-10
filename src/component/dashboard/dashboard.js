import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Switch,Route,Redirect} from 'react-router-dom'
import {NavBar} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
import NavLinkBar from '../navlink/navlink'
import Boss from '../../component/boss/boss'
import Genius from '../../component/genius/genius'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'

import {getMsgList,recvMsg} from '../../redux/chat.redux'



@connect(state=>state,{getMsgList,recvMsg})
export default class DashBoard extends Component{
    componentDidMount(){
        if(!this.props.chat.chatmsg.length &&!!document.cookie) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    render(){
        const user=this.props.user
        const pathname=this.props.location.pathname
        const navList = [
            {
                path:'/boss',
                text:'牛人',
                icon:'boss',
                title:'牛人列表',
                component:Boss,
                hide:user.type==='genius'
            },
            {
                path:'/genius',
                text:'boss',
                icon:'job',
                title:'BOSS列表',
                component:Genius,
                hide:user.type==='boss'
            },
            {
                path:'/msg',
                text:'消息',
                icon:'msg',
                title:'消息列表',
                component:Msg
            },
            {
                path:'/me',
                text:'我',
                icon:'user',
                title:'个人中心',
                component:User
            }
        ]
        const page=navList.find(v=>v.path==pathname)
        return page?(
            <div>
                <NavBar className='fixd-header' mode="dark">{page.title}</NavBar>
                <div style={{marginTop:45}}>
                    <QueueAnim delay={200} type={"scaleX"}>
                        <Route key={page.path} path={page.path} component={page.component}></Route>
                    </QueueAnim>
                </div>
                <NavLinkBar data={navList}>
                </NavLinkBar>
            </div>
        ):<Redirect to="/msg"></Redirect>
    }
}