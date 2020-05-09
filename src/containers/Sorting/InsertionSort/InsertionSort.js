import React, { Component } from 'react';
import SortLayout from '../../../components/Sort/SortLayout';
import GetRandomList from '../RandomList';
class InsertionSort extends Component{
    constructor(props){
        super(props);
        this.state = {
            size:props.size,
            elements: GetRandomList(props.size),
            sortedList: [],
            sortingInterval: undefined

        }
        this.sortingSpeed = 400;
        this.description = `
        Insertion sort is a simple sorting algorithm that builds the final sorted array (or list) one item at a time. It is much less efficient on large lists than more advanced algorithms such as quicksort, heapsort, or merge sort. However, insertion sort provides several advantages:

        Simple implementation: Jon Bentley shows a three-line C version, and a five-line optimized version
        Efficient for (quite) small data sets, much like other quadratic sorting algorithms
        More efficient in practice than most other simple quadratic (i.e., O(n2)) algorithms such as selection sort or bubble sort
        Adaptive, i.e., efficient for data sets that are already substantially sorted: the time complexity is O(kn) when each element in the input is no more than k places away from its sorted position
        Stable; i.e., does not change the relative order of elements with equal keys
        In-place; i.e., only requires a constant amount O(1) of additional memory space
        Online; i.e., can sort a list as it receives it
        When people manually sort cards in a bridge hand, most use a method that is similar to insertion sort.
        `;
    }
    changeSizeInputHandler = event => {
        let newSize = event.target.value;
        this.setState({
            size: newSize,
            elements: GetRandomList(newSize),
            sortedList: [],
            
        });
    }
    sortButtonHandler = (event) => {
        const interval = setInterval(this.insertionSort, this.sortingSpeed);
        this.setState({ sortingInterval: interval });
    }
    resetButtonHandler = event => {
        clearInterval(this.state.sortingInterval);
        this.setState({
            elements: GetRandomList(this.state.size),
            sortedList: [],
            sortingInterval: undefined
        });

    }
    render(){
        return (
            <SortLayout 
                description={this.description}
                name="Insertion Sort"
                numbers={[this.state.elements, this.state.sortedList]}
                onChangeSize={this.changeSizeInputHandler}
                onSort={this.sortButtonHandler}
                onReset={this.resetButtonHandler}

            />
                
        );
    }

    insertionSort = () => {
        if (this.state.elements.length > 0){
            const elements = [...this.state.elements];
            const sortedList = [...this.state.sortedList];
            elements[0].status ="active";
            this.setState({elements: elements});
            const element = elements.shift();
            element.status="active";
            if (sortedList.length === 0){
                element.status="sorted";
                sortedList.push(element);
            }
            else{
                for (let i= (sortedList.length -1); i >= 0; i--){
                    
                }
            }

            this.setState({
                elements: elements,
                sortedList: sortedList
            });
            console.log(sortedList);
        }
        else{
            clearInterval(this.sortingInterval);
        }

    }
}
export default InsertionSort;