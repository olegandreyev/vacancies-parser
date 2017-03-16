/**
 * Created by Olejka on 16.03.2017.
 */

import React from 'react';
import { RegisterFormWizard } from 'components'

class Register extends React.Component {
    render(){
        return (
            <div className="register-form-wrapper">
                  <RegisterFormWizard/>
            </div>
        )
    }
}

export default Register