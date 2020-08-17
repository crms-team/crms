import React,{Component} from 'react';
import './Content.css';
import Visual from './Visual/Visual';
import Commit from './Commit/Commit';
import CreateIns from './CreateIns/CreateIns';

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Visual/>
                <Commit/>
                <CreateIns/>
            </div>
        );
    }
}

export default Content;