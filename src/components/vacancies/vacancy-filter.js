/**
 * Created by Olejka on 14.04.2017.
 */

import React from 'react';
import {Card, CardText, Toggle, SelectField, MenuItem } from 'material-ui'

export default class VacancyFilter extends React.Component {
    render(){
        return (
            <Card className="white-block">
                <CardText>
                    <Toggle
                        label="Show only hot vacancies"
                    />
                    <br/>
                    <SelectField
                        floatingLabelText="Resource"
                        value={null}
                        fullWidth={true}
                    >
                        <MenuItem value={null} primaryText="" />
                        <MenuItem value={"dou-ua"} primaryText="dou.ua" />
                        <MenuItem value={"rabota-ua"} primaryText="rabota.ua" />
                        <MenuItem value={"work-ua"} primaryText="work.ua" />
                    </SelectField>
                    <br/>
                    <SelectField
                        floatingLabelText="Region"
                        value={null}
                        fullWidth={true}
                    >
                        <MenuItem value={null} primaryText="" />
                        <MenuItem value={"Киев"} primaryText="Киев" />
                        <MenuItem value={"Одесса"} primaryText="Одесса" />
                        <MenuItem value={"Харьков"} primaryText="Харьков" />
                    </SelectField>
                </CardText>
            </Card>
        )
    }
}