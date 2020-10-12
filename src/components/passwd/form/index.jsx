import React, {Component} from 'react';
import './form.css';

class Form extends Component {
    constructor(props){
        super(props);
        this.state = {
            value : '',
        };
        this.onChange.bind()
        this.tryLogin.bind()
        this.onKeyPress.bind()
    }

    tryLogin = () => {
        fetch(`${process.env.REACT_APP_SERVER_URL}/api/passwd?passwd=${btoa(this.state.value)}`).then(res=>res.json()).then(res=>{
            if (res.result){
                sessionStorage.setItem("login", "true")
                window.location.href='/dashboard'
            } else {
                alert('Failed Login')
            }
        })
    }

    onChange = (e) =>{
        this.setState({
            value : e.target.value,
        })
    };

    onKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.tryLogin()
        }
    }

    render(){
        return(
            <div className="form">
                <input className="form__input" required type='password' placeholder='password' value={this.state.value} onChange={this.onChange} onKeyPress={this.onKeyPress}/>
                <button className="form__button" onClick={this.tryLogin}>continue</button>
            </div>
        );
    }
}

export default Form;