/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { connect } from 'react-redux'

@connect(
    ({auth}) => ({user:auth.user})
)
export default class App extends React.Component {
    render(){
        const { user } = this.props;
        console.log(user);
        return (
            <div className="app">
                <h1>Hello World</h1>
                {this.props.children}
            </div>
        )
    }
}