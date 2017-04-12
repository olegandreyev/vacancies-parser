/**
 * Created by Olejka on 11.04.2017.
 */

import React from 'react'
import {connect} from 'react-redux'

@connect(({vacancies}) => {
    return {
        vacancies
    }
})
export default class Vacancies extends React.Component {
    render(){
        const vacancies = this.props.vacancies;
        console.log(vacancies,'vacancies')
        return (
            <div>
                Vacancies
            </div>
        )
    }
}