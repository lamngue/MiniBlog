import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchPost,deletePost} from '../actions';
import {Link} from 'react-router-dom';
class PostShow extends Component{
	componentDidMount(){
		const {id} = this.props.match.params;
        console.log(this.props.match.params);
		this.props.fetchPost(id);
	}
	onDelete(){
		const loggedInUser = Object.values(this.props.user)[0].username;
        if(loggedInUser !== this.props.post.username){
            alert('You are not author of this post');
            return;
        }
        const {id} = this.props.match.params;
        this.props.deletePost(id,loggedInUser,() => {
            this.props.history.push('/posts');
        });
    }
	render(){
		const {post} = this.props;
		return(
			<div>
			    <Link className="btn btn-primary" to="/posts">
					Back to main
				</Link>
				<button className="btn btn-danger pull-xs-right" 
				onClick={this.onDelete.bind(this)}> Delete Post</button>
					<h4>Poster: {post.username} </h4>
					<h3>{post.title}</h3>
					<h6>Categories: {post.categories}</h6>
					<p>{post.content}</p>
			</div>
		);
	}
}                               
function mapStateToProps(state,ownProps){
	const posts = state.posts;
	const {id} = ownProps.match.params;
	return{
		post: posts[id],
		user: state.users
	}
}
export default connect(mapStateToProps,{fetchPost,deletePost})(PostShow);