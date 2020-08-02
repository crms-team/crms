import React,{Component} from 'react';
import './Content.css';
import Visual from './Visual/Visual';
import Commit from './Commit/Commit';

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Visual/>
                <Commit/>
            </div>
        );
    }
}

export default Content;