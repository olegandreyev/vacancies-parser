/**
 * Created by Olejka on 11.04.2017.
 */

import React from 'react'
import {connect} from 'react-redux'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { searchVacancies } from 'actions'
import { VacancyList, VacancyFilter } from 'components'


@connect(({vacancies}, ownProps) => {
    return {
        vacancies:vacancies.vacancies,
        count:vacancies.count,
        isLoading:vacancies.isFetching,
        query:ownProps.location.query,
        }
}, {
    searchVacancies
})
export default class Vacancies extends React.Component {
    componentDidMount() {
        let {keywords, page, isHot, region, resource} = this.props.query;
        //synchronize query params and store
        this.props.searchVacancies({
            keywords:keywords || '',
            page: Number.isInteger(+page) ? +page : 1,
            isHot: isHot === 'true',
            region:region || null,
            resource: resource || null
        });
    }
    handleChangePage = curPage => {
        let {keywords} = this.props.query;
        this.props.searchVacancies({
            keywords,
            page:curPage
        });
    };
    render() {
        let {vacancies, count, query:{page}, isLoading} = this.props;
        return (
            <div>
                <div className="vacancy-list-wrapper">
                    <VacancyList loading={isLoading} vacancies={vacancies}/>
                    <VacancyFilter />
                </div>
                <Pagination locale={{}}
                            onChange={this.handleChangePage}
                            current={+page}
                            pageSize={15}
                            total={count}/>
            </div>
        )
    }
}