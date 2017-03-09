/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';

export default class App extends React.Component {
    render(){
        return (
            <div className="app">
                <h1>Hello World</h1>
                {this.props.children}
            </div>
        )
    }
}