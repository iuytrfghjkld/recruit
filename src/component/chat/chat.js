import React,{Component} from 'react'
import {List,InputItem,NavBar,Icon,Grid} from 'antd-mobile'
import {getMsgList,sendMsg,recvMsg,readMsg} from '../../redux/chat.redux'
import {connect} from 'react-redux'
import {getChatId} from '../../utils'
import QueueAnim from 'rc-queue-anim';
// import io from 'socket.io-client'
// const socket = io('ws://localhost:9093')
@connect(state=>state,{getMsgList,sendMsg,recvMsg,readMsg})
export default class Chat extends Component{
    constructor(props){
        super(props)
        this.state={
            text:'',
            showEmoji:false
        }
        this.handleChange=this.handleChange.bind(this)
        this.fixCarousel=this.fixCarousel.bind(this)
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length && !!document.cookie){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentWillUnmount(){
        const to=this.props.match.params.user
        this.props.readMsg(to);
    }

    handleChange(){
        // socket.emit('sendMsg',{text:this.state.text})
        // this.setState({text:''});
        const from=this.props.user._id
        const to =this.props.match.params.user
        const msg=this.state.text
        this.props.sendMsg({from,to,msg})
        this.setState({text:'',showEmoji:false});
    }

    fixCarousel(){
        setTimeout(function(){
            window.dispatchEvent(new Event('resize'))
        },0)
    }

    render(){
        const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
            .split(' ')
            .filter(v=>v)
            .map(v=>({text:v}))

        const userid=this.props.match.params.user
        const Item=List.Item
        const users=this.props.chat.users
        const chatid=getChatId(this.props.user._id,userid)
        const chatMsgs=this.props.chat.chatmsg.filter(v=>v.chatid==chatid)
        if(!users[userid]){
            return null
        }
        return(
            <div id="chat-page">
                <NavBar
                    model='dark'
                    icon={<Icon onClick={()=>this.props.history.goBack()} type="left"/>}
                >
                    {this.props.chat.users[userid].name}
                </NavBar>

                <div className="layout">
                    <QueueAnim delay={100} className="queue-simple">
                    {chatMsgs.map(v=> {
                        console.log(v);
                        const avatar=require(`../img/${users[v.from].avatar}.png`)
                        return v.from==userid?(
                            <List key={v._id}>
                                <Item thumb={avatar}>{v.content}</Item>
                            </List>
                        )
                            :(
                                <List key={v._id}>
                                    <Item className="chat-me" extra={<img src={avatar} alt="" />}>{v.content}</Item>
                                </List>
                            )
                    })}
                    </QueueAnim>
                </div>

                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            onChange={(v)=>this.setState({text:v})}
                            value={this.state.text}
                            extra={
                                <div>
                                    <span onClick={()=> {
                                        this.setState({showEmoji: !this.state.showEmoji})
                                        this.fixCarousel();
                                    }} style={{marginRight:15}}>😃</span>
                                    <span onClick={()=>this.handleChange()}>发送</span>
                                </div>

                            }
                        ></InputItem>
                    </List>
                    {this.state.showEmoji
                        ? <Grid
                            data={emoji}
                            columnNum={9}
                            isCarousel={true}
                            carouselMaxRow={4}
                            onClick={(e)=>{this.setState({text:this.state.text+e.text})}}
                        />
                        :null
                    }

                </div>



            </div>
        )
    }
}