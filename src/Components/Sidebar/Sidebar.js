import React, { Component } from 'react';
import {Route,Link} from 'react-router-dom';
import './sidebar.scss';
import { 
    FiSettings, 
    FiCreditCard, 
    FiGitBranch, 
    FiLayers, 
    FiDatabase, 
} from "react-icons/fi";

class Sidemenu extends Component{
    constructor(props){
        super(props);

        this.state = {
            isDashboard : false,
            isResource : false,
            isSetting: false
        }
    }

    hidetooltip() {
        if(document.getElementsByClassName('tooltip')[0]){
            document.getElementsByClassName('tooltip')[0].style.display='none';
        }    
    }

    render(){

        const { isDashboard, isResource, isSetting } = this.state;

        return(
            <div className="sidemenu-container">
                <div className="sidemenu">
                    <div>
                        <p className="sidemenu-title">MENU</p>
                        <hr/>
                        <ul onClick={this.hidetooltip()} className="menu">

                        {/*     MENU - DASHBOARD      */}
                        <a href="#dashboard">
                            <li onClick={()=>{
                                this.setState({ 
                                    isDashboard : !isDashboard,
                                    isResource : false,
                                    isSetting : false
                                });
                            }}>
                                <FiCreditCard className="material-icons"/>
                                <p className="menulist">Dashboard</p>
                            </li>
                        </a>  
                                { isDashboard &&
                                    <>
                                        <Link to="/info"><p className="menulist-in dashboard">Home</p></Link>
                                        <p className="menulist-in dashboard">Log</p>
                                    </>
                                }

                        {/*      MENU - RESOURCE     */}
                            <a href="#resource">
                                <li onClick={()=>{
                                this.setState({ isResource : !isResource, isDashboard : false, isSetting : false });
                            }}>
                                <FiGitBranch className="material-icons"/>
                                <p className="menulist">Resource</p>
                                </li>
                            </a>
                            { 
                                isResource &&
                                <>
                                    <p className="menulist-in resource">Compute</p>
                                    <p className="submenu">Server</p>
                                    <p className="submenu">Volume</p>
                                    <p className="submenu">IP</p>
                                    <p className="submenu">Key Pair</p>
                                        
                                    <p className="menulist-in resource">Database</p>
                                                                    
                                    <p className="menulist-in resource">Network</p>
                                    <p className="submenu">VPC</p>
                                    <p className="submenu">Subnet</p>
                                    <p className="submenu">Security Group</p>
                                    
                                    <p className="menulist-in resource">Storage</p>
                                    <p className="submenu">Bucket</p>
                                </>
                            }
                            
                           {/*      MENU - VISUALIZATION    */}         
                           <Link to="/"><li>
                                <FiLayers className="material-icons"/>
                                <p className="menulist">Visualization</p>
                            </li></Link>

                            {/*     MENU - BILLING      */}
                            <a href="#billing"><li>
                                <FiDatabase className="material-icons"/>
                                <p className="menulist">Billing</p>
                            </li></a>

                            {/*     MENU - SETTING   */}
                            <a href="#setting"><li onClick={ () => 
                                { this.setState({ 
                                    isSetting : !isSetting, 
                                    isDashboard : false, 
                                    isResource : false 
                                });
                            }}>
                                <FiSettings className="material-icons"/>
                                <p className="menulist" >Setting</p>
                            </li></a>
                            {
                                isSetting &&
                                <>
                                    <p className="menulist-in">Password</p>
                                    <p className="menulist-in">Cloud List</p>
                                    <p className="menulist-in">Cloud Add</p>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidemenu;