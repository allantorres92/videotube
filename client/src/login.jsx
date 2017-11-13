import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import { login } from './actions';


class loginForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            username:"",
            password:"",
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

       this.props.login({username:this.state.username,password:this.state.password},this.props.history)
        
        event.preventDefault();
    }

    render() {
        return(
        <div className="row justify-content-center">
            <div className="col-8">
                <h2 className="LoginTitle">Login</h2>
                {this.props.auth.error && <h6 className="errorMsg">Invalid Username or Password </h6>}
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="InputUser">UserName</label>
                        <input 
                            type="text" 
                            required 
                            className="form-control" 
                            id="InputUser" 
                            placeholder="Enter username"
                            name="username"
                            onChange={this.handleInputChange}
                            value={this.state.username}
                        />
                    </div>
                        <div className="form-group">
                        <label htmlFor="InputPassword">Password</label>
                        <input 
                            type="password" 
                            required 
                            className="form-control" 
                            id="InputPassword" 
                            placeholder="Password"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>                
        );
    }
}


const mapStateToProps = state => {
  return {auth:state.toJS().auth};
};

export default connect(mapStateToProps, {login})(loginForm);
