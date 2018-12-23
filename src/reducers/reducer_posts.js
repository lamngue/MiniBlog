import {
	FETCH_POSTS,
	FETCH_POST,
	DELETE_POST,
	LIKE_POST,
	UNLIKE_POST
} from "../actions/";
import _ from "lodash";
export default function(state = {}, action) {
	let allPosts = [];
	let replacePost;
	let index;
	let newState;
	switch (action.type) {
		case FETCH_POSTS:
			allPosts = action.payload.data; //[post1,post2]
			// {4:post}
			return _.mapKeys(action.payload.data, "_id");
		case FETCH_POST:
			const post = action.payload.data;
			///console.log(post);
			newState = { ...state };
			newState[post._id] = post;
			return newState;
		case LIKE_POST:
			replacePost = action.payload.data;
			allPosts = _.values({...state});
			console.log(allPosts);
			index = _.findIndex(allPosts, {_id: replacePost._id});
			// Replace item at index using native splice
			allPosts.splice(index, 1, replacePost);
			return _.mapKeys(allPosts, "_id");
		case UNLIKE_POST:
			replacePost = action.payload.data;
			allPosts = _.values({...state});
			console.log(allPosts);
			index = _.findIndex(allPosts, {_id: replacePost._id});
			// Replace item at index using native splice
			allPosts.splice(index, 1, replacePost);
			return _.mapKeys(allPosts, "_id");
		default:
			return state;
	}
}
