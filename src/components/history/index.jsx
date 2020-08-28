import React,{Component} from 'react';
import Sidemenu from '../sidemenu/sidemenu';
import Logtable from './history';

class History extends Component{
    render(){
        return(
            <>
                <Sidemenu/>
                <Logtable/>
            </>
        )
    }
}

export default History;