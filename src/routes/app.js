/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { AppBar, FlatButton, MenuItem } from 'material-ui'

import { connect } from 'react-redux'
import { replace } from 'react-router-redux'
import { logout } from 'actions';

const muiTheme = getMuiTheme({
    paper: {
        padding: 16,
    }
});

@connect(({auth}) => {
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

            rightAppEl = <FlatButton label="Регистрация" onTouchTap={() => redirect('/register')} />;

        }  else if(isAuthenticated){

            rightAppEl =  <IconMenu iconButtonElement={
                    <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Настройки" />
                <MenuItem primaryText="Выход" onTouchTap={this.props.logout} />
            </IconMenu>

        } else {
            rightAppEl = <FlatButton label="Вход" onTouchTap={() => redirect('/login')} />;
        }
        return rightAppEl;
    };
    render(){
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
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