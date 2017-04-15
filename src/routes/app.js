/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { AppBar, FlatButton } from 'material-ui'
import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { logout } from 'actions';

@connect(({auth}, props) => {
    return {
        user:auth.user,
        isAuthenticated:auth.isAuthenticated,
    }
}, {
    redirect:replace,
    logout:logout
})
export default class App extends React.Component {
    getRightButton(){
        const {user, isAuthenticated, redirect, location:{ pathname } } = this.props;
        let rightAppEl;
        if((pathname === "/" || pathname === '/login') && !isAuthenticated){
            rightAppEl = <FlatButton label="Sign Up" onTouchTap={() => redirect('/register')} />;
        } else if(pathname === '/register'){
            rightAppEl = <FlatButton label="Login" onTouchTap={() => redirect('/login')} />;
        } else {
            rightAppEl = <div>
                {`Hello, ${user.firstName}`}
                <FlatButton label="Sign out" onTouchTap={this.props.logout} /></div>;
        }
        return rightAppEl;
    };
    render(){
        return (
            <MuiThemeProvider>
                <div className="page-wrapper">
                    <AppBar
                        title="Job Helper"
                        iconElementLeft={<span></span>}
                        iconElementRight={this.getRightButton()}
                    />
                        {this.props.children}
                </div>
            </MuiThemeProvider>
        )
    }
}