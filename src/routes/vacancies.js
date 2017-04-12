/**
 * Created by Olejka on 11.04.2017.
 */

import React from 'react'
import {connect} from 'react-redux'
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';
import { searchVacancies } from 'actions'

@connect(({vacancies}) => {
    return {
        vacancies
    }
}, {
    searchVacancies
})
export default class Vacancies extends React.Component {
    render(){
        const vacancies = this.props.vacancies;
        console.log(vacancies,'vacancies')
        return (
            <div>
                Vacancies
                <Pagination locale={{}} current={2} total={25} />
            </div>
        )
    }
}