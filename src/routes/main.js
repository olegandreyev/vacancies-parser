/**
 * Created by Olejka on 09.03.2017.
 */

import React from 'react';
import { SearchVacanciesForm, VacancyList } from 'components'
import { connect } from 'react-redux';
import { searchVacancies, fetchRegionList, fetchResourceList } from 'actions'

@connect(({regions, resources}) => {
    return {
        isFetchedResources:resources.isFetched,
        isFetchedRegions: regions.isFetched
    }
},{
    searchVacancies,
    fetchRegionList,
    fetchResourceList
})
export default class Main extends React.Component {
    searchVacancies = values => {
       return this.props.searchVacancies({
           keywords:values.keywords,
           page:1
       });
    };
    componentDidMount(){
        //fetch if needed
        const {isFetchedRegions, isFetchedResources } = this.props;
        if(!isFetchedRegions) {
            this.props.fetchRegionList();
        }
        if(!isFetchedResources) {
            this.props.fetchResourceList();
        }
    }
    render(){
        const { keywords } = this.props.location.query;
        const initialValues = {
            keywords:keywords || ''
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