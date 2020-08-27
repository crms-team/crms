import React, {Component} from 'react';
import './main.css';
import Form from './form/form';
import Card from './card/card';
import { Route } from 'react-router-dom';
import Board from './board';

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