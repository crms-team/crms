import React,{Component} from 'react';
import './Resource.css';
import List from './list/list'


class Resource extends Component{

    render(){
        return(
            <div className="Resource"style={{backgroundColor:this.props.color}}>
                <List/>
            </div>
        );
    }
}

export default Resource;