import {LOGIN_USER} from '../actions/index.js';
import {LOGIN_USER_FACEBOOK, SIGN_IN} from '../actions/index.js';

export default function(state = {},action){
	let newState = {};
	let fetchUser = {};
	switch(action.type){
		case LOGIN_USER:
			const loggedInUser = action.payload.data;
			//console.log(loggedInUser);
			newState[loggedInUser._id] = loggedInUser;
			return newState;
		case LOGIN_USER_FACEBOOK:
			const loggedInUserFacebook = action.payload.data;
			console.log(loggedInUserFacebook);
			newState[loggedInUserFacebook._id] = loggedInUserFacebook;
			return newState;
		default:
			return state;
	}
}