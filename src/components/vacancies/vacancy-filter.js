/**
 * Created by Olejka on 14.04.2017.
 */

import React from 'react';
import {Card, CardText, Toggle, SelectField, MenuItem } from 'material-ui'
import {searchVacancies, fetchResourceList, fetchRegionList} from 'actions'
import { connect } from 'react-redux';

@connect(({vacancyFilters, resources, regions}) => ({
    isHot:vacancyFilters.isHot,
    selectedRegion: vacancyFilters.region,
    selectedResource: vacancyFilters.resource,

    regions:regions.regions,
    isFetchedRegions: regions.isFetched,
    resources:resources.resources,
    isFetchedResources:resources.isFetched,

}), {
    searchVacancies,
    fetchResourceList,
    fetchRegionList
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
        const {isHot,
            selectedResource,
            selectedRegion,
            regions,
            resources,
            isFetchedRegions,
            isFetchedResources
        } = this.props;
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
                        value={selectedResource}
                        disabled={!isFetchedResources}
                        onChange={this.handleResourceSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={null} primaryText="" />
                        {resources.map(res => <MenuItem key={res._id} primaryText={res._id} value={res._id} />)}
                    </SelectField>
                    <br/>
                    <SelectField
                        floatingLabelText="Region"
                        value={selectedRegion}
                        disabled={!isFetchedRegions}
                        onChange={this.handleRegionSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={null} primaryText="" />
                        {regions.map(res => <MenuItem key={res._id} primaryText={res._id} value={res._id} />)}
                    </SelectField>
                </CardText>
            </Card>
        )
    }
}