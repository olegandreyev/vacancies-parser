/**
 * Created by Olejka on 16.03.2017.
 */

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if(!values.password){
        errors.password = "Required"
    } else if(values.password !== values.repeatPassword) {
        errors.repeatPassword = "Passwords mu be equals!"
    }

    return errors
};

export default validate