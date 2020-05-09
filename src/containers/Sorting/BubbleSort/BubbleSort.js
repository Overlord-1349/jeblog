import React, { Component } from "react";
import { MoreVertical, Play, StopCircle } from 'react-feather';

import GetRandomList from '../RandomList';
import ListGroup, { ListGroupItem } from '../../../components/BS/ListGroup/ListGroup';
import Alert from '../../../components/BS/Alert/Alert';
import { ConsoleLog } from '../../../components/Console/Console';


class BubbleSort extends Component{
    
    constructor(props){
        super(props);
        this.description = `
        Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted. The algorithm, which is a comparison sort, is named for the way smaller or larger elements "bubble" to the top of the list.

        This simple algorithm performs poorly in real world use and is used primarily as an educational tool. 

        Isn't clear yet? lets sort the below list together, click the play button to start
        `;
        this.state = {
            size: 12,
            elements: this._getRandomList(12),
            sortingInterval: undefined,
            indexLeft: null,
            indexRight: null,
            margin: null,
            iterations: 0,
            comparisons: 0,
            isSorting: false,
            currentMessage: {text: this.description, showNextButton:true},
            logs: []
        }
        
        this.sortingSpeed = 400;
        this.messages = [
            
            {
                showOn: {iteration: 0, comparison: 0},
                pauseExecution: true,
                showNextButton: true,
                text: `Compares first and second elements, if first its greater than second then it swaps the elements. 
                Click the below button to compare the next elements`
            },
            {
                showOn: {iteration: 0, comparison: 1},
                pauseExecution: true,
                showNextButton: true,
                text: "Let's now compare second and third elements and again they are swapped if second is greater than third, else will leave it as it is. What are you waiting for click on Next"
            },
            {
                showOn: {iteration: 0, comparison: 2},
                pauseExecution: true,
                showNextButton: true,
                text: "Is the third element greater than fourth? I think you got the idea, click Next to complete the first iteration"
            },
            {
                showOn: {iteration: 0, comparison: (this.state.elements.length-3)},
                pauseExecution: true,
                showNextButton: true,
                text: "The first iteration is completed! The last element is sorted therefore we will excluded from the next iteration. Click on next to sort the entire list."
            },
            {
                showOn: {iteration: 1, comparison: ( (this.state.elements.length-3 * 2))},
                pauseExecution: true,
                showNextButton: true,
                text: "Second Iteration completed successfully"
            },
            
        ];
        
    }

    _addLogMessage = (msg, type) => {
        const log = [...this.state.logs ];
        log.push(<ConsoleLog text={msg} />);
        this.setState({logs: log});
    }

    _getRandomList = (length) => {
        let lst = GetRandomList(length).map( (el, idx) => {
            return {item: el, contextual: "bg-light", isSorted: false, isSortable: true, key: `bubbleItem${idx}`}
        });

        lst.push({
            item: <MoreVertical width="10" />,
            contextual: "bg-secondary",
            isSorted: false,
            isSortable: false,
            key: 'bubbleItem9999'
        });
        
        return lst;
    }

    _clearInterval = () => {
        clearInterval(this.state.sortingInterval);
        this.setState({sortingInterval: undefined});
    }

    _showDetails = () => {
        const messages = this.messages.filter( msg => msg.showOn.iteration === this.state.iterations && msg.showOn.comparison === this.state.comparisons );
        if (messages.length > 0){
            const msg = messages[0];
            let isSorting = this.state.isSorting;
            if (msg.pauseExecution){
                this._clearInterval();
                isSorting = false;
            }
            this.setState({currentMessage: msg, isSorting: isSorting});
        }
    }

    bubbleSort = () => {
        //reset style if element is not yet sorted
        this.state.elements.forEach( element => { 
            if(element.isSortable && !element.isSorted){
                element.contextual = "bg-light";
            }
        });
        
        if(this.state.elements.length > 1){
            let indexLeft = this.state.indexLeft !== null ? this.state.indexLeft + 1 : 0;
            let indexRight = this.state.indexRight !== null ? this.state.indexRight + 1 : 1;
            let elements = [ ...this.state.elements ];
            let margin = this.state.margin !== null ? this.state.margin : (elements.length-1);
            let iterations = this.state.iterations;
            
            let elemLeft = elements[indexLeft];
            let elemRight = elements[indexRight];
            

            elemLeft.contextual = "bg-primary";
            elemRight.contextual = "bg-primary";

            this._addLogMessage(`is ${elemLeft.item} greater than ${elemRight.item} ? Result: ${elemLeft.item > elemRight.item}`);
            console.log(`is ${elemLeft.item} greater than ${elemRight.item} ? Result: ${elemLeft.item > elemRight.item}`);
            if(elemLeft.item > elemRight.item){
                elements[indexLeft] = {...elemRight};
                elements[indexRight] = {...elemLeft};
                this._addLogMessage(`Swapping ${elements[indexLeft].item} and ${elements[indexRight].item}`);
            }

            this._showDetails();
            if (indexRight +1 === margin){
                indexLeft = null;
                indexRight = null;
                margin--;
                let lastElem = elements[margin];
                let sep = elements[margin +1];
                lastElem.contextual = "bg-success";
                lastElem.isSorted = true;
                elements[margin] = sep;
                elements[margin +1] = lastElem;
                iterations++;
                this._addLogMessage(`Iteration ${iterations} is completed`);
            }
            if (margin <= 1){
                let lastElem = elements[0];
                let sep = elements[ 1];
                lastElem.contextual = "bg-success";
                lastElem.isSorted = true;
                elements[0] = sep;
                elements[1] = lastElem;
                clearInterval(this.state.sortingInterval);
            }


            this.setState( (prevProps, currentProps) => {
               return {indexLeft: indexLeft, indexRight: indexRight, margin: margin, elements: elements, comparisons: this.state.comparisons + 1, 
                    iterations: iterations
                }
            });
        }
        else {
            clearInterval(this.state.sortingInterval);
        }
        
    }
    

    // Event Handlers
    onClickSortButton = (event) => {
        const sortingInterval = setInterval(this.bubbleSort, this.sortingSpeed);
        this.setState({sortingInterval: sortingInterval, isSorting: true});
    }

    onClickResetButton = (event) => {
        const lst = this._getRandomList(this.state.size);
        this._addLogMessage(`onClickResetButton: Random list created ${lst}`);
        const newState = {
            elements:  this._getRandomList(this.state.size),
            sortingInterval: null,
            indexLeft: null,
            indexRight: null,
            margin: null,
            iterations: 0,
            comparisons: 0,
            isSorting: false,
            currentMessage: {text: this.description, showNextButton:true},
        }
        clearInterval(this.state.sortingInterval);
        this.setState( newState )
    }

    onClickPlayButton = (event) => {
        const sortingInterval = setInterval(this.bubbleSort, this.sortingSpeed);
        this.setState({sortingInterval: sortingInterval, isSorting: true});
    }
    // Event Handlers

    render(){
     

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <Alert contextual="primary">
                            <p className="h3">Bubble Sort</p>
                            <hr className="my-4" />
                            <p  style={{height: "110px", minHeight:"110px", maxHeight:"110px", overflowY:"auto"}}>{this.state.currentMessage.text}</p>
                            <div style={{width:"70%", margin:"auto"}}>
                            <ListGroup type="button" layout="horizontal">
                                <ListGroupItem 
                                    type="button" 
                                    contextual="success" 
                                    status={this.state.isSorting === false ? "" : "disabled"} 
                                    onClick={this.onClickSortButton}>
                                        <Play />
                                </ListGroupItem>
                                <ListGroupItem type="button" contextual="danger" onClick={this.onClickResetButton}><StopCircle /></ListGroupItem>
                            </ListGroup>
                            </div>
                        </Alert>
                    </div>
                </div>
                
                <br />
                <div className="row justify-content-md-center h4">
                    
                        { this.state.elements.map( (el, index) => { return (<div className={`col-sm-auto border ${el.contextual}`} key={el.key} >{el.item}</div>) }  ) }
                    
                </div>
                <br />
                
            </div>
        );
    }
}

export default BubbleSort;


/*

                <hr className="my-4" />
                <div className="row">
                    <div className="col">
                        <Console>
                            {this.state.logs.length > 0 ? this.state.logs : undefined }
                        </Console>
                    </div>
                </div>
*/