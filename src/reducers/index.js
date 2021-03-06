import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { loadingBarReducer } from 'react-redux-loading-bar'
import PostsReducer from './reducer_posts';
import UsersReducer from './reducer_users';
import FetchUserReducer from './reducer_fetchUser';
import HandleShowLikers from './handleModal';
const rootReducer = combineReducers({
	posts: PostsReducer,
	form: formReducer,
	users: UsersReducer,
	fetchUser: FetchUserReducer,
	loadingBar: loadingBarReducer,
	handleShowLikers: HandleShowLikers
});

export default rootReducer;
