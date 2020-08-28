import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import Visualization from "./components/visualization";
import Passwd from "./components/passwd";
import Dashboard from "./components/dashboard";
import Resource from "./components/resource";
import Detail from "./components/detail/detail";
import History from "./components/history"
import "./App.css";

class App extends Component {
    Auth(){
      if(sessionStorage.login==undefined){
          return <Redirect to="/"/>
      }
      else if((window.location.href=="http://localhost:3000/")&&(sessionStorage.login=="true")){
          return <Redirect to="/board"/>
      }
    }  

    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Passwd} />
                {this.Auth()}
                <Route exact path="/list/:type" component={Resource} />
                <Route exact path="/board" component={Dashboard} />
                <Route exact path="/detail/:key_id/:type/:id" component={Detail} />
                <Route exact path="/visual" component={Visualization} />
                <Route exact path="/history" component={History}/>
            </div>
        );
    }
}

export default App;
