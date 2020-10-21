import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Visualization from "./components/visualization";
import Passwd from "./components/passwd";
import Dashboard from "./components/dashboard";
import Resource from "./components/resource";
import Detail from "./components/detail";
import History from "./components/history"
import Setting from "./components/setting"
import Scheduler from "./components/scheduler"
import "./App.css";

class App extends Component {
    Auth(){
      if(sessionStorage.login=="false"){
          localStorage.removeItem('key')
          return <Redirect to="/"/>
      }
      else if((window.location.href==`${process.env.REACT_APP_SERVER_URL}/`)&&(sessionStorage.login=="true")){
        return <Redirect to="/dashboard"/>
      }
    }  

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Passwd} />
                {this.Auth()}
                <Route exact path="/resources/:type" component={Resource} />
                <Route exact path="/dashboard" component={Dashboard} />
                <Route exact path="/detail/:key_id/:type/:id" component={Detail} />
                <Route exact path="/visualization" component={Visualization} />
                <Route exact path="/history" component={History}/>
                <Route exact path="/setting" component={Setting} />
                <Route exact path="/scheduler" component={Scheduler} />
            </div>
        );
    }
}

export default App;
