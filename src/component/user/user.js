import React,{Component} from 'react'
import { Result,List ,WhiteSpace,Modal} from 'antd-mobile';
import {Redirect,withRouter} from 'react-router-dom';
import browserCookies from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {connect} from 'react-redux'
@withRouter
@connect(state=>state.user,{logoutSubmit})
export default class User extends Component{
    constructor(props){
        super(props)
        this.logout=this.logout.bind(this)
    }

    logout(){
        const alert = Modal.alert;
        alert('安全退出', '是否确定退出', [
            { text: '取消', onPress: () => console.log('cancel') },
            {
                text: '确认',
                onPress: () => {
                    this.props.logoutSubmit();
                    browserCookies.erase('userid');
                    this.props.history.push('/login')
                },
            },
        ])

    }

    render(){
        const props=this.props
        const Item = List.Item;
        const Brief = Item.Brief;
        return props.user?(
            <div>
                <Result
                    img={<img src={require(`../img/${props.avatar}.png`)} style={{width:50}} alt=""/>}
                    title={props.user}
                    message={props.company}
                />
                <List renderHeader={() => '简介'}>
                    <Item multipleLine>
                        {props.title}
                        {props.desc.split('\n').map((v)=>(
                            <Brief key={v}>{v}</Brief>
                        ))}
                        {props.money?<Brief>薪资:{props.money}</Brief>:null}
                    </Item>
                </List>
                <WhiteSpace/>
                <List>
                    <Item onClick={this.logout}>退出登录</Item>
                </List>
            </div>
        ):<Redirect to={props.redirectTo} />
    }
}