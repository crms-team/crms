import React,{Component} from 'react';
import './content.css';
import Visual from './visualization';

class Content extends Component{
    render(){
        return(
            <div className="Content">
                <Visual/>
            </div>
        );
    }
}

export default Content;