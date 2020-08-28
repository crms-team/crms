import React,{Component} from 'react';
import Sidebar from '../sidebar';
import Logtable from './history';

class History extends Component{
    render(){
        return(
            <>
                <Sidebar/>
                <Logtable/>
            </>
        )
    }
}

export default History;