import React,{Component} from 'react'
import {List,Grid} from 'antd-mobile';
export default class AvatarSelecor extends Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        const avatarList='boy,girl,man,woman'.split(',')
            .map(v=>({
                icon:require(`../img/${v}.png`),
                text:`${v}`
            }))
        const gridHeader=this.state.icon
            ?(<div>
                <span>已选择头像</span>
                <img style={{width:20}} src={this.state.icon} alt="" />
            </div>)
            :'请选择头像'
        return(
            <div>
                <List renderHeader={() => gridHeader} >
                    <Grid data={avatarList}
                          onClick={ele=>{
                              this.setState(ele)
                              this.props.selectAvatar(ele.text)
                          }}
                    />
                </List>

            </div>
        )
    }
}