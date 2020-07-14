import React,{Component} from 'react';
import './Menu.css';


class Menu extends Component{
    render(){
        return(
            <div className="Menu">
                <button className="clresource" >
                    리소스
                </button>
                <button className="budget">
                    예산
                </button>
            </div>
        );
    }
}

export default Menu;