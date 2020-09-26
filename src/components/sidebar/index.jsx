import React, { Component } from "react";
import "./sidebar.scss";
import { Link } from "react-router-dom";
import {
    FiSettings,
    FiCreditCard,
    FiGitBranch,
    FiLayers,
    FiDatabase,
} from "react-icons/fi";

class Sidebar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // Check if sidebar menu is open
            isDashboard: false,
            isResource: false,
            isSetting: false,
        };
    }
    render() {
        const { isDashboard, isResource, isSetting } = this.state;

        return (
            <div className="Sidebar-container">
                <div className="Sidebar">
                    <div style={{overflowX: 'hidden'}}>
                        <p className="Sidebar-title">MENU</p>
                        <hr />
                        <ul className="menu">
                            {/*     MENU - DASHBOARD      */}
                            <a>
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isDashboard: !isDashboard,
                                            isResource: false,
                                            isSetting: false,
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

                            {
                                /*
                                    <a>
                                        <li>
                                            <FiDatabase className="material-icons" />
                                            <p className="menulist">Billing</p>
                                        </li>
                                    </a>
                                */
                            }

                            {/*     MENU - SETTING   */}
                            <Link to="/setting">
                                <li
                                    onClick={() => {
                                        this.setState({
                                            isSetting: !isSetting,
                                            isDashboard: false,
                                            isResource: false,
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
                </div>
            </div>
        );
    }
}

export default Sidebar;
