import React,{Component} from 'react';
import Board from './Components/Board';
import './App.css';
import Detail from './Components/Detail/Detail';

class App extends Component{
  render(){
    return(
      <div className="App">
        {/* <Board/> */}
        <Detail />
      </div>
    );
  }
}

export default App;
