import React, {Component} from 'react';
import './Main.css';
import Form from './Form/Form';
import Card from './Card/Card';

class Main extends Component{
    

    render(){
        return(
            <div className="Main">
                <Card/>
                <Form/>
            </div>
        );
    }
}

export default Main;