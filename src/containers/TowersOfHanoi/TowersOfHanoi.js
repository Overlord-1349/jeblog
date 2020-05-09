import React, {Component} from 'react';
import Tower, {Disk} from '../../components/TowersOfHanoi/TowersOfHanoi';
import {ChevronRight, ChevronsRight, ChevronLeft, ChevronsLeft } 
    from 'react-feather';
import Modal from '../../components/Modal/Modal';
import $ from 'jquery';
class TowersOfHanoi extends Component{
    constructor(props){
        super(props);
        this.colors = [
            'maroon', 'green', 'aqua', 'navy', 'black', 
            'gray', 'red', 'blue', 'teal', 'olive'
        ];
        this.numberOfDisksOptions = [3, 4, 5, 6, 7, 8, 9, 10];
        this.state = {
            numberOfDisks: 3,
            disks: [this._getDisks(3), [], []],
            errorMessage: undefined,
            movementsCount: 0,
            seconds: 0,
            secondCounter: undefined,
            gameStarted: false,
            stats: []
        }
    }
    _getDisks = (qty) => {
        let size = 230;
        let yPos = 210;
        let disks = [];
        for(let i=0; i < qty; i++){
            disks.push(
                {size: size-=20, y: yPos-=20, color:this.colors[i], id: i}
            );
        }
        return disks;
    }
    clickPlayButtonHandler = () => {
        const gameStarted = !this.state.gameStarted;
        let secondCounter = undefined;
        if(gameStarted === true){
            secondCounter = setInterval(()=> {
                this.setState({seconds: this.state.seconds+1})
            }, 1000);
        }
        else if(this.state.secondCounter !== undefined){
            clearInterval(this.state.secondCounter);
            
        }
        this.clickNumberOfDisksButtonHandler(this.state.numberOfDisks);
        this.setState({
            movementsCount: 0,
            seconds: 0,
            secondCounter: secondCounter,
            gameStarted:gameStarted
        });
    }
    clickNumberOfDisksButtonHandler = (number) => {
        this.setState({
            numberOfDisks: number,
            disks: [this._getDisks(number), [], []],
        });
    }
    clickMoveDiskButtonHandler = (event, from, to) => {
        let disks = [...this.state.disks];
        let errorMessage = undefined;
        let movements = this.state.movementsCount;
        this.setState({errorMessage: errorMessage});
        console.log(disks);
        if (disks[from].length > 0){
            let disk = disks[from][(disks[from].length -1 )];
            if(disks[to].length === 0){
                disk.y = 190; 
            }
            else {
                // validate if the top disk is bigger than the new disk
                const topDisk = disks[to][(disks[to].length -1 )];
                if(topDisk.size <= disk.size){
                    errorMessage = "Invalid move! top disk on the target pile is smaller than the new disk";
                    this.setState({errorMessage: errorMessage});
                    return false; // if top disk is smaller, dont insert in the pile
                }
                disk.y = topDisk.y - 20;
                
            }
            disks[to].push(disk);
            disks[from].pop();
            movements += 1;
            this.setState({disks: disks, errorMessage: errorMessage, movementsCount: movements});
            //check if game is completed
            if (disks[1].length === this.state.numberOfDisks || disks[2].length === this.state.numberOfDisks){
                const stats = {
                    "numberOfDisks": this.state.numberOfDisks,
                    "movements": movements,
                    "timeInSeconds": this.state.seconds,
                    "timestamp": Date(Date.now()).toLocaleString()
                };
                let statsArray = [...this.state.stats];
                statsArray.unshift(stats);
                //this.clickPlayButtonHandler();//reset the game
                clearInterval(this.state.secondCounter);
                this.setState({stats: statsArray, gameStarted:false, secondCounter: undefined});
                $('#mdlStats').modal('show');
                
            }
        }

    }
    render(){
        let error = undefined;
        if(this.state.errorMessage !== undefined){
            error = <div className="fixed-bottom">
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                {this.state.errorMessage}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
            </div>
        }//<span class="badge badge-primary badge-pill">14</span>
        /*
        
                        <button type="button" className="btn btn-dark" 
                            onClick={() => {$('#mdlInstructions').modal('show');} } >How to play</button>
        */ 
        return <React.Fragment>
            <div className="container-fluid">
                <div className="row">
                    <div className="col">
                        <h1 className="display-6">Towers of Hanoi</h1>
                    </div>
                    <div className="col-md-2 col-sm my-2">
                    <Modal
                        id="mdlInstructions"
                        title="How to play Towers of hanoi"
                        launcherText="How to play"
                    >
                        <div>
                            <h5>Objective</h5>
                            <p>The objective of the puzzle is to move the entire stack to another rod.</p>
                            <h5>Rules</h5>
                            <ul>
                                <li>Only one disk can be moved at a time.</li>
                                <li>Each move consists of taking the upper disk from one of the stacks and placing it on top of another stack or on an empty rod.</li>
                                <li>No larger disk may be placed on top of a smaller disk.</li>
                            </ul>
                            <h5>Gameplay</h5>
                            <h6>Start a new game</h6>
                            <ul>
                                <li>Select the disk stack size, you can choose from 3 to 10 disks</li>
                                <li>Click the <span className="font-weight-bold">Play</span> button</li>
                                <li>You can stop the game at any point by clicking the <span className="font-weight-bold">Stop</span> button, but be careful! <span className="font-weight-bold text-danger">your progress will not be saved</span> and all the stats will be reseted</li>
                            </ul>
                            <h6>Move</h6>
                            <p>Use the <ChevronRight /> <ChevronLeft /> <ChevronsRight /> <ChevronsLeft /> buttons under each stack to move the upper disk to a new stack or empty rod</p>
                            <ul>
                                <li><ChevronRight /> Moves the upper disk to the right adjacent stack</li>
                                <li><ChevronLeft /> Moves the upper disk to the left adjacent stack</li>
                                <li><ChevronsRight /> Moves the upper disk to the far right stack</li>
                                <li><ChevronsLeft /> Moves the upper disk to the far left stack</li>
                            </ul>
                            <h5>About</h5>
                            <p>
                                The Tower of Hanoi (also called the Tower of Brahma or Lucas' Tower and sometimes pluralized as Towers) is a mathematical game or puzzle. It consists of three rods and a number of disks of different sizes, which can slide onto any rod. The puzzle starts with the disks in a neat stack in ascending order of size on one rod, the smallest at the top, thus making a conical shape.

                                With 3 disks, the puzzle can be solved in 7 moves. The minimal number of moves required to solve a Tower of Hanoi puzzle is <span className="font-weight-bold font-italic">2n − 1</span>, where <span className="font-weight-bold font-italic">n</span> is the number of disks.
                                <br />
                                Learn more in 
                                <a 
                                    className="text-info" 
                                    href="https://en.wikipedia.org/wiki/Tower_of_Hanoi" 
                                    target="_blank" rel="noopener noreferrer"> Wikipedia
                                </a></p>
                        </div>
                    </Modal>
                    </div>
                    <div className="col-md-2 col-sm my-2">
                        <Modal 
                            id="mdlStats"
                            title="Stats"
                            launcherText="Your stats"
                        >
                            <table className="table table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col"># of disks</th>
                                        <th scope="col"># of moves</th>
                                        <th scope="col">Duration (seconds)</th>
                                        <th scope="col">Completion date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.stats.map( stat => {
                                            return (<tr>
                                                <td>{stat['numberOfDisks']}</td>
                                                <td>{stat['movements']}</td>
                                                <td>{stat['timeInSeconds']}</td>
                                                <td>{stat['timestamp']}</td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </Modal>
                    </div>
                </div>
                <hr className="my-4" />
                <div className="row">
                    
                    <div className="col-md-2 col-sm">
                        <div className="dropdown">
                            <button 
                                className={`btn btn-dark dropdown-toggle ${this.state.gameStarted === true ? "disabled" : ""}`} 
                                type="button" id="drpMenuDisksQty" 
                                data-toggle="dropdown" 
                                aria-haspopup="true" 
                                aria-expanded="false">
                                Disks stack size &nbsp;
                                <span className="badge badge-light badge-pill">{this.state.numberOfDisks}</span>
                            </button>
                            <div className="dropdown-menu" aria-labelledby="drpMenuDisksQty">
                                {this.numberOfDisksOptions.map( nmb => {
                                    const id = `rdoNumberOfDisks${nmb}`;
                                    return(
                                        
                                            <button 
                                                key={id}
                                                className="dropdown-item" 
                                                type="button" 
                                                onClick={()=> this.clickNumberOfDisksButtonHandler(nmb) }
                                            >
                                                {nmb}
                                            </button>
                                        
                                        
                                    )
                                })}
                                
                         </div>
                        </div>
                    </div>
                    <div className="col-md-2 col-sm">
                        <button 
                            className="btn btn-dark" 
                            type="button" 
                            onClick={this.clickPlayButtonHandler}
                        >
                            {this.state.gameStarted === false ? "Play" : "Stop"}
                        </button>
                    </div>
                    <div className="col my-2">
                        <ul className="list-group list-group-horizontal">
                            <li className="list-group-item list-group-item-dark">Moves&nbsp;<span className="badge badge-info badge-pill">{this.state.movementsCount}</span></li>
                            <li className="list-group-item list-group-item-dark">Time&nbsp;<span className="badge badge-info badge-pill">{this.state.seconds}</span></li>
                            
                        </ul>
                    </div>
                    
                </div>
                <hr className="my-4" />
                <div className="row justify-content-md-center">
                    <div className="col-sm">
                        <Tower>
                            {this.state.disks[0].map( disk => {
                            
                            return (<Disk 
                                y={disk.y} 
                                size={disk.size} 
                                color={disk.color} 
                                key={`tower1disk${disk.id}`}
                                /> 
                                )}
                            )}
                        </Tower>
                        <div className="row">
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 0, 1) }
                            >
                                    <ChevronRight />
                            </button> 
                            </div>
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 0, 2) }
                            >
                                    <ChevronsRight />
                            </button>   
                            </div> 
                        </div>
                    </div>
                    <div className="col-sm">
                        <Tower>
                            {this.state.disks[1].map( disk => <Disk 
                                y={disk.y} 
                                size={disk.size} 
                                color={disk.color} 
                                key={`tower2disk${disk.id}`}
                                /> 
                            )}
                        </Tower>
                        <div className="row">
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 1, 0) }
                            >
                                    <ChevronLeft />
                            </button> 
                            </div>
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 1, 2) }
                            >
                                    <ChevronRight />
                            </button>    
                            </div> 
                        </div>
                    </div>
                    <div className="col-sm">
                        <Tower>
                            {this.state.disks[2].map( disk => <Disk 
                                y={disk.y} 
                                size={disk.size} 
                                color={disk.color} 
                                key={`tower3disk${disk.id}`}
                                /> 
                            )}
                        </Tower>
                        <div className="row">
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 2, 0) }
                            >
                                    <ChevronsLeft />
                            </button> 
                            </div>
                            <div className="col">
                            <button 
                                type="button" 
                                className={`btn btn-link ${this.state.gameStarted === false ? "disabled": ""}`}
                                onClick={event => this.clickMoveDiskButtonHandler(event, 2, 1) }
                            >
                                    <ChevronLeft />
                            </button>    
                            </div> 
                        </div>
                    </div>
                </div>
            </div>
            {error}
            </React.Fragment>
    }
}

export default TowersOfHanoi;