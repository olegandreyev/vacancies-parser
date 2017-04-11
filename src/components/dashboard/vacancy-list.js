/**
 * Created by Olejka on 11.04.2017.
 */

import React from 'react'
import {connect} from 'react-redux'
import {Card, CardText} from 'material-ui'

export default class VacancyList extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    <CardText>
                        vacancy list
                    </CardText>
                </Card>
            </div>
        )
    }
}