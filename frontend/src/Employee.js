import { IsConstructor } from "es-abstract";
import React, { Component } from "react";
import { variables } from './Variables';

export class Employee extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departaments: [],
            employee: [],
            modalTitle: "",
            EmployeeId: 0,
            EmployeName: "",
            Departament: "",
            DateOfJoining: "",
            PhotoFileName: "anonymous.png",
            PhotoPath: variables.PHOTO_URL
        }
    }

    refreshList() {
        fetch(variables.API_URL + 'Employee')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ employee: data });
            })

        fetch(variables.API_URL + 'Departament')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ departaments: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    changeEmployeName = (e) => {
        this.setState({ EmployeName: e.target.value });
    }
    changeDepartament = (e) => {
        this.setState({ Departament: e.target.value });
    }
    changeDateOfJoining = (e) => {
        this.setState({ DateOfJoining: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Employee",
            EmployeeId: 0,
            EmployeName: "",
            Departament: "",
            DateOfJoining: "",
            PhotoFileName: "anonymous.png",
        });
    }

    editClick(emp) {
        this.setState({
            modalTitle: "Edit Employee",
            EmployeeId: emp.EmployeeId,
            EmployeName: emp.EmployeName,
            Departament: emp.Departament,
            DateOfJoining: emp.DateOfJoining,
            PhotoFileName: emp.PhotoFileName,
        });
    }

    createClick() {
        fetch(variables.API_URL + "Employee", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeName: this.state.EmployeName,
                Departament: this.state.Departament,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    updateClick() {
        fetch(variables.API_URL + "Employee", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                EmployeeId: this.state.EmployeeId,
                EmployeName: this.state.EmployeName,
                Departament: this.state.Departament,
                DateOfJoining: this.state.DateOfJoining,
                PhotoFileName: this.state.PhotoFileName,
            })
        })
            .then(res => res.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            })
    }

    deleteClick(id) {
        if (window.confirm('Are you sure?')) {
            fetch(variables.API_URL + "Employee/" + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((result) => {
                    alert(result);
                    this.refreshList();
                }, (error) => {
                    alert('Failed');
                })
        }
    }

    imageUpload=(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0], e.target.files[0].name);

        fetch(variables.API_URL+'Employee/savefile',{
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data=> {
            this.setState({PhotoFileName: data})
        })
    }

    render() {
        const {
            departaments,
            employee,
            modalTitle,
            EmployeeId,
            EmployeName,
            Departament,
            DateOfJoining,
            PhotoPath,
            PhotoFileName
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Employee
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>EmployeeId</th>
                            <th>EmployeName</th>
                            <th>Departament</th>
                            <th>DOJ</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(emp =>
                            <tr key={emp.EmployeeId}>
                                <td> {emp.EmployeeId} </td>
                                <td> {emp.EmployeName} </td>
                                <td> {emp.Departament} </td>
                                <td> {emp.DateOfJoining} </td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(emp)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(emp.EmployeeId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title"> {modalTitle} </h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close">

                                </button>
                            </div>
                            <div className="modal-body">
                                <div className="d-flex flex-row bd-group-text">
                                    <div className="p-2 w-50 bd-highlight">
                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Emp Name</span>
                                            <input type="text" className="form-control"
                                                value={EmployeName}
                                                onChange={this.changeEmployeName}
                                            />
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">Departament</span>
                                            <select className="form-select"
                                                onChange={this.changeDepartament}
                                                value={Departament}>
                                                {departaments.map(dep => <option key={dep.DepartamentId}>
                                                    {dep.DepartamentName}
                                                </option>)}
                                            </select>
                                        </div>

                                        <div className="input-group mb-3">
                                            <span className="input-group-text">DOJ</span>
                                            <input type="date" className="form-control"
                                                value={DateOfJoining}
                                                onChange={this.changeDateOfJoining}
                                            />
                                        </div>

                                    </div>

                                    <div className="p-2 w-50 bd-highlight">
                                        <img width="250px" height="250px"
                                            src={PhotoPath + PhotoFileName} />
                                            <input className="m-2" type="file" onChange={this.imageUpload} />
                                    </div>
                                </div>

                                {EmployeeId == 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>
                                        Create
                                    </button>
                                    : null
                                }

                                {EmployeeId != 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.updateClick()}>
                                        Update
                                    </button>
                                    : null
                                }


                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}