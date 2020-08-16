import React from 'react';
import { Card, Form, Button} from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';

class AddEmployee extends React.Component{
    constructor(props){
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.submitEmployee = this.submitEmployee.bind(this);
        this.empChanged = this.empChanged.bind(this);
    }
    initialState = {id:'', firstName:'', lastName: '', email: ''}

    componentDidMount(){
        const employeeId = +this.props.match.params.id;
        if(employeeId){
            this.findEmployeeById(employeeId);
        }
    }

    findEmployeeById = (employeeId) =>{
        axios.get('http://localhost:8080/api/v1/employee/' + employeeId)
            .then(response => {
                if(response.data != null){
                    this.setState({
                        id: response.data.id,
                        firstName: response.data.firstName,
                        lastName: response.data.lastName,
                        email: response.data.email
                    });
                }
            }).catch((error)=>{
                console.error("Error - " + error);
            });
    }
    submitEmployee = event =>{
        //alert(this.state.firstName + this.state.lastName + this.state.email);
        event.preventDefault();
        const employee = {
            firstName : this.state.firstName,
            lastName: this.state.lastName,
            email : this.state.email
        }
        axios.post("http://localhost:8080/api/v1/employees", employee)
        .then(response =>{
            if(response.data != null){
                this.setState({"show":true, "method":"post"});
                setTimeout(()=>this.setState({"show":false}), 3000);
                //setTimeout(()=>EmployeeList.props.listAllEmployees(),3000);
            }else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    }

    
    updateEmployee = (event) =>{
        event.preventDefault();
        const employee = {
            id: this.state.id,
            firstName : this.state.firstName,
            lastName: this.state.lastName,
            email : this.state.email
        }
        axios.put("http://localhost:8080/api/v1/employees/"+this.state.id, employee)
        .then(response =>{
            if(response.data != null){
                this.setState({"show":true, "method":"put"});
                setTimeout(()=>this.setState({"show":false}), 3000);
                //setTimeout(()=>this.employeeList(), 3000);
            }else{
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };
    resetEmployee = () =>{
        this.setState(() => this.initialState);
    }
    empChanged = (event) =>{
        this.setState({
            [event.target.name]:event.target.value
        });
    }
    render(){
        return(
            <div>
                <div style={{'display': this.state.show ? 'block' : 'none'}}>
                    <MyToast show={this.state.show} message={this.state.method==="put" ? "Employee Updated Successfully":"Employee Added Successfully"} type={"success"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>{this.state.id ? "Update Employee" : "Add Employee"}</Card.Header>
                    <Form onReset={this.resetEmployee} onSubmit={this.state.id ? this.updateEmployee : this.submitEmployee} id="addEmployeeForm">
                    <Card.Body>
                        
                            <Form.Group controlId="formGridFirstName">
                                <Form.Label>FirstName</Form.Label>
                                <Form.Control type="text" className="bg-dark text-white"
                                value={this.state.firstName} onChange={this.empChanged} autoComplete="off"
                               name="firstName" placeholder="Enter first name" required/>
                            </Form.Group>

                            <Form.Group controlId="formGridLastName">
                                <Form.Label>LastName</Form.Label>
                                <Form.Control type="text" className="bg-dark text-white"
                                value={this.state.lastName} onChange={this.empChanged} autoComplete="off"
                                name="lastName" placeholder="Enter last name" required/>
                            </Form.Group>

                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" className="bg-dark text-white"
                                value={this.state.email} onChange={this.empChanged} autoComplete="off"
                                name="email" placeholder="Enter email" required/>
                                <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                                </Form.Text>
                            </Form.Group>
                            
                        
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            {this.state.id ? "Update" : "Save"}
                        </Button>
                        <Button size="sm" variant="info" type="reset">
                            Reset
                        </Button>
                    </Card.Footer>
                    </Form>
                </Card>

            </div>
        );
    }
}
export default AddEmployee;