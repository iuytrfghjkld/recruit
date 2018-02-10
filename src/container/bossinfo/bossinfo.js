import React,{Component} from 'react'
import AvatarSelecor from '../../component/avatar-selecor/avatar-selecor'
import { NavBar ,List, InputItem,TextareaItem,Button} from 'antd-mobile';
import {Redirect} from 'react-router-dom'
import {update} from '../../redux/user.redux'
import {connect} from 'react-redux'
@connect(state=>state.user,{update})
export default class BossInfo extends Component{
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
    componentDidMount(){

    }
    render(){
        const path =this.props.location.pathname
        const redirect=this.props.redirectTo
        return(
            <div>
                {redirect && redirect!==path?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <NavBar mode="dark">BOSS完善信息页</NavBar>
                <AvatarSelecor
                    selectAvatar={(imgname)=>{
                        this.setState({
                            avatar:imgname
                        })
                    }}
                ></AvatarSelecor>
                <List>
                    <InputItem onChange={(v)=>this.handleChange('title',v)}>招聘职位</InputItem>
                    <InputItem onChange={(v)=>this.handleChange('company',v)}>公司名称</InputItem>
                    <InputItem onChange={(v)=>this.handleChange('money',v)}>职位薪资</InputItem>
                    <TextareaItem onChange={(v)=>this.handleChange('desc',v)} rows={3} autoHeight title='职位要求'></TextareaItem>
                </List>
                <Button
                    onClick={()=>this.props.update(this.state)}
                    type="primary"
                >保存</Button>
            </div>
        )
    }
}