/**
 * Created by Olejka on 15.04.2017.
 */

import React from 'react'
import { connect } from 'react-redux'
import { fetchVacancyInfoIfNeeded } from 'actions';
import { LinearProgress, Card, CardText } from 'material-ui'
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
    }
    render(){
        const {vacancy, isLoad} = this.props;
        return (
            <Card style={{minHeight:400}}>
                <CardText>
                    {isLoad && <LinearProgress mode='indeterminate'/>}
                    {vacancy && <Vacancy data={vacancy}/>}
                </CardText>
            </Card>
        )
    }
}