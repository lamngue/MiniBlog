import React,{Component} from 'react';
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {register} from '../actions/';
class RegisterUser extends Component{
	renderField(field){
		const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className1}>
				<label>{field.label}</label>
				<input className="form-control"
				type="text" 
				{...field.input}/>
				<div className="text-help">
					{field.meta.touched?field.meta.error:''}
				</div>
			</div>
			);
	}
	renderPasswordField(field){
		const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
			<div className={className1}>
				<label>{field.label}</label>
				<input className="form-control"
				type="password" 
				{...field.input}/>
				<div className="text-help">
					{field.meta.touched?field.meta.error:''}
				</div>
			</div>
			);
	}
	onSubmit(values){
		//console.log(values);
		this.props.register(values).then(() => {
			this.props.history.push('/login');
		})
		.catch((e) => {
			alert('Email or username already taken');
		});
	}

	render(){
		const {handleSubmit} = this.props; //props passed back by ReduxForm
		const styles = {
			'marginLeft': '10%',
			'marginRight': '10%'
		}
		return(
			<div>
				<form onSubmit = {handleSubmit(this.onSubmit.bind(this))} style = {styles}>
					<Field label="Username" name="username" 
					component={this.renderField} 
					type="text" />
					<Field label="Email" name="email" 
					component={this.renderField} 
					type="text" />
					<Field label="Password" name="password" 
					component={this.renderPasswordField} 
					type="password" />
					<button type="submit" className="btn btn-primary">Register</button>
					<Link to="/login" className="btn btn-success">Have an account? Login</Link>
				</form>
			</div>
		);
	}
}
function validate(values){
	//receives the users input and output an object
	const errors = {};
	if(!values.username){
		errors.username = "Enter an username"
	}
	if(!values.email){
		errors.email = "Enter an email";
	}
	if(!values.password){
		errors.password = "Enter a password";
	}
	return errors;
}
export default reduxForm({
	validate,
	form: 'RegisterUserForm'
})(
	connect(null,{register})(RegisterUser)
);