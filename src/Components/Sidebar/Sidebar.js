import React,{Component} from 'react';
import './Sidebar.css'
import Menu from './Menu/Menu'
import Resource from './Resource/Resource'

class Sidebar extends Component{
    render(){
        return(
            <div className="Sidebar">
                <Menu/>
                <Resource/>
            </div>
        );
    }
}

export default Sidebar;