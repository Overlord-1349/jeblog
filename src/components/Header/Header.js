import React, {Component} from 'react';
import { Home, Code } from 'react-feather';

class Header extends Component{
    render() {
        return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <a className="navbar-brand" href="/about">J.E.</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    
                    <a className="nav-link" href="/home">|&nbsp;&nbsp;<Home height="18" width="18" />&nbsp;&nbsp;Home&nbsp;&nbsp;</a>
                </li>
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" href="#top" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        |&nbsp;&nbsp;<Code height="18" width="18" />&nbsp;&nbsp;Code&nbsp;&nbsp;
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/sorting">Sorting Algorithms</a>
                        <a className="dropdown-item" href="/datastructures">Data Structures</a>
                        <div className="dropdown-divider"></div>
                        <a className="dropdown-item" href="/hanoitower">Tower of Hanoi</a>
                    </div>
                </li>
                
                </ul>
                
            </div>
        </nav>
    );
    }
}

export default Header;

/*
<form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
*/