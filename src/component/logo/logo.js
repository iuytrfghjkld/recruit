import React,{Component} from 'react'

import './logo.css'
export default class Logo extends Component{
    render(){
        return (
            <div className="logo">
                <img src={require('./job.png')} alt=""/>
            </div>
        )
    }
}