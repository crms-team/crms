import React,{Component} from 'react';
import Board from './Components/Board';
import './App.css';
import Detail from './Components/Detail/Detail';
import Listview from './Components/Listview/Listview';
import EnhancedTable from './Components/Listview/Table';

class App extends Component{
  render(){
    return(
      <div className="App">
        {/* <Board/> */}
        {/* <Detail /> */}
        <Listview />
      </div>
    );
  }
}

export default App;
