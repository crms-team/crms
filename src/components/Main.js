import React, {Component} from 'react';
import './main.css';
import Form from './form/form';
import Card from './card/card';
import Dashboard from './dashboard/dashboard'

class Main extends Component{
    

    render(){
        return(
            <div className="Main">
                <Dashboard/>
            </div>
        );
    }
}

export default Main;