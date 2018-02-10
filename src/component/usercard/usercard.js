import React,{Component} from 'react'
import { Card,WingBlank,WhiteSpace } from 'antd-mobile';
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
@withRouter
export default class UserCard extends Component{
    render(){
        return(
            <WingBlank>
                <WhiteSpace/>
                {this.props.userlist.map((v)=>(
                    v.avatar? <Card onClick={()=>this.props.history.push(`/chat/${v._id}`)} key={v._id}>
                        <Card.Header
                            title={v.user}
                            thumb={require(`../img/${v.avatar}.png`)}
                            extra={<span>{v.title}</span>}
                        />
                        <Card.Body>
                            {v.type=='boss'?<div>公司:{v.company}</div>:null}
                            {v.desc.split('\n').map((v)=>(
                                <div key={v}>{v}</div>
                            ))}
                            {v.type=='boss'?<div>薪资待遇:{v.money}</div>:null}
                        </Card.Body>
                    </Card>:null
                ))}
            </WingBlank>
        )
    }
}
UserCard.propTypes={
    userlist:PropTypes.array.isRequired
}