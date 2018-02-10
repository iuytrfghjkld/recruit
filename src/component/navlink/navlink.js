import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {TabBar} from 'antd-mobile'
@withRouter
@connect(state=>state.chat)
export default class NavLinkBar extends Component{

    render(){
        const navList=this.props.data.filter((v)=>!v.hide)
        const pathname=this.props.location.pathname
        return(

                <TabBar>
                    {navList.map((v)=>(
                        <TabBar.Item
                            badge={v.path=='/msg'?this.props.unread:0}
                            key={v.path}
                            title={v.text}
                            icon={{uri: require(`./img/${v.icon}.png`)}}
                            selectedIcon={{uri: require(`./img/${v.icon}-active.png`)}}
                            selected={pathname===v.path}
                            onPress={()=>{
                                this.props.history.push(v.path)
                            }}
                        >
                        </TabBar.Item>
                    ))}
                </TabBar>

        )
    }
}
NavLinkBar.propTypes={
    data:PropTypes.array.isRequired
}