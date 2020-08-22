import React,{Component} from 'react';
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import Test1 from './test1/test1'
import Test2 from './test1/test2'

import './Board.css';
import { connect } from 'react-redux';
import Sidemenu from './Sidemenu/Sidemenu';

class Board extends Component{
    constructor (props) {
        super(props)
        this.state = { count: 0}
        this.setCount = this.setCount.bind(this)
    }

    setCount(value) {
        this.setState({count: value})
    }

    render(){
        return(
            <main className="brd">
                <Content/>
                <Sidemenu />
            </main>
        );
    }
}

export default Board;