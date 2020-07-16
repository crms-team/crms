import React,{Component} from 'react';
import './Sidebar.css'
import Menu from './Menu/Menu'
import Resource from './Resource/Resource'
import Logo from './Logo/Logo';

class Sidebar extends Component{
    constructor(props){
        super(props);
        this.state={
            bgcol:"blue"
        }
        this.test=this.test.bind(this);
    }

    test=(text)=>{
        this.setState(()=>{
            return {bgcol:text}
        })
    }
    
    render(){
        return(
            <div className="Sidebar">
                <Logo/>
                <Menu test={this.test}/>
                <Resource color={this.state.bgcol}/>
            </div>
        );
    }
}

export default Sidebar;