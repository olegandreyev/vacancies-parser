/**
 * Created by Olejka on 15.04.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { fetchVacancyInfoIfNeeded } from 'actions';
import { LinearProgress, Paper } from 'material-ui'
import { Vacancy } from 'components'
import moment from 'moment'

@connect(({vacancyInfo}, ownProps) => ({
    vacancy: vacancyInfo.vacancyInfo,
    isLoad: vacancyInfo.isFetching,
    vacancyId: ownProps.params.id
}), {
    fetchVacancyInfoIfNeeded
})
export default class VacancyInfo extends React.Component {
    componentDidMount(){
        const { vacancyId } = this.props;
        this.props.fetchVacancyInfoIfNeeded(vacancyId);
        document.body.scrollTop = 0;
    }
    render(){
        const {vacancy, isLoad} = this.props;
        return (
            <Paper className="paper" style={{minHeight:400}}>
                {isLoad && <LinearProgress mode='indeterminate'/>}
                {vacancy && <Vacancy data={vacancy}/>}
            </Paper>
        )
    }
}