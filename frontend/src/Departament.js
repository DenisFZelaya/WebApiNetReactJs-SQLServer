import { IsConstructor } from "es-abstract";
import React, { Component } from "react";
import { variables } from './Variables';

export class Departament extends Component {
    constructor(props) {
        super(props);

        this.state = {
            departaments: [],
            modalTitle: "",
            DepartamentName: "",
            DepartamentId: 0,

            DepartamentIdFilter: "",
            DepartamentNameFilter: "",
            departamentsWithoutFilter: []
        }
    }

    FilterFn() {
        var DepartamentIdFilter = this.state.DepartamentIdFilter;
        var DepartamentNameFilter = this.state.DepartamentNameFilter;

        var filteredData = this.state.departamentsWithoutFilter.filter(
            function (el) {
                return el.DepartamentId.toString().toLowerCase().includes(
                    DepartamentIdFilter.toString().trim().toLowerCase()
                ) &&
                    el.DepartamentName.toString().toLowerCase().includes(
                        DepartamentNameFilter.toString().trim().toLowerCase()
                    )
            }
        );

        this.setState({ departaments: filteredData });
    }

    sortResult(prop, asc) {
        var sortedData = this.state.departamentsWithoutFilter.sort(function (a, b) {
            if (asc) {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        })

        this.setState({ departaments: sortedData });
    }

    changeDepartamentIdFilter = (e) => {
        this.state.DepartamentIdFilter = e.target.value;
        this.FilterFn();
    }

    changeDepartamentNameFilter = (e) => {
        this.state.DepartamentNameFilter = e.target.value;
        this.FilterFn();
    }



    refreshList() {
        fetch(variables.API_URL + 'Departament')
            .then(Response => Response.json())
            .then(data => {
                this.setState({ departaments: data, departamentsWithoutFilter: data });
            })
    }

    componentDidMount() {
        this.refreshList();
    }

    changeDepartamentName = (e) => {
        this.setState({ DepartamentName: e.target.value });
    }

    addClick() {
        this.setState({
            modalTitle: "Add Departament",
            DepartamentId: 0,
            DepartamentName: ""
        });
    }

    editClick(dep) {
        this.setState({
            modalTitle: "Edit Departament",
            DepartamentId: dep.DepartamentId,
            DepartamentName: dep.DepartamentName
        });
    }

    createClick() {
        fetch(variables.API_URL + "Departament", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartamentName: this.state.DepartamentName
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
        fetch(variables.API_URL + "Departament", {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DepartamentId: this.state.DepartamentId,
                DepartamentName: this.state.DepartamentName
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
            fetch(variables.API_URL + "Departament/" + id, {
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

    render() {
        const {
            departaments,
            modalTitle,
            DepartamentId,
            DepartamentName
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Departament
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>
                                <div className="d-flex flex-row">
                                    <input className="form-control m-2" onChange={this.changeDepartamentIdFilter} placeholder="Filter" />
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('DepartamentId', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('DepartamentId', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </button>
                                </div>
                                DepartamentId

                            </th>
                            <th>
                            <div className="d-flex flex-row">
                                <input className="form-control m-2" onChange={this.changeDepartamentNameFilter} placeholder="Filter" />
                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('DepartamentName', true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-down" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z" />
                                        </svg>
                                    </button>

                                    <button type="button" className="btn btn-light" onClick={() => this.sortResult('DepartamentName', false)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5zm-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5z" />
                                        </svg>
                                    </button>
                                </div>
                                DepartamentName</th>
                            <th>
                                Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {departaments.map(dep =>
                            <tr key={dep.DepartamentId}>
                                <td> {dep.DepartamentId} </td>
                                <td> {dep.DepartamentName} </td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal"
                                        data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(dep)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z" />
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(dep.DepartamentId)}>
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
                                <div className="input-group mb-3">
                                    <span className="input-group-text">DepartamentName</span>
                                    <input type="text" className="form-control"
                                        value={DepartamentName}
                                        onChange={this.changeDepartamentName}
                                    />
                                </div>

                                {DepartamentId == 0 ?
                                    <button type="button" className="btn btn-primary float-start"
                                        onClick={() => this.createClick()}>
                                        Create
                                    </button>
                                    : null
                                }

                                {DepartamentId != 0 ?
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