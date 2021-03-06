import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {fetchUser} from '../actions';
import _ from 'lodash';
class RenderUser extends Component{
	componentDidMount(){
		const username = this.props.match.params.id;
		this.props.fetchUser(username);
	}
	renderUser(){
		const user = this.props.user;
		const posts = _.mapKeys(user.postCreated,'_id');
		return _.map(posts, (post) => {
			//console.log(post);
			return(<li className="list-group-item">
				Created At: {post.createdAt}
				<br></br>
				Title: {post.title}
				<br></br>
				Categories: {post.categories}
				<br></br>
				Content: {post.content}
			</li>);
		});
	}
	render(){
		if(!this.props.user){
			return(
				<h3>LOADING USER</h3>
			)
		}
		else{
			const styles = {
				'margin-left': '10%',
				'margin-right': '10%'
			}
			const user = this.props.user;
			return(
				<div>
				<Link className = 'btn btn-primary' to = '/posts'>
					Back to main
				</Link>
				<h3 className = "text-center">Poster: {user.username} </h3>
				<h2 className = "text-center">POSTS</h2>
					<ul style={styles} className="list-group">
						{this.renderUser()}
					</ul>
				</div>
			)
		}
	}
}
function mapStateToProps(state,ownProps){
	const userView = state.fetchUser;
	const username = ownProps.match.params.id;
	return{
		user: userView[username]
	}
}
export default connect(mapStateToProps,{fetchUser})(RenderUser);