import React,{Component} from 'react';
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import './Board.css';
import { connect } from 'react-redux';

class Board extends Component{
    render(){
        return(
            <main className="brd">
                <Content/>
                <Sidebar/>
            </main>
        );
    }
}

export default Board;