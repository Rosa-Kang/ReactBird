import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Header from './Header';


import { connect } from 'react-redux';
import { getbackgroundImage } from '../../actions/apiActions';
import { withStyles } from '@material-ui/core/styles';
import { mergeClasses } from '@material-ui/styles';


const styles = {
    mains: {
        backgroundSize: '100%',
        backgroundPosition: 'center center',
        minHeight: '100vh'
    }
}

class Main extends Component {

    componentDidMount() {
        this.props.getbackgroundImage();
        console.log(this.props.bgsource);
    }


    render() {
        const { classes } =this.props;
        const divStyle = {
            backgroundImage: `url(${this.props.bgsource})`
        }
        return (
            <div style={divStyle} className = { classes.mains }>
                <Header />
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} style={{ marginTop: 30 }}>
                        {this.props.children}
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = (state) => (
    {
        bgsource: state.apibg.bgsource
    }
)

export default connect(mapStateToProps, {getbackgroundImage})(withStyles(styles)(Main));