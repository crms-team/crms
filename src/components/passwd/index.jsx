import React, {Component} from 'react';
import './main.css';
import Form from './form';
import Card from './card';

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