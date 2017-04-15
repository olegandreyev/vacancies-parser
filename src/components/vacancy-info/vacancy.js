/**
 * Created by Olejka on 15.04.2017.
 */

import React from 'react'
import moment from 'moment'

export default class Vacancy extends React.Component {
    render() {
        const {data} = this.props;
        return (
            <div className="v-info">
                <div className="v-info-block">
                    <span className="mute-color">
                        {moment(data.createdAt).format("DD MMM YYYY")}
                    </span>
                    <a target="_blank" href={data.companyLink}><img style={{float: "right"}}
                                                    src={data.companyLogo || require('../../assets/company-ph.png')}
                                                    alt="company logo!"/></a>
                </div>
                <div className="v-info-block">
                    <h1>
                        {data.title}
                        {data.isHot && <img className="v-ishot"
                                               src={require('../../assets/hot-icon.png')}
                                               alt="Hot Vacancy"/>}
                        </h1>
                </div>
                <div className="v-info-block v-main-info">
                    <div className="flex-table">
                        <div className="flex-column">
                            Компания:
                        </div>
                        <div className="flex-column">
                            <a target="_blank" href={data.companyLink}>{data.companyName}</a>
                        </div>
                    </div>
                    <div className="flex-table">
                        <div className="flex-column">
                            Регион:
                        </div>
                        <div className="flex-column">
                            {data.region.join(", ")}
                        </div>
                    </div>
                    {data.salary &&
                    <div className="flex-table">
                        <div className="flex-column">
                            Зарплата:
                        </div>
                        <div className="flex-column">
                            {data.salary}
                        </div>
                    </div>
                    }
                    {
                        data.additionalParams.length !== 0 &&
                        <div className="flex-table">
                            <div className="flex-column">
                                Параметры:
                            </div>
                            <div className="flex-column">
                                {data.additionalParams.join(", ")}
                            </div>
                        </div>
                    }
                    {
                        data.tags.length !== 0 &&
                        <div className="flex-table">
                            <div className="flex-column">
                                Теги:
                            </div>
                            <div className="flex-column">
                                {data.tags.join(", ")}
                            </div>
                        </div>
                    }
                        <div className="flex-table">
                            <div className="flex-column">
                                Ресурс:
                            </div>
                            <div className="flex-column">
                                <a className="super-link" target="_blank" href={data.link}>
                                    {data.link}
                                    </a>
                            </div>
                        </div>
                </div>
                <div className="v-info-block description">
                    <h2>Описание:</h2>
                    <div dangerouslySetInnerHTML={{__html:data.fullDescr}}></div>
                </div>
                <div className="original-link-block">
                    <a className="super-link" href={data.link} target="_blank">Смотреть на оригинальном ресурсе</a>

                </div>
            </div>
        )
    }
}