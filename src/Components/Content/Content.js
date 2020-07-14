import React,{Component} from 'react';
import './Content.css';
import Visual from './Visual/Visual';
import ResourceData from './ResourceData/ResourceData';
import Log from './Log/Log';
import Commit from './Commit/Commit';

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Visual/>
                <Log/>
                <ResourceData/>
                <Commit/>
            </div>
        );
    }
}

export default Content;