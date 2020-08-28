import React, { Component } from "react";
import Board from "./components/board";
import "./App.css";
import Main from "./components/main";
import Dashboard from "./components/dashboard";
import Listview from "./components/list-view/list-view";
import Detail from "./components/detail/detail";
import { Route, Redirect } from "react-router-dom";
import History from "./components/history"

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
                <Route exact path="/" component={Main} />
                {this.Auth()}
                <Route exact path="/list/:type" component={Listview} />
                <Route exact path="/board" component={Dashboard} />
                <Route exact path="/detail/:key_id/:type/:id" component={Detail} />
                <Route exact path="/visual" component={Board} />
                <Route exact path="/history" component={History}/>
            </div>
        );
    }
}

export default App;
