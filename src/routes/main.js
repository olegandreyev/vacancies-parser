/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { SearchVacanciesForm, VacancyList } from 'components'
import { connect } from 'react-redux';
import { searchVacancies } from 'actions'

@connect(null,{
    searchVacancies
})
export default class Main extends React.Component {
    searchVacancies = values => {
       return this.props.searchVacancies(values.keywords, 0);
    };
    componentWillReceiveProps(){
        console.log(this.props,'REFRESH')
    }
    render(){
        const { keywords, page } = this.props.location.query;
        const initialValues = {
            keywords:keywords || '',
            page:page || 0
        };
        return (
            <div className="dashboard">
                <div className="header">
                    <SearchVacanciesForm initialValues={initialValues}
                                         onSubmit={this.searchVacancies}/>
                </div>
                <div className="content-wrapper">
                    {this.props.children}
                </div>
            </div>
        )
    }
}