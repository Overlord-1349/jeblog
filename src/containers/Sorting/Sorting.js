import React, { Component } from 'react';
import ListGroup, {ListGroupItem} from '../../components/BS/ListGroup/ListGroup';
import { Switch, Route } from "react-router-dom";

import BubbleSort from './BubbleSort/BubbleSort';
import Modal from '../../components/Modal/Modal';
import SourceCode from '../../resources/SortingAlgorithms/SourceCode.json';

import jquery from 'jquery';

class Sorting extends Component{
    
    constructor(props){
        super(props);
        this.match = props.match;
        this.sortAlgorithms = [
            {"displayName": "Bubble", "href":`${this.match.url}/bubble`,"key": "bubble"},
            {"displayName": "Insertion", "href": `${this.match.url}/insertion` , "key": "insertion"},
        ];
        this.progLanguages = [
            {"displayName": "Python", "onClick": (e) => { jquery('#sourceCode').modal('show') } , "key": "python"},
            {"displayName": "Node", "onClick": (e) => { console.log(e.target); } , "key": "node"},
        ];
        let activeAlgorithm = 'bubble';
        if (props.location){
            const pathNames = props.location.pathname.split("/");
        
            activeAlgorithm = pathNames.length > 2 ? pathNames[2] : 'bubble';
        }
        this.state = {
            activeAlgorithm: activeAlgorithm,
            code: {code:undefined, author:undefined},
            codeHeader: undefined,
        }
    }
    
    onClickShowCode = (lang) => {
        const languages = SourceCode[this.state.activeAlgorithm]
        this.setState({code: languages[lang][0], codeHeader: lang}); 
        jquery('#sourceCode').modal('show');
    }
    _getAlgItems(){
        let listGroupItems = [];
        for (const sortAlg of this.sortAlgorithms){
            listGroupItems.push(
                <ListGroupItem 
                    status={sortAlg["key"] === this.state.activeAlgorithm ? "active" : ""}
                    key={sortAlg["key"]} 
                    type="a" 
                    href={sortAlg['href']}
                    >
                        {sortAlg['displayName']}
                    </ListGroupItem> );
        }
        return listGroupItems;
    }
    
    _getProgItems(){
        let listGroupItems = [];
        const languages = SourceCode[this.state.activeAlgorithm];
        if(languages === undefined){
            return listGroupItems;
        }
        for (const progLang in languages){
            listGroupItems.push(<ListGroupItem 
                key={progLang} 
                type="button" 
                onClick={() => { this.onClickShowCode(progLang) } }>
                    {progLang}
                </ListGroupItem> )
        }/*
        for (const progLang of this.progLanguages){
            listGroupItems.push(<ListGroupItem key={progLang["key"]} type="button" onClick={progLang['onClick']}>{progLang['displayName']}</ListGroupItem> )
        }*/
        return listGroupItems;
    }
//{SourceCode[this.state.activeAlgorithm]['python'][0].code}
    render(){
        return(
        <div className="containerFluid">
            <Modal 
                id="sourceCode"
                title={this.state.codeHeader}>
                <pre>
                <code>
                    {this.state.code.code}
                </code>
                </pre>
                <p>
                    Author: {this.state.code.author}
                </p>
            </Modal>
            <div className="row">
                <div className="col">
                    <h1 className="display-6">Sorting Algorithms</h1>
                    <hr className="my-4" />
                </div>
            </div>
            <div className="row">
                <div className="col-sm col-md-2">
                    
                    <ListGroup type="a" layout="flush">
                        {this._getAlgItems()}
                    </ListGroup>
                </div>
                <div className="col-sm col-md-8">
                    <Switch>
                        <Route path={`${this.match.url}/`} exact={true} component={BubbleSort} />
                        <Route path={`${this.match.url}/bubble`} component={BubbleSort} />
                        <Route path={`${this.match.url}/insertion`}>
                            <div>insertion</div>
                        </Route>
                    </Switch>

                </div>
                <div className="col-sm col-md-2">
                    <h3>Examples</h3>
                    <ListGroup type="button" layout="flush">
                        {this._getProgItems()}
                    </ListGroup>
                </div>
            </div>
        </div>
        );
    }
}


export default Sorting;