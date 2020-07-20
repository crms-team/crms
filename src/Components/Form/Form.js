import React, {Component} from 'react';
import './Form.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : '',
            placeholder : 'password',
            buttonText : 'continue',
        };
    }

    onSubmit = (e) => {
        e.preventDefault();
    };

    onChange = (e) =>{
        this.setState({
            value : e.target.value,
        })
    };

    render(){
        return(
            <>
                <form className="form" onSubmit={this.onSubmit}>
                    <input className="form__input" required type='password' placeholder={this.state.placeholder} value={this.state.value} onChange={this.onChange}/>
                    <button className="form__button"> {this.state.buttonText} </button>
                </form>
            </>
        );
    }
}

export default Form;