import React,{Component} from 'react';
import './Menu.css';

class Menu extends Component{

    resource='blue';
    budget='green';

    resourcetext=()=>{
        this.props.test(this.resource);
    }
    budgettext=()=>{
        this.props.test(this.budget);
    }

    render(){
        
        return(
            <div className="Menu">
                <button className="clresource" onClick={this.resourcetext}>
                    리소스
                </button>
                <button className="budget"onClick={this.budgettext}>
                    예산
                </button>
            </div>
        );
    }
}

export default Menu;