/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { SearchVacanciesForm } from 'components'

export default class Dashboard extends React.Component {
    fetchVacancies = values => {
        console.debug(values,'[SUBMIT SEARCH FORM]')
    }
    render(){
        return (
            <div className="dashboard">
                <div className="header">
                    <SearchVacanciesForm onSubmit={this.fetchVacancies}/>
                </div>
                <div className="content-wrapper">

                </div>
            </div>
        )
    }
}