import React, { Component } from 'react';
import ListGroup, {ListGroupItem} from '../../components/BS/ListGroup/ListGroup';
class PlayGround extends Component{
    render(){
        return <React.Fragment>
            <ListGroup layout="horizontal">
                <ListGroupItem>Bubble</ListGroupItem>
                <ListGroupItem>Insertion</ListGroupItem>
            </ListGroup>
            <ListGroup type="a">
                <ListGroupItem type="a">Bubble</ListGroupItem>
                <ListGroupItem type="a">Insertion</ListGroupItem>
            </ListGroup>
            <ListGroup type="button">
                <ListGroupItem type="button">Bubble</ListGroupItem>
                <ListGroupItem type="button" contextual="dark">Insertion</ListGroupItem>
            </ListGroup>
        </React.Fragment>
    }
}

export default PlayGround;