import {FETCH_USER} from '../actions/index.js';

export default function(state = {},action){
	let fetchUser = {};
	switch(action.type){
		case FETCH_USER:
			const user = action.payload.data;
			//console.log(loggedInUser);
			fetchUser[user.username] = user;
			return fetchUser;
		default:
			return state;
	}
}