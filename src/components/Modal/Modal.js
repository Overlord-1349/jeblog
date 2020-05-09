import React from 'react';
import PropTypes from 'prop-types';
const modal = (props) => {
    const buttonLauncher = props.launcherText ? 
        <button type="button" className="btn btn-dark" data-toggle="modal" data-target={`#${props.id}`}>
        { props.launcherText }
        </button> : undefined;
    return <React.Fragment>
        { buttonLauncher }

        <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div className="modal-dialog modal-lg modal-dialog-scrollable" role="document">
            <div className="modal-content">
            <div className="modal-header bg-dark text-light">
                <h5 className="modal-title">{props.title}</h5>
                <button type="button" className="close text-light" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                { props.children }
            </div>
            <div className="modal-footer bg-dark">
                <button type="button" className="btn btn-light" data-dismiss="modal">Close</button>
                
            </div>
            </div>
        </div>
        </div>
    </React.Fragment> 

}

modal.propTypes = {
    id: PropTypes.string.isRequired,
    launcherText: PropTypes.string,
    title: PropTypes.string
}
export default modal;