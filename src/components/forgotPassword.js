import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {forgotPassword} from '../actions/'
class ForgotPassword extends Component{
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
    onSubmit(values) {
        this.props.forgotPassword(values).then(() => {
        	alert("An email with the reset password has been sent to your email!")
        });
    }
    render(){
		const {handleSubmit} = this.props; //props passed back by ReduxForm
		const styles = {
			'margin-left': '10%',
			'margin-right': '10%'
		}
		return(
			<div>
				<form onSubmit = {handleSubmit(this.onSubmit.bind(this))} style = {styles}>
					<Field label="Email" name="email" 
					component={this.renderField} 
					type="text" />
					<button type="submit" className="btn btn-primary">Submit</button>
					<Link to="/login" className="btn btn-success">Back to Login</Link>
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
        errors.email = "Enter an email";
    }
    return errors;
}

export default reduxForm({
    validate,
    form: 'ForgotPasswordForm'
})(
    connect(null, {forgotPassword})(ForgotPassword)
);