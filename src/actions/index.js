import axios from 'axios';
export const CREATE_POST = 'create_post';
export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const DELETE_POST = 'delete_post';
export const REGISTER_USER = 'register_user';
export const LOGIN_USER = 'login_user';
export const FETCH_USER = 'fetch_user';
export const LOGIN_USER_FACEBOOK = 'login_user_facebook';
export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
const ROOT_URL = 'https://miniblog-backend.herokuapp.com';
let axiosConfig = {
    headers: {
        'Content-Type': 'application/json;charset=UTF-8',
        "Access-Control-Allow-Origin": "*",
    }
};

export const signInGoogle = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	} 
}
export const signOutGoogle = () => {
	return {
		type: SIGN_OUT
	}
}
export function fetchPosts(){
	const request = axios.get(`${ROOT_URL}/posts`);
	//console.log(request.posts);
	return{
		type: FETCH_POSTS,
		payload:request
	}
}

export function createPost(values,username,callback){
	values.username = username;
	const newPost = axios.post(`${ROOT_URL}/posts`,values).then(() => callback());	
	return{
		type: CREATE_POST,
		payload: newPost
	}
}

export function fetchPost(id){
	const aPost = axios.get(`${ROOT_URL}/posts/${id}`);
	return{
		type: FETCH_POST,
		payload: aPost
	}
}

export function deletePost(id,username,callback){
	const request = {
		id,
		username
	}
	const postDelete = axios.delete(`${ROOT_URL}/posts`,{data: request}).then(()=>callback());
	return{
		type: DELETE_POST,
		payload:id
	}
}

export function register(user){
	//send user to backend
	console.log(user);
	const userQuery = axios.post(`${ROOT_URL}/register`,user);
	return{
		type: REGISTER_USER,
		payload: userQuery
	}
}
export function login(user){
	// receives logged in user from backend
	console.log(user);
	const userLogin = axios.post(`${ROOT_URL}/login`,user);
	if(!userLogin){
		alert('Incorrect Password');
		return;
	}
	console.log(userLogin);
	return{
		type: LOGIN_USER,
		payload: userLogin
	}
}
export function loginWithFaceBook(user){
	//check if user already exists, else save user to database
	console.log(user);
	const userSaved = axios.post(`${ROOT_URL}/loginWithFaceBook`,user);
		return{
			type: LOGIN_USER_FACEBOOK,
			payload: userSaved
		}
}
export function fetchUser(username){
	const user = axios.get(`${ROOT_URL}/user/${username}`);
	console.log(user);
	if(!user){
		alert('User not found!');
		return;
	}
	return{
		type: FETCH_USER,
		payload: user
	}
}