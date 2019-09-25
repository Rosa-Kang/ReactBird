import React, { Component } from 'react';
import AddPost from './AddPost';
import Post from './Post';
import { connect } from 'react-redux';
import { getPosts, getPostsByFollowingUsers } from '../../actions/postActions';
import LoadingPosts from './LoadingPost';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Paper from '@material-ui/core/Paper'


class ListPost extends Component{
    state = {
        allPosts: false
    }
    componentDidMount(){
        this.props.getPosts()
    }

    handleChange = (event) => {
        this.setState({
            allPosts: event.target.checked
        })
    }
    
    componentDidUpdate(prevProps, prevState) {
        if(prevState.allPosts !== this.state.allPosts) {
            this.state.allPosts ?  this.props.getPostsByFollowingUsers() : this.props.getPosts()
        }
    }

    render() {
        const { list, loading } = this.props;
        const { allPosts } = this.state;
        console.log(list);
        const items = list && list.map(el => <Post key={el._id} post={el} />)
        return(
            <div>
                <AddPost />
                <Paper>
                <FormControlLabel 
                control={
                    <Switch checked={allPosts} onChange={this.handleChange} />
                }
                label={allPosts ? 'All Posts' : 'From following users '}
                />
                                </Paper>
                { loading ? <LoadingPosts /> :  items}

            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
    list: state.post.list,
    loading: state.post.loading
})

export default connect(mapStateToProps, {getPosts, getPostsByFollowingUsers} )(ListPost);