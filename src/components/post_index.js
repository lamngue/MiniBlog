import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/";
import { Link } from "react-router-dom";
import _ from "lodash";
class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}
	renderPost() {
		return _.map(this.props.posts, post => {
			return (
				<li className="list-group-item">
					<Link to={`/user/${post.username}`}>
						Poster: {post.username}
					</Link>
					<br />
					Created At: {post.createdAt}, near {post.location}
					<br />
					<Link to={`/posts/${post._id}`}>{post.title}</Link>
				</li>
			);
		});
	}
	render() {
		const styles = {
			'margin-left': '10%',
			'margin-right': '10%'
		}
		let username;
		if (Object.values(this.props.users)[0]) {
			username = Object.values(this.props.users)[0].username;
		}
		return (
			<div>
				<div className="text-xs-right">
					<Link className="btn btn-danger" to="/login">
						{" "}
						Back to Login
					</Link>
					<Link className="btn btn-danger" to="/register">
						{" "}
						Register new user
					</Link>
					<Link className="btn btn-primary" to="/posts/new">
						Add a post!
					</Link>
					<h3 className="text-center" style={{ textAlign: "center" }}>
						Hello {username}, how are you today?
					</h3>
				</div>
				<h2 className="text-center">POSTS</h2>
				<ul className="list-group" style={styles}>{this.renderPost()}</ul>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		posts: state.posts,
		users: state.users
	};
}
export default connect(
	mapStateToProps,
	{ fetchPosts }
)(PostsIndex);
