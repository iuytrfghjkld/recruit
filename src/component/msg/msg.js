import React,{Component} from 'react'
import {connect} from 'react-redux'
import {List,Badge} from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';
@connect(state=>state)
export default class Msg extends Component{
    getLast(arr){
        return arr[arr.length-1]
    }
    render(){
        const Item = List.Item;
        const Brief = Item.Brief;
        const userid=this.props.user._id
        const userinfo=this.props.chat.users
        const msgGroup={}
        this.props.chat.chatmsg.forEach(v=>{
            msgGroup[v.chatid]=msgGroup[v.chatid]||[]
            msgGroup[v.chatid].push(v)
        })
        const chatList=Object.values(msgGroup).sort((a,b)=> {
            const a_last=this.getLast(a).create_time
            const b_last=this.getLast(b).create_time
            return b_last-a_last
        })

        return(
            <div>
                {chatList.map((v)=>{
                    const lastItem=this.getLast(v)
                    const readNum=v.filter(c=>!c.read&&c.to==userid).length
                    const targetId=lastItem.from==userid?lastItem.to:lastItem.from
                    if(!userinfo[targetId]){
                        return null
                    }
                    console.log(v);
                    return(
                        <List key={lastItem._id}>
                            <Item
                                extra={<Badge text={readNum}></Badge>}
                                thumb={require(`../img/${userinfo[targetId].avatar}.png`)}
                                arrow='horizontal'
                                onClick={()=>this.props.history.push(`/chat/${targetId}`)}
                            >
                                {lastItem.content}
                                <Brief>{userinfo[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}
            </div>
        )
    }
}