/**
 * Created by Olejka on 13.04.2017.
 */

import React from 'react';
import {Card, CardText, FontIcon} from 'material-ui'
import { Link } from 'react-router'


const VacancyItem = ({vacancy}) => (
    <Card className="v-item">
        <CardText>
            <div className="v-body">
                <div className="vacancy-title-block">
                    <span className="v-title"><Link to="/">{vacancy.title}</Link></span>
                    {vacancy.isHot
                        ? <img className="v-ishot"
                               src={require('../../assets/hot-icon.png')}
                               alt="Hot Vacancy"/>
                        : null }
                </div>
                <div className="company-name-block">
                    <a href={vacancy.companyLink} target="_blank">{vacancy.companyName}</a>
                </div>
                <div className="additional-info-block">
                    {vacancy.salary
                        ? <span className="v-salary">{vacancy.salary}</span>
                        :null}
                      <span className="v-location">
                          <FontIcon className="fa fa-map-marker" style={{fontSize:"18px", marginRight:5}} color="black"/>{vacancy.region}
                          </span>
                </div>
                <div className="vacancy-description-block">
                    {vacancy.shortDescr}
                </div>
            </div>
            <div className="resource-logo-link">
                <a href={vacancy.link} target="blank">
                    <div className={`v-logo-link ${vacancy.resource}`}></div>
                </a>
            </div>

        </CardText>
    </Card>
);

export default class VacancyList extends React.Component {
    render() {
        const {vacancies} = this.props;
        return (
            <div className="vacancy-list">
                {vacancies.map(vacancy => <VacancyItem vacancy={vacancy} key={vacancy._id}/>)}
            </div>
        )
    }
}