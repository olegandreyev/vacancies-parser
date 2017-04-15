/**
 * Created by Olejka on 16.03.2017.
 */

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Обязательное поле'
    }
    if (!values.lastName) {
        errors.lastName = 'Обзательное поле'
    }
    if (!values.email) {
        errors.email = 'Обязательное поле'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Некоректный Email адрес'
    }
    if(!values.password){
        errors.password = "Обязательное поле"
    } else if(values.password !== values.repeatPassword) {
        errors.repeatPassword = "Пароли должны совпадать"
    }

    return errors
};

export default validate