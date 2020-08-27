import React, { Component } from 'react';
import './sidemenu.scss';
import {Link} from 'react-router-dom'
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
    render(){

        const { isDashboard, isResource, isSetting } = this.state;

        return(
            <div className="sidemenu-container">
                <div className="sidemenu">
                    <div>
                        <p className="sidemenu-title">MENU</p>
                        <hr/>
                        <ul className="menu">

                        {/*     MENU - DASHBOARD      */}
                        <a>
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
                                        <Link to="/board"> <p className="menulist-in dashboard">Home</p></Link>
                                        <p className="menulist-in dashboard">Log</p>
                                    </>
                                }

                        {/*      MENU - RESOURCE     */}
                            <a>
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
                                    <Link to="/list/server"><p className="submenu">Server</p></Link>
                                    <Link to="/list/volume"><p className="submenu">Volume</p></Link>
                                    <Link to="/list/ip"><p className="submenu">IP</p></Link>
                                    <Link to="/list/keypair"><p className="submenu">Key Pair</p></Link>
                                        
                                    <Link to="/list/database"> <p className="menulist-in resource">Database</p></Link>
                                                                    
                                    <p className="menulist-in resource">Network</p>
                                    <Link to="/list/vpc"><p className="submenu">VPC</p></Link>
                                    <Link to="/list/subnet"><p className="submenu">Subnet</p></Link>
                                    <Link to="/list/securitygroup"><p className="submenu">Security Group</p></Link>
                                    
                                    <p className="menulist-in resource">Storage</p>
                                    <Link to="bucket"><p className="submenu">Bucket</p></Link>
                                </>
                            }
                            
                           {/*      MENU - VISUALIZATION    */}         
                           <Link to="/visual"><li>
                                <FiLayers className="material-icons"/>
                                <p className="menulist">Visualization</p>
                            </li></Link>

                            {/*     MENU - BILLING      */}
                            <a><li>
                                <FiDatabase className="material-icons"/>
                                <p className="menulist">Billing</p>
                            </li></a>

                            {/*     MENU - SETTING   */}
                            <Link to="/setting"><li onClick={ () => 
                                { this.setState({ 
                                    isSetting : !isSetting, 
                                    isDashboard : false, 
                                    isResource : false 
                                });
                            }}>
                                <FiSettings className="material-icons"/>
                                <p className="menulist" >Setting</p>
                            </li></Link>
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