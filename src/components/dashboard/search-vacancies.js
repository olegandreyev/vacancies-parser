/**
 * Created by Olejka on 10.04.2017.
 */

import React from 'react';
import { RaisedButton, Card, CardText } from 'material-ui'
import VacancyAutoComplete from './vacancy-autocomplete'

export default class SearchVacancies extends React.Component {
    render(){
        return (
            <div className="vacancy-from-wrapper">
                <Card>
                    <CardText expandable={false}>
                        <VacancyAutoComplete/>
                        <RaisedButton primary={true} label="Search" style={{marginLeft:10}} />
                    </CardText>
                </Card>
            </div>
        )

    }
}