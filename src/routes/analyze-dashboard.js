import React from 'react'
import {Pie, HorizontalBar, Bar} from 'react-chartjs-2';
import {Card, CardText} from 'material-ui'
import {connect} from 'react-redux';
import { fetchDayOfWeekStatistic } from 'actions'

@connect(({resources, regions, vacancies}) => {
    return {
        resourcesData: resources.resources,
        regionsData: regions.regions,
        vacanciesPerDayOfWeek:vacancies.vacanciesPerDayOfWeek
    }
}, {
    fetchDayOfWeekStatistic
})
export default class AnalyzeDashboard extends React.Component {
    getResourceChartData = () => {
        const {resourcesData} = this.props;
        return {
            labels: resourcesData.map(res => res._id),
            datasets: [{
                data: resourcesData.map(res => res.count),
                backgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ],
                hoverBackgroundColor: [
                    '#36A2EB',
                    '#FF6384',
                    '#FFCE56'
                ]
            }]
        };
    };
    getDayOfWeekStatistic = () => {
        const { vacanciesPerDayOfWeek } = this.props;
        const dayWeekMap = {
            "1":"Пн",
            "2":"Вт",
            "3":"Ср",
            "4":"Чт",
            "5":"Пт",
            "6":"Сб",
            "7":"Вс"
        };
        return {
            labels: vacanciesPerDayOfWeek.sort((v1, v2) => v1._id - v2._id).map(v => dayWeekMap[v._id]),
            datasets: [
                {
                    label: 'My First dataset',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: vacanciesPerDayOfWeek.sort((v1, v2) => v1._id - v2._id).map(v => v.count),
                }
            ]
        }
    };
    getRegionsChartData = () => {
        const { regionsData } = this.props;
        const data = regionsData.slice().sort((d1, d2) => d2.count - d1.count);
        return {
            labels: data.map(reg => reg._id),
            datasets: [
                {
                    label: 'Вакансии по регионам',
                    backgroundColor: 'rgba(255,99,132,0.2)',
                    borderColor: 'rgba(255,99,132,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor: 'rgba(255,99,132,1)',
                    data: data.map(reg => reg.count)
                }
            ]
        }
    };
    componentDidMount(){
        this.props.fetchDayOfWeekStatistic();
    }
    render() {
        return (
            <div className="analyze-data-wrapper">
                <div className="analyze-first-section">
                    <div style={{width: "49%"}}>
                        <Card>
                            <CardText>
                                <Bar data={this.getDayOfWeekStatistic()}/>
                            </CardText>
                        </Card>
                    </div>
                    <div style={{width: "49%"}}>
                        <Card>
                            <CardText>
                                <Pie data={this.getResourceChartData()}/>
                            </CardText>
                        </Card>
                    </div>
                </div>
                <div className="analyze-second-section">
                    <Card>
                        <CardText>
                            <HorizontalBar data={this.getRegionsChartData()}/>
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}