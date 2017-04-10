/**
 * Created by Olejka on 10.04.2017.
 */

import React from 'react';
import {AutoComplete} from 'material-ui'
import {client} from 'helpers'

const debouncePromise = (cb, delay) => {
    let timeout = null;
    return function(){
        const args = arguments;
        return new Promise((res, rej) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                cb(...args).then(res).catch(rej)
            }, delay)
        })
    }
};

const searchTitles = debouncePromise((searchText) =>  client.get(`/api/vacancies/autocomplete?text=${searchText}`), 1000);

export default class VacancyAutoComplete extends React.Component {
    state = {
      jobTitles:[]
    };
    handleUpdateInput = searchText => {
        searchTitles(searchText).then(response => {
            this.setState({jobTitles:response.data})
        });
        this.props.onChange(searchText);
    };
    render(){
        const {value} = this.props;
        return (
                <AutoComplete
                    searchText={value}
                    hintText="Junior Java Developer"
                    filter={() => true}
                    maxSearchResults={10}
                    dataSource={this.state.jobTitles}
                    onUpdateInput={this.handleUpdateInput}
                    style={{width:"70%"}}
                    fullWidth={true}
                />
        )
    }
}