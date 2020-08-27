import React,{Component} from 'react';
import './content.css';
import Visual from './visualization';
import CreateIns from './create-instance';

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Visual/>
                <CreateIns/>
            </div>
        );
    }
}

export default Content;