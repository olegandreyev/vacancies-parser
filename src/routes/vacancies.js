/**
 * Created by Olejka on 11.04.2017.
 */

import React from 'react'
import {connect} from 'react-redux'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { searchVacancies } from 'actions'
import { VacancyList } from 'components'

@connect(({vacancies}, ownProps) => {
    return {
        vacancies:vacancies.vacancies,
        isLoading:vacancies.isFetching,
        query:ownProps.location.query
    }
}, {
    searchVacancies
})
export default class Vacancies extends React.Component {
    componentDidMount() {
        let {keywords, page} = this.props.query;
        this.props.searchVacancies(keywords, +page);
    }
    render() {
        const vacancies = this.props.vacancies;
        console.log(vacancies, 'vacancies')
        return (
            <div>
                <div className="vacancy-list-wrapper">
                    <VacancyList vacancies={vacancies}/>
                    <div className="white-block"></div>
                </div>
                <Pagination locale={{}} current={2} total={25}/>
            </div>
        )
    }
}