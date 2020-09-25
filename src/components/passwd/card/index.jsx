import React, { Component } from "react";
import "./card.css";

class Card extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // main page
            <div className="card">
                <h1 className="card__title">Getting Started</h1>
                <p className="card__description">
                    CRMS is a tool for management cloud resource as a user interface.
                </p>
                <p className="card__description">
                    CRMS can confirm information of cloud resource and manage cloud resource.
                </p>
                <p className="card__description">
                    We concentrated at four feature when we develop our system. 
                </p>
                <p className="card__description">
                    Default Password: <code>1234</code>                 
                </p>
                <p className="card__description">   
                    Checking ./crms/data/crms.config passwd                
                </p>
                <p className="card__description">   
                    If continue button click but no reponse checking <code>.env</code> file.
                </p>
                <p className="card__description">
                require .env content <code>REACT_APP_SERVER_URL=http://localhost:4000</code>
                </p>
            </div>
        );
    }
}

export default Card;
