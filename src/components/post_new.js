import React,{Component} from 'react';
//redux form is similar to connect helper
import {Field,reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from '../actions/';
import axios from 'axios';
let newPost = {};
	
class PostNew extends Component{
	renderField(field){
		const className1 = `form-group ${field.meta.touched && field.meta.error ? 'has-danger' : ''}`
		return(
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
	
	onSubmit(values){
		//this === component
		let returnString;
		if(navigator.geolocation){
			navigator.geolocation.getCurrentPosition((pos) => {
				const lat = pos.coords.latitude;
				const lng = pos.coords.longitude;
				const API_KEY = `${process.env.REACT_APP_GOOGLE_API_KEY}`;
				console.log(API_KEY);
				axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${API_KEY}`)
				.then((res) => {
					returnString = res.data.results[3].formatted_address;
					console.log(returnString);
					const username = Object.values(this.props.user)[0].username;
					this.props.createPost(values,username,returnString,()=>{
						this.props.history.push('/posts');
					});
				});
			});
		}
	}
	render(){
		//handleSubmit takes in a function
		const {handleSubmit} = this.props; //props passed back by ReduxForm
		return(
			<form onSubmit = {handleSubmit(this.onSubmit.bind(this))}>
				<Field label="Title" name="title" 
				component={this.renderField} 
				type="text" />
				<Field label="Categories" name="categories" 
				component={this.renderField} 
				type="text" />
				<Field label="Post Contents" name="content" 
				component={this.renderField} 
				type="text" />
				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/posts" className="btn btn-cancel">Back</Link>
			</form>
		);
	}
}
function validate(values){
	//receives the users input and output an object
	const errors = {};

	//validate the inputs from 'values'
	if(!values.title){
		errors.title = "Enter a title!";
	}
	if(!values.categories){
		errors.categories = "Enter a category";
	}
	if(!values.content){
		errors.content = "Enter some content";
	}
	return errors;
}
function mapStateToProps(state){
	return{
		user: state.users
	}
}
export {newPost};
export default reduxForm({
	validate,
	form: 'PostsNewForm'
})(
	connect(mapStateToProps,{createPost})(PostNew)
);