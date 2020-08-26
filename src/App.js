import React,{Component} from 'react';
import Board from './components/board';
import './App.css';
import Main from './components/main';
import Detail from './components/detail/detail';
import Listview from './components/list-view/list-view';
import Dashboard from './components/dashboard';

class App extends Component{
  render(){
    return(
      <div className="App">
        <Main/>
        {/* <Board/> */}
        {/* <Detail /> */}
        {/* <Listview /> */}
        {/* <Dashboard/> */}
      </div>
    );
  }
}

export default App;
