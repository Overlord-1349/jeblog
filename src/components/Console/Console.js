import React from 'react';
import PropTypes from 'prop-types';
import { ChevronRight, MinusCircle } from 'react-feather';

const contextual = {
    'primary': "text-primary",
    'secondary': "text-secondary",
    'success': "text-success",
    'danger': "text-danger",
    'warning': "text-warning",
    'info': "text-info",
    'light': "text-light",
    'dark': "text-dark"
}
const consoleLog = (props) => {
    return <span className={props.contextual ? contextual[props.contextual] : contextual['primary'] }><ChevronRight /> {props.text} <br /></span>
}

consoleLog.propTypes = {
    text: PropTypes.string.isRequired,
    contextual: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'light', 'dark'])
}

const console = (props) => {
    return <div className="container-fluid">
        <div className="row border border-success">
            <div className="col-1">
                <MinusCircle  type="button" data-toggle="collapse" data-target="#consoleLogDetail" aria-expanded="true" />
                
            </div>
            <div className="col"><label>Console</label></div>
        </div>
        <div className="row bg-dark collapse show " style={{overflowY: "scroll", maxHeight: "300px", height: "300px", minHeight: "300px"}} id="consoleLogDetail">
            <div className="col-12">
                {props.children}
            </div>
        </div>
    </div>
}

export default console;
export { consoleLog as ConsoleLog };