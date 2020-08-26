import React, {Component} from 'react';
import './main.css';
import Form from './form/form';
import Card from './card/card';

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