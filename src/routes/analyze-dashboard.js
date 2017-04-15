import React from 'react'
import {Pie, HorizontalBar, Line} from 'react-chartjs-2';
import {Card, CardText} from 'material-ui'
import {connect} from 'react-redux';
import { fetchDayOfMonthStatistic } from 'actions'
import moment from 'moment'

@connect(({resources, regions, vacancies}) => {
    return {
        resourcesData: resources.resources,
        regionsData: regions.regions,
        vacanciesPerDayOfMonth:vacancies.vacanciesPerDayOfMonth
    }
}, {
    fetchDayOfMonthStatistic
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
    getDayOfMonthStatistic = () => {
        const { vacanciesPerDayOfMonth } = this.props;
        return {
            labels: vacanciesPerDayOfMonth.sort((v1, v2) => v1.day - v2.day).map(v => {
                return moment({
                    month:v.month - 1,
                    day:v.day
                }).format("DD MMM")
            }),
            datasets: [
                {
                    label: 'Добавленные вакансии по дням',
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: vacanciesPerDayOfMonth.sort((v1, v2) => v1.day - v2.day).map(v => v.count),
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
        this.props.fetchDayOfMonthStatistic();
    }
    render() {
        return (
            <div className="analyze-data-wrapper">
                <div className="analyze-first-section">
                    <div style={{width: "49%"}}>
                        <Card>
                            <CardText>
                                <Line data={this.getDayOfMonthStatistic()}/>
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
                            <HorizontalBar height={300} data={this.getRegionsChartData()}/>
                        </CardText>
                    </Card>
                </div>
            </div>
        )
    }
}