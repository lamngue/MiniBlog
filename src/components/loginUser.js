import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/';
import { loginWithFaceBook } from '../actions/';
import FacebookLogin from 'react-facebook-login';
let facebookUser;
class LoginUser extends Component {
    renderField(field) {
        const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        return (
            <div className={className1}>
				<label>{field.label}</label>
				<input className="form-control"
				type="text" 
				{...field.input}/>
				<div class="text-help">
					{field.meta.touched?field.meta.error:''}
				</div>
			</div>
        );
    }
    renderPasswordField(field) {
        const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        return (
            <div className={className1}>
				<label>{field.label}</label>
				<input className="form-control"
				type="password" 
				{...field.input}/>
				<div class="text-help">
					{field.meta.touched?field.meta.error:''}
				</div>
			</div>
        );
    }
    onSubmit(values) {
        this.props.login(values).then(() => {
            this.props.history.push('/posts');
        }).catch((e) => {
            alert('Incorrect form submission');
        });
    }
    responseFacebook(response) {
        facebookUser = {
            username: response.name,
            email: response.email
        }
    }
    componentClicked(){
        this.props.loginWithFaceBook(facebookUser).then(() => {
            this.props.history.push('/posts');
        });
    }
    render() {
        const { handleSubmit } = this.props; //props passed back by ReduxForm
        const styles = {
            'margin-left': '10%',
            'margin-right': '10%'
        }
        return (
            <div>
				<FacebookLogin
				    appId="375026166397978"
				    autoLoad={true}
				    fields="name,email,picture"
				    onClick={this.componentClicked.bind(this)}
				    callback={this.responseFacebook} />
				<h3 className = "text-center" style={{textAlign: "center"}}> Now you are registered! Please login </h3>
				<form onSubmit = {handleSubmit(this.onSubmit.bind(this))} style={styles}>
					<Field label="Email" name="email" 
					component={this.renderField} 
					type="text" />
					<Field label="Password" name="password" 
					component={this.renderPasswordField} 
					type="password" />
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/register" className="btn btn-success">Back to Register</Link>
				</form>
			</div>
        );
    }
}

function validate(values) {
    //receives the users input and output an object
    const errors = {};

    //validate the inputs from 'values'
    if (!values.email) {
        errors.categories = "Enter an email";
    }
    if (!values.password) {
        errors.content = "Enter a password";
    }
    return errors;
}
export default reduxForm({
    validate,
    form: 'LoginUserForm'
})(
    connect(null, { login, loginWithFaceBook })(LoginUser)
);