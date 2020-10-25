import React, { Component } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import {
    FiSettings,
    FiCreditCard,
    FiGitBranch,
    FiLayers,
    FiDatabase,
    FiCalendar
    
} from "react-icons/fi";
import { local } from "d3";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Check if sidebar menu is open
            isDashboard: false,
            isResource: false,
            isSetting: false,
            isScheduler : false
        };
    }
    render() {
        const { isDashboard, isResource, isSetting, isScheduler } = this.state;
        const key=JSON.parse(localStorage.getItem("key"))

        async function refresh(key){
            let result=true;
            for(let tmp of key){
                let url=`${process.env.REACT_APP_SERVER_URL}/api/cloud/data?key_id=${tmp.key}&type=data`
                let response = await fetch(url).then((res) => res.json())
                response.result==true ? alert(tmp.key + " data fetch Success") : alert(tmp.key + " data fetch Failed")
            }
        }

        return (
            <>
            <div className="Sidebar-container">
                <div className="Sidebar">
                    <div style={{ overflowX: "hidden" }}>
                        <p className="Sidebar-title">MENU</p>
                        <ul className="menu">
                            {/*     MENU - DASHBOARD      */}
                            <a>
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isDashboard: !isDashboard,
                                            isResource: false,
                                            isSetting: false,
                                            isScheduler : false
                                        });
                                    }}
                                >
                                    <FiCreditCard className="material-icons" />
                                    <p className="menulist">Dashboard</p>
                                </li>
                            </a>
                            {isDashboard && (
                                <>
                                    <Link to="/dashboard">
                                        {" "}
                                        <p className="menulist-in dashboard">
                                            Home
                                        </p>
                                    </Link>
                                    <Link to="/history">
                                        <p className="menulist-in dashboard">
                                            History
                                        </p>
                                    </Link>
                                </>
                            )}

                            {/*      MENU - RESOURCE     */}
                            <a>
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isResource: !isResource,
                                            isDashboard: false,
                                            isSetting: false,
                                            isScheduler : false
                                        });
                                    }}
                                >
                                    <FiGitBranch className="material-icons" />
                                    <p className="menulist">Resource</p>
                                </li>
                            </a>
                            {isResource && (
                                <>
                                    <p className="menulist-in resource">
                                        Compute
                                    </p>
                                    <Link to="/resources/server">
                                        <p className="submenu">Server</p>
                                    </Link>
                                    <Link to="/resources/volume">
                                        <p className="submenu">Volume</p>
                                    </Link>
                                    <Link to="/resources/ip">
                                        <p className="submenu">IP</p>
                                    </Link>
                                    <Link to="/resources/keypair">
                                        <p className="submenu">Key Pair</p>
                                    </Link>

                                    <Link to="/resources/database">
                                        {" "}
                                        <p className="menulist-in resource">
                                            Database
                                        </p>
                                    </Link>

                                    <p className="menulist-in resource">
                                        Network
                                    </p>
                                    <Link to="/resources/vpc">
                                        <p className="submenu">VPC</p>
                                    </Link>
                                    <Link to="/resources/subnet">
                                        <p className="submenu">Subnet</p>
                                    </Link>
                                    <Link to="/resources/securitygroup">
                                        <p className="submenu">
                                            Security Group
                                        </p>
                                    </Link>

                                    <p className="menulist-in resource">
                                        Storage
                                    </p>
                                    <Link to="/resources/bucket">
                                        <p className="submenu">Bucket</p>
                                    </Link>
                                </>
                            )}

                            {/*      MENU - VISUALIZATION    */}
                            <Link to="/visualization">
                                <li>
                                    <FiLayers className="material-icons" />
                                    <p className="menulist">Visualization</p>
                                </li>
                            </Link>

                            {/*     MENU - BILLING      */}

                            {/*
                                    <a>
                                        <li>
                                            <FiDatabase className="material-icons" />
                                            <p className="menulist">Billing</p>
                                        </li>
                                    </a>
                                */}

                                {/*     MENU - Scheduler    */}
                                <Link  to="/scheduler">
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isSetting: false,
                                            isDashboard: false,
                                            isResource: false,
                                            isScheduler : !isScheduler
                                        });
                                    }}
                                >
                                    <FiCalendar className="material-icons" />
                                    <p className="menulist">Scheduler</p>
                                </li>
                                </Link>
                            {isScheduler && (
                                <>
                                </>
                            )}

                            {/*     MENU - SETTING   */}
                            <Link to="/setting">
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isSetting: !isSetting,
                                            isDashboard: false,
                                            isResource: false,
                                            isScheduler : false
                                        });
                                    }}
                                >
                                    <FiSettings className="material-icons" />
                                    <p className="menulist">Setting</p>
                                </li>
                            </Link>
                            {isSetting && (
                                <>
                                    <p className="menulist-in">Password</p>
                                    <p className="menulist-in">Cloud List</p>
                                    <p className="menulist-in">Cloud Add</p>
                                </>
                            )}

                        </ul>
                    </div>
                    <Button 
                        className="sidebar-logout-btn"
                        onClick={()=>{
                            sessionStorage.setItem("login",false)
                            window.location.reload()
                        }}
                    >Logout</Button>
                    <Button 
                        className="sidebar-refresh-btn"
                        onClick={async ()=>{
                            await refresh(key)
                            window.location.reload()
                        }}
                    >Refresh</Button>
                </div>
            </div>
            
            </>
        );
    }
}

export default Sidebar;
