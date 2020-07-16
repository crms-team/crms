import React, {Component} from 'react';
import './Card.css';

class Card extends Component {
    constructor(props){
        super(props);

        this.state = {
            description : "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        }
    }
    
    render(){
        return(
            <div className="card">
                <h1 className="card__title">Getting Started</h1>
                <p className="card__description">{this.state.description}</p>
                <p className="card__description--title">&nbsp;Please copy the password from either location and paste it below.&nbsp;</p>
                <p className="card__description">{this.state.description}</p>
            </div>
        )
    }
}

export default Card;