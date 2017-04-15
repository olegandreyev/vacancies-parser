/**
 * Created by Olejka on 14.04.2017.
 */

import React from 'react';
import {Paper, Toggle, SelectField, MenuItem } from 'material-ui'
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
            <Paper className="white-block paper">
                    <Toggle
                        label="Показать только горячие вакансии"
                        onToggle={this.handleHotToggler}
                        toggled={isHot}
                    />
                    <br/>
                    <SelectField
                        floatingLabelText="Ресурс"
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
                        floatingLabelText="Регион"
                        value={selectedRegion}
                        disabled={!isFetchedRegions}
                        onChange={this.handleRegionSelect}
                        fullWidth={true}
                    >
                        <MenuItem value={null} primaryText="" />
                        {regions.map(res => <MenuItem key={res._id} primaryText={res._id} value={res._id} />)}
                    </SelectField>
            </Paper>
        )
    }
}