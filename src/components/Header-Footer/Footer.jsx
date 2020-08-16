import React from 'react';
import {Container, Col, Navbar} from 'react-bootstrap';

class Footer extends React.Component{
    render(){
        let fullYear = new Date().getFullYear();
        return(
            <div>
                <Navbar fixed="bottom" bg="dark" variant="dark">
                    <Container>
                        <Col lg={12} className="text-center-muted">
                            <div>
                                All Rights Reserved. {fullYear}-{fullYear+1}
                            </div>
                        </Col>
                    </Container>
                    
                
                </Navbar>
            </div>
        );
    }
}

export default Footer;