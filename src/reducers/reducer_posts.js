import {FETCH_POSTS,FETCH_POST,DELETE_POST} from '../actions/';
import _ from 'lodash';
export default function(state = {},action){
	switch(action.type){
		case FETCH_POSTS:
			//allPosts = action.payload.data; //[post1,post2]
			// {4:post}
			return _.mapKeys(action.payload.data,'_id');
		case FETCH_POST:
			const post = action.payload.data;
			///console.log(post);
			let newState = {...state};
			newState[post._id] = post;
			return newState;
		default:
			return state;
	}
}