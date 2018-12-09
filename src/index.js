import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PostsIndex from "./components/post_index.js";
import PostNew from "./components/post_new.js";
import PostShow from "./components/post_show.js";
import RegisterUser from "./components/registerUser.js";
import RenderUser from "./components/renderUser.js";
import LoginUser from "./components/loginUser.js";
import promise from "redux-promise";
import reducers from "./reducers";

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/login" component={LoginUser} />
					<Route path="/posts/new" component={PostNew} />
					<Route path="/posts/:id" component={PostShow} />
					<Route path="/posts" component={PostsIndex} />
					<Route path="/user/:id" component={RenderUser} />
					<Route path="/" component={RegisterUser} />
				</Switch>
			</div>
		</BrowserRouter>
	</Provider>,
	document.querySelector("#root")
);
