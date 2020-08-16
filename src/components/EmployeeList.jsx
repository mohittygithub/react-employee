import React from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import axios from 'axios';
import MyToast from './MyToast';
import {Link} from 'react-router-dom';

class EmployeeList extends React.Component{
    constructor(props){
        super(props);
        this.state={
            employees : []
        }
    }
    componentDidMount(){
        this.findAllEmployees();
    }

    findAllEmployees(){
        axios.get('http://localhost:8080/api/v1/employees')
        .then(response => response.data)
        .then((data) => {
            this.setState({employees: data});
        });
    }

    deleteEmployee = (employeeId) =>{
        axios.delete('http://localhost:8080/api/v1/employees/'+employeeId)
            .then(response => {
                if(response.data != null){
                    this.setState({"show":true});
                    setTimeout(()=>this.setState({"show":false}), 3000);
                    this.setState({
                        employees : this.state.employees.filter(employee => employee.id !== employeeId)
                    });
                }else{
                    this.setState({"show":false});
                }
            });
    };
    render(){
        return(
            <div>
                <div style={{'display': this.state.show ? 'block' : 'none'}}>
                    <MyToast show={this.state.show} message={"Employee Deleted Successfully"} type={"danger"}/>
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>Employee's List</Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.employees.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">{this.state.employees.length} Employees Available Yet</td>
                                    </tr>:
                                    this.state.employees.map((employee)=> (
                                        <tr key={employee.id}>
                                            <td>{employee.firstName}</td>
                                            <td>{employee.lastName}</td>
                                            <td>{employee.email}</td>
                                            <td>
                                                <ButtonGroup>
                                                    <Link to={"edit/"+employee.id} className="btn btn-sm btn-outline-primary">Update</Link>
                                                    <Button size="sm" variant="outline-danger" onClick={this.deleteEmployee.bind(this,employee.id)}>Delete</Button>
                                                </ButtonGroup>
                                            </td>
                                        </tr>
                                        ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}
export default EmployeeList;