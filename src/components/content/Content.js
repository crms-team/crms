import React,{Component} from 'react';
import './content.css';
import Visual from './visualization';
import Commit from './commit';
import CreateIns from './create-instance';
import info from './information/info'
import {Route} from 'react-router-dom'

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Route exact path="/" component={Visual}/>
                <Route exact path="/" component={Commit}/>
                <Route exact path="/" component={CreateIns}/>
                <Route exact path="/info" component={info}/>
            </div>
        );
    }
}

export default Content;