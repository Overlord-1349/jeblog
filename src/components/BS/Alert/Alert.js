import React from 'react';
import PropTypes from 'prop-types';


const contextualClasses = {
    'primary': "alert-primary",
    'secondary': "alert-secondary",
    'success': "alert-success",
    'danger': "alert-danger",
    'warning': "alert-warning",
    'info': "alert-info",
    'light': "alert-light",
    'dark': "alert-dark"
};

const alert = (props) => {
    const children = props.children || undefined;
    return <div className={`alert ${contextualClasses[props.contextual]}`} role="alert">
        { children }
    </div>
}

alert.propTypes = {
    contextual: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'light', 'dark']).isRequired
}

export default alert;