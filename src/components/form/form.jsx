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
    }

    tryLogin = () => {
        fetch(`http://localhost:4000/api/passwd?passwd=${btoa(this.state.value)}`).then(res=>res.json()).then(res=>{
            if (res.result){
                sessionStorage.setItem("login", "true")
                window.location.href='/board'
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

    render(){
        return(
            <div className="form">
                <input className="form__input" required type='password' placeholder='password' value={this.state.value} onChange={this.onChange}/>
                <button className="form__button" onClick={this.tryLogin}>continue</button>
            </div>
        );
    }
}

export default Form;