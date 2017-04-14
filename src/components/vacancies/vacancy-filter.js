/**
 * Created by Olejka on 14.04.2017.
 */

import React from 'react';
import {Card, CardText, Toggle, SelectField, MenuItem } from 'material-ui'
import {searchVacancies} from 'actions'
import { connect } from 'react-redux';

@connect(({vacancies:{search}}) => ({
    isHot:search.isHot,
    region: search.region,
    resource: search.resource
}), {
    searchVacancies
})
export default class VacancyFilter extends React.Component {
    handleHotToggler = (e, isChecked) => {
        this.props.searchVacancies({
            isHot:isChecked,
            page:1
        })
    };
    handleRegionSelect = (e, key, val) => {
        this.props.searchVacancies({
            region:val,
            page:1
        })
    };
    handleResourceSelect = (e, key, val) => {
        this.props.searchVacancies({
            resource:val,
            page:1
        })
    };
    render(){
        const {isHot, resource, region} = this.props;
        return (
            <Card className="white-block">
                <CardText>
                    <Toggle
                        label="Show only hot vacancies"
                        onToggle={this.handleHotToggler}
                        toggled={isHot}
                    />
                    <br/>
                    <SelectField
                        floatingLabelText="Resource"
                        value={resource}
                        onChange={this.handleResourceSelect}
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
                        value={region}
                        onChange={this.handleRegionSelect}
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