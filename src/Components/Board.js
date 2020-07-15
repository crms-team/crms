import React,{Component} from 'react';
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import Test1 from './test1/test1'
import Test2 from './test1/test2'

import './Board.css';

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
                <Sidebar/>

                <Test1 count={this.state.count} />
                <Test2 count_func={this.setCount} count={this.state.count} />
            </main>
        );
    }
}

export default Board;