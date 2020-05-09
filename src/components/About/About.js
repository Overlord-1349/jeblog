import React from 'react';
import { Twitter, GitHub, Linkedin, User, Heart, Users, Smile, TrendingUp, Map } from 'react-feather';

const AboutSection = (props) => {
    return <React.Fragment>
        <div className="row">
            <div className="col">
                <div className="alert alert-primary" role="alert">
                    {props.title}
                </div>
            </div>
        </div>
        <div className="row">
            <div className="col">
                {props.children}
            </div>
        </div>
        <hr className="my-4" />
    </React.Fragment>
}

const about = (props) => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-md-center">
                <div className="col-sm col-md-9">
                    <AboutSection title="Profile">
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><User /> Character</div>
                            <div className="col-sm col-md-8 text-muted bg-light">J. Enrique Cruz</div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><Smile /> Class</div>
                            <div className="col-sm col-md-8 text-muted bg-light">Viking Nerd</div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><Map /> Kingdom</div>
                            <div className="col-sm col-md-8 text-muted bg-light">Guadalajara Jalisco, Mexico</div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><Heart /> HP</div>
                            <div className="col-sm col-md-8 text-muted bg-light">
                            <div className="progress">
                                <div className="progress-bar bg-success" 
                                    role="progressbar" 
                                    style={{width: "100%"}} 
                                    aria-valuenow="32" 
                                    aria-valuemin="0" 
                                    aria-valuemax="80">32</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><TrendingUp /> Experience</div>
                            <div className="col-sm col-md-8 text-muted bg-light">
                            <div className="progress">
                                <div className="progress-bar bg-info" 
                                    role="progressbar" 
                                    style={{width: "32%"}} 
                                    aria-valuenow="10" 
                                    aria-valuemin="0" 
                                    aria-valuemax="32">10</div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light">Skills</div>
                            <div className="col-sm col-md-8 text-muted bg-light">
                                <ul className="list-group list-group-flush">
                                    <li className="list-group-item">SQL and database systems</li>
                                    <li className="list-group-item">Python</li>
                                    <li className="list-group-item">Autosys</li>
                                    <li className="list-group-item">Unix</li>
                                    <li className="list-group-item">Web developing</li>
                                    <li className="list-group-item">JS</li>
                                </ul>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-sm col-md-4 text-primary bg-light"><Users /> Social</div>
                            <div className="col-sm col-md-8 text-muted bg-light">
                                <p className="lead">
                                    <a className="text-info" href="https://www.linkedin.com/in/jecr-34329095/" target="_blank" rel="noopener noreferrer"><Linkedin /> Linkedin</a>
                                    <br />
                                    <a className="text-info" href="https://github.com/Overlord-1349" target="_blank" rel="noopener noreferrer"><GitHub /> Github</a>
                                    <br />
                                    <a className="text-info" href="https://twitter.com/overlord_kike" target="_blank" rel="noopener noreferrer"><Twitter /> Twitter </a>
                        
                                </p>
                            </div>
                        </div>
                    </AboutSection>
                    <AboutSection title="Work Experience">
                        Work experience
                    </AboutSection>
                    
                    <AboutSection title="Projects">
                        Projects
                    </AboutSection>
                </div>
                <div className="col-sm col-md-3">
                    <AboutSection title="Education">
                        <div className="row">
                            <div className="col-sm text-info ">June 2005 - December 2010</div>
                            <div className="col-sm text-secondary ">Computer Science Degree at University of Guadalajara (CUCEI)</div>
                        </div>
                    </AboutSection>
                    <AboutSection title="Hobbies">
                        <div className="row">
                            <div className="col-sm text-info ">Programming</div>
                            <div className="col-sm text-secondary "></div>
                        </div>
                        <div className="row">
                            <div className="col-sm text-info ">Videogames</div>
                            <div className="col-sm text-secondary "></div>
                        </div>
                    </AboutSection>
                </div>
            </div>
        
        </div>
        )
}


export default about;