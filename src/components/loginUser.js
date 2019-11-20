import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/';
import { loginWithFaceBook } from '../actions/';
import LoadingProgressBar from './LoadingBar';
let facebookUser;
class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.loadingBar = React.createRef();
    }

    renderField(field) {
        const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        return (
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
    renderPasswordField(field) {
        const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
        return (
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
    onSubmit(values) {
        this.loadingBar.current.show();
        this.props.login(values).then(() => {
            if(this.props.users !== null){
                this.props.history.push('/posts');
            }
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
            'marginLeft': '10%',
            'marginRight': '10%'
        }
        return (
            <div>
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
                    <Link to="/forgotPassword" className="btn btn-danger">Forgot Password?</Link>
				</form>
                <LoadingProgressBar ref={this.loadingBar} />
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
    if (!values.password) {
        errors.password = "Enter a password";
    }
    return errors;
}
function mapStateToProps(state) {
    return {
        users: state.users
    };
}
export default reduxForm({
    validate,
    form: 'LoginUserForm'
})(
    connect(mapStateToProps, { login, loginWithFaceBook })(LoginUser)
);