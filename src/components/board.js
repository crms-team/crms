import React,{Component} from 'react';
import Content from './content/content'
import './board.css';
import Sidemenu from './sidemenu/sidemenu';

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