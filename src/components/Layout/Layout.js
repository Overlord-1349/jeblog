import React from 'react';
import './Layout.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from '../Header/Header';
import PlayGround from '../../containers/PlayGround/PlayGround';
import Sorting from '../../containers/Sorting/Sorting';
import About from '../About/About';
import TowersOfHanoi from '../../containers/TowersOfHanoi/TowersOfHanoi';
const layout = (props) => {
    return (
        <React.Fragment>
            <Router>
                <header>
                    <Header />
                </header>
                <main>
                    <Switch>
                        <Route path="/about" component={About}></Route>
                        <Route path="/home"></Route>
                        <Route path="/sorting" component={Sorting} />
                        <Route path="/hanoitower" component={TowersOfHanoi} />
                        <Route path="/playground" ><PlayGround /></Route>
                    </Switch>  
                </main>
                
            </Router>
        </React.Fragment>
    )
}
export default layout;