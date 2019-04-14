import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchPosts } from "../actions/";
import { likePost } from "../actions/";
import { unlikePost } from "../actions/";
import { showLikers, hideLikers } from "../actions/";
import { Link } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import _ from "lodash";
class PostsIndex extends Component {
	componentDidMount() {
		this.props.fetchPosts();
	}
	renderLikeButton(post, currentUser) {
		if (
			post.likedBy.includes(currentUser)
		) {
			return (
				<Button
					onClick={() => this.props.unlikePost(currentUser, post._id)}
					bsStyle="warning"
				>
					Unlike
				</Button>
			);
		} else {
			return (
				<Button
					onClick={() => this.props.likePost(currentUser, post._id)}
					bsStyle="success"
				>
					Like
				</Button>
			);
		}
	}

	renderLikeMessage(post) {
		if (post.likedBy.length === 1) {
			const liker = post.likedBy[0];
			return (
				<React.Fragment>
					<a variant="primary">
						{liker} likes this
					</a>
				</React.Fragment>
			);
		} 
		else if (post.likedBy.length > 1) {
			return (
				<React.Fragment>
					<a href="#" variant="primary" onClick={() => this.props.showLikers(post._id)}>
						{post.likedBy.length} people like this
					</a>
					<Modal show={this.props.show.postID === post._id ? true : false} onHide={this.handleClose}>
					<Modal.Header>
					  <Modal.Title>People who liked this</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<ul>
							{post.likedBy.map((liker,id) => {
								return <li key={id}>{liker}</li>
							})}
						</ul>
					</Modal.Body>
					<Modal.Footer>
					  <Button variant="secondary sucess" onClick={() => this.props.hideLikers()}>
						Close
					  </Button>
					</Modal.Footer>
				  </Modal>
				</React.Fragment>
			);
		} else {
			return `No like yet`;
		}
	}
	renderPost() {
		const currentUser = Object.values(this.props.users)[0].username;
		return _.map(this.props.posts, post => {
			return (
				<li key={post._id} className="list-group-item">
					<Link to={`/user/${post.username}`}>
						Poster: {post.username}
					</Link>
					<br />
					Created At: {post.createdAt}, near {post.location}
					<br />
					<Link to={`/posts/${post._id}`}>{post.title}</Link>
					<br />
					{this.renderLikeButton(
						post,
						currentUser
					)}{" "}
					{this.renderLikeMessage(post)}
				</li>
			);
		});
	}
	render() {
		const styles = {
			"margin-left": "10%",
			"margin-right": "10%"
		};
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
				<ul className="list-group" style={styles}>
					{this.renderPost()}
				</ul>
			</div>
		);
	}
}
function mapStateToProps(state) {
	return {
		posts: state.posts,
		users: state.users,
		show: state.handleShowLikers
	};
}
export default connect(
	mapStateToProps,
	{ fetchPosts, likePost, unlikePost, showLikers, hideLikers }
)(PostsIndex);
