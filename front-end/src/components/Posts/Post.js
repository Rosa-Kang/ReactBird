import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { getUserProfile } from '../../actions/profileActions';
import { deletePost, getPosts } from '../../actions/postActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

const styles = {
    paper: {
        padding: 10,
        display: 'flex',
        marginTop: 10,
        justyfyContent: 'center'
    },
    avatar: {
        minWidth: 10,
        margin: '4px 10px 4px 4px'

    },
    login: {
        marginBottom: 5
    },
    time: {
        marginLeft: 10,
        color: '#bbb',
        fontSize: 14
    },
    btnDelete : {

    },
    contentsBlock:{
        width: '80%'
    },
    btnBlock : {
        display: 'flex',
        alignItems: 'center'
    }

}


class Post extends Component {


    handleRemove = () => {
        const { history } = this.props;
        console.log(this.props.post._id);
        this.props.deletePost(this.props.post._id);
        this.props.getPosts();
        if(this.props.getPosts() === undefined){
            this.props.getPosts();
            history.push('/');
        } else {
            history.push('/');
        }
    }


    render() {
        const { classes, post, user } = this.props
        let deleteBtn;

        if (post.user.login === user.login) {
            deleteBtn = (
                <div className={classes.btnBlock}>
                    <Button variant="outlined" className={classes.btnDelete} onClick={this.handleRemove} style={{
                        backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`, color : 'white'
                    }}>
                        Delete
                    </Button>
                </div>
            );
        } else {
            deleteBtn = (<div></div>);
        }

        return (
            <Paper className={classes.paper}>
                <div
                    className={classes.avatar}
                    style={{
                        backgroundColor: `#${post.user.id.slice(post.user.id.length - 3)}`
                    }}
                ></div>
                <div className={classes.contentsBlock}>
                    <h3 className={classes.login}>
                        <Link to={`/profile/${post.user.id}`} > {post.user.login} </Link>
                        <span className={classes.time}>{(new Date(post.createdAt)).toLocaleString()}</span></h3>
                    {post.text}
                </div>
                    {deleteBtn}
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    list: state.post.list
})


export default connect(mapStateToProps,
    {
        getUserProfile,
        deletePost,
        getPosts
    })(withRouter(withStyles(styles)(Post)));