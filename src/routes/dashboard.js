/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { SearchVacancies } from 'components'

export default class Dashboard extends React.Component {
    render(){
        return (
            <div className="dashboard">
                <div className="header">
                    <SearchVacancies>/</SearchVacancies>
                </div>
            </div>
        )
    }
}