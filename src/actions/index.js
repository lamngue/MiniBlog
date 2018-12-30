import axios from "axios";
export const CREATE_POST = "create_post";
export const FETCH_POSTS = "fetch_posts";
export const FETCH_POST = "fetch_post";
export const DELETE_POST = "delete_post";
export const REGISTER_USER = "register_user";
export const LOGIN_USER = "login_user";
export const FETCH_USER = "fetch_user";
export const LOGIN_USER_FACEBOOK = "login_user_facebook";
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";
export const LIKE_POST = "like_post";
export const UNLIKE_POST = "unlike_post";
const ROOT_URL = "https://miniblog-backend.herokuapp.com";
let axiosConfig = {
	headers: {
		"Content-Type": "application/json;charset=UTF-8",
		"Access-Control-Allow-Origin": "https://miniblog-backend.herokuapp.com"
	}
};

export const signInGoogle = userId => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};
export const signOutGoogle = () => {
	return {
		type: SIGN_OUT
	};
};
export function fetchPosts() {
	return async function(dispatch) {
		// body...
		const res = await axios.get(`${ROOT_URL}/posts`);
		dispatch({
			type: FETCH_POSTS,
			payload: res
		});
	};
}

export function createPost(values, username, location, callback) {
	values.username = username;
	values.location = location;
	console.log(values);
	const newPost = axios
		.post(`${ROOT_URL}/posts`, values)
		.then(() => callback());
	return {
		type: CREATE_POST,
		payload: newPost
	};
}

export function fetchPost(id) {
	return async function(dispatch) {
		// body...
		const res = await axios.get(`${ROOT_URL}/posts/${id}`);
		dispatch({
			type: FETCH_POST,
			payload: res
		});
	};
}

export function deletePost(id, username, callback) {
	const request = {
		id,
		username
	};
	const postDelete = axios
		.delete(`${ROOT_URL}/posts`, { data: request })
		.then(() => callback());
	return {
		type: DELETE_POST,
		payload: id
	};
}

export function register(user) {
	//send user to backend
	return async function(dispatch) {
		// body...
		try{
			const res = await axios.post(`${ROOT_URL}/register`, user);
			dispatch({
				type: REGISTER_USER,
				payload: res
			});
		}
		catch{
			alert("Invalid Credentials!")
		}
	};
}
export function login(user) {
	// receives logged in user from backend
	return async function(dispatch) {
		// body...
		try{
			const res = await axios.post(`${ROOT_URL}/login`, user);
			dispatch({
				type: LOGIN_USER,
				payload: res
			});
		}
		catch{
			alert("Incorrect password or username!")
		}
	};
}
export function loginWithFaceBook(user) {
	//check if user already exists, else save user to database
	return async function(dispatch) {
		// body...
		const res = await axios.post(`${ROOT_URL}/loginWithFaceBook`, user);
		dispatch({
			type: LOGIN_USER_FACEBOOK,
			payload: res
		});
	};
}
export function fetchUser(username) {
	return async function(dispatch) {
		// body...
		const user = await axios.get(`${ROOT_URL}/user/${username}`);
		dispatch({
			type: FETCH_USER,
			payload: user
		});
	};
}

export function likePost(username, postId) {
	return async function(dispatch) {
		// body...
		const request = {
			username,
			postId
		};
		const res = await axios.put(`${ROOT_URL}/likePost`, request);
		dispatch({
			type: LIKE_POST,
			payload: res
		});
	};
}
export function unlikePost(username, postId) {
	return async function(dispatch) {
		// body...
		const request = {
			username,
			postId
		};
		const res = await axios.put(`${ROOT_URL}/unlikePost`, request);
		dispatch({
			type: UNLIKE_POST,
			payload: res
		});
	};
}
