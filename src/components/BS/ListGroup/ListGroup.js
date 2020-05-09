import React, { Component } from 'react';
import PropTypes from 'prop-types';


class ListGroupItem extends Component{
    
    constructor(props){
        super(props);
        this.contextual = {
            'primary': "list-group-item-primary",
            'secondary': "list-group-item-secondary",
            'success': "list-group-item-success",
            'danger': "list-group-item-danger",
            'warning': "list-group-item-warning",
            'info': "list-group-item-info",
            'light': "list-group-item-light",
            'dark': "list-group-item-dark"}

        
        this.type = props.type ? props.type : "li";
        this.href = props.href ? props.href : "#";
        this.onClick = props.onClick ? props.onClick : () => {};
        this.classes = {
            "item": "list-group-item",
            "itemAction": "list-group-item-action"
        };
    }

    _getClasses = (lst) => {
        let _class = "";
        if (lst){
            for (const el of lst){
                _class += this.classes[el] + " ";
            }
        }
        
        switch(this.props.status){
            case 'active':
                _class += ' active ';
                break;
            case 'disabled':
                _class += ' disabled ';
                break;
            default:
                break;
        }
        _class += this.props.contextual === undefined ? "" : this.contextual[this.props.contextual] + " ";
        _class += this.classes['item'];

        return _class;
    }

    _getElementByType = () => {
        const children = this.props.children === undefined ? "" : this.props.children;
        switch (this.type){
            case 'button':
        return <button type="button" onClick={this.onClick} className={this._getClasses(["itemAction"])}>{children}</button>
            case 'a':
                return <a href={this.href} onClick={this.onClick} className={this._getClasses(["itemAction"])}>{children}</a>
            default:
                return <li onClick={this.onClick} className={this._getClasses()}>{children}</li>
        }
    }

    render(){
        return(
            <React.Fragment>
                {this._getElementByType()}
            </React.Fragment>
        );
    }
}

ListGroupItem.propTypes = {
    type: PropTypes.oneOf(['li', 'button', 'a']),
    status: PropTypes.oneOf(['', 'disabled', 'active']),
    href: PropTypes.string,
    onClick: PropTypes.func,
    contextual: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'info', 'light', 'dark'])
}

class ListGroup extends Component {

    constructor(props){
        super(props);
        this.type = props.type || "list";
        this.layout = props.layout || "";
    }

    _getClasses(){
        let _class = "";
        switch(this.layout){
            case "flush":
                _class += "list-group-flush ";
                break;
            case "horizontal":
                _class += "list-group-horizontal ";
                break;
            default:
                break;
        }
        _class += "list-group";
        return _class;
    }

    _getElementByType(){
        switch(this.type){
            case "list":
                return <ul className={this._getClasses()}>{this.props.children}</ul>
            default:
                return <div className={this._getClasses()}>{this.props.children}</div>
        }
    }

    render() {
        return( this._getElementByType() );
    }
}


ListGroup.propTypes = {
    layout: PropTypes.oneOf(["flush", "horizontal", ""]),
    type: PropTypes.oneOf(["list", "button", "a"])
}


export default ListGroup;
export { ListGroupItem };