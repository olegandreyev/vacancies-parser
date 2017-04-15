/**
 * Created by Olejka on 13.04.2017.
 */

import React from 'react';
import {Paper, FontIcon} from 'material-ui'
import {Link} from 'react-router'
import LinearProgress from 'material-ui/LinearProgress';

const VacancyItem = ({vacancy}) => (
    <Paper className="v-item paper">
            <div className="v-body">
                <div className="vacancy-title-block">
                    <span className="v-title">
                        <Link to={`/dashboard/v/${vacancy._id}`}>
                        {vacancy.title}
                            {vacancy.isHot && <img className="v-ishot"
                                                   src={require('../../assets/hot-icon.png')}
                                                   alt="Hot Vacancy"/>}
                        </Link>
                    </span>

                </div>
                <div className="company-name-block">
                    <a href={vacancy.companyLink} target="_blank">{vacancy.companyName}</a>
                </div>
                <div className="additional-info-block">
                    {vacancy.salary && <span className="v-salary">{vacancy.salary}</span>}
                    <span className="v-location">
                          <FontIcon className="fa fa-map-marker" style={{fontSize: "18px", marginRight: 5}}
                                    color="black"/>{vacancy.region.join(", ")}
                          </span>
                </div>
                <div className="vacancy-description-block">
                    {vacancy.shortDescr}
                </div>
            </div>
            <div className="tags">
                {vacancy.tags.map((t,i) =>
                    <div key={`${t}_${i}`}>{t}</div>
                )}
            </div>
            <div className="resource-logo-link">
                <a href={vacancy.link} target="blank">
                    <div className={`v-logo-link ${vacancy.resource}`}></div>
                </a>
            </div>
    </Paper>
);

export default class VacancyList extends React.Component {
    render() {
        const {vacancies, loading} = this.props;
        return (
            <div className="vacancy-list">
                {loading && <LinearProgress mode="indeterminate"/>}
                {vacancies.map(vacancy => <VacancyItem vacancy={vacancy} key={vacancy._id}/>)}
                {loading && <LinearProgress mode="indeterminate"/>}
            </div>
        )
    }
}