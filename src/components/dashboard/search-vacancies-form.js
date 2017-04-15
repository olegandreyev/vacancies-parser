/**
 * Created by Olejka on 10.04.2017.
 */

import React from 'react';
import {RaisedButton, Paper} from 'material-ui'
import VacancyAutoComplete from './vacancy-autocomplete'
import {reduxForm, Field} from 'redux-form';

const renderAutoComplete = ({input}) => (
    <VacancyAutoComplete {...input} />
);

@reduxForm({
    form: "searchVacancies"
})
export default class SearchVacanciesForm extends React.Component {
    render() {
        const {handleSubmit} = this.props;
        return (
            <div className="vacancy-from-wrapper">
                <Paper className="paper">
                    <form onSubmit={handleSubmit}>
                        <Field name="keywords" component={renderAutoComplete}/>
                        <RaisedButton onClick={handleSubmit}
                                      type="submit"
                                      primary={true}
                                      label="Поиск"
                                      style={{marginLeft: 10}}/>
                    </form>
                </Paper>
            </div>
        )

    }
}