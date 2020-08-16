import React from 'react';
import {Jumbotron} from 'react-bootstrap';
class Welcome extends React.Component{
    render(){
        
        return(
            <div>
                
                    <Jumbotron className="bg-dark text-white text-center">
                        <h1>Welcome To The Employee Portal</h1>
                        <p>
                            <h5>"The leader is the person who brings a little magic to the moment."</h5>
                            - Denise Morrison (President & CEO, Campbell Soup)
                        </p>
                    </Jumbotron>
                
            </div>
        );
    }
        
    }
export default Welcome;