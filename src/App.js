import React,{Component} from 'react';
import Board from './Components/board';
import './App.css';
import Main from './Components/main';
import Detail from './Components/detail/detail';
import Listview from './Components/listview/listview';
import Dashboard from './Components/dashboard/dashboard';

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
