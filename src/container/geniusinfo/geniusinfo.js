import React,{Component} from 'react'
import AvatarSelecor from '../../component/avatar-selecor/avatar-selecor'
import {List,InputItem,Button,NavBar,TextareaItem } from 'antd-mobile';
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
@connect(state=>state.user,{update})
export default class GeniusInfo extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    render(){
        const path =this.props.location.pathname
        const redirect=this.props.redirectTo
        return(
            <div>
                {redirect && redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">牛人信息列表</NavBar>
                <AvatarSelecor selectAvatar={(imgname)=>{
                    this.setState({
                        avatar:imgname
                    })
                }}>
                </AvatarSelecor>
                <List>
                    <InputItem onChange={(v)=>this.handleChange('title',v)}>应聘职位</InputItem>
                    <InputItem onChange={(v)=>this.handleChange('money',v)}>薪资要求</InputItem>
                    <TextareaItem onChange={(v)=>this.handleChange('desc',v)} rows={3} autoHeight title='自我简历'></TextareaItem>
                </List>
                <Button
                    onClick={()=>{
                        this.props.update(this.state)
                    }}
                    type="primary">保存</Button>
            </div>
        )
    }
}