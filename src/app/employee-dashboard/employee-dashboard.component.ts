import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms'
import { EmployeeModels } from './employee-dashboard.models';
import { ApiService } from '../shared/api.service'
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']

})
export class EmployeeDashboardComponent implements OnInit {

  formEmployee!: FormGroup;
  employeeModels: EmployeeModels = new EmployeeModels();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.formEmployee = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(),
      Telephone: new FormControl(),
      Salary: new FormControl()
    }),
    this.getEmployee()


  }

  postEmployee() {
    this.employeeModels.firstName = this.formEmployee.value.firstName
    this.employeeModels.lastName = this.formEmployee.value.lastName
    this.employeeModels.email = this.formEmployee.value.email
    this.employeeModels.Telephone = this.formEmployee.value.Telephone
    this.employeeModels.Salary = this.formEmployee.value.Salary
    this.api.postEmployee(this.employeeModels)
      .subscribe(res => {
        Swal.fire("Complete", "Add Employee", "success")
        this.getEmployee()
        let close = document.getElementById("close")
        close!.click()
      },
        err => {
          Swal.fire("Error", "Add Employee Error", "error")
        })
  }
  getEmployee(){
    this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData = res;
    },)
  }

  deleteEmployee(id:number){
    this.api.deletEmployee(id)
    .subscribe(res => {
      Swal.fire("Complete", "Delete Employee", "success")
      this.getEmployee()
    },
      err => {
        Swal.fire("Error", "Delete Employee Error", "error")
      })
  }

  clickAdd(){
    this.formEmployee.reset()
    this.showAdd = true
    this.showUpdate = false
    this.employeeData.id = 0
  }

  clickEdit(data: any){
    this.showAdd = false
    this.showUpdate = true
    this.employeeData.id = data.id
    this.formEmployee.controls['firstName'].setValue(data.firstName)
    this.formEmployee.controls['lastName'].setValue(data.lastName)
    this.formEmployee.controls['email'].setValue(data.email)
    this.formEmployee.controls['Telephone'].setValue(data.Telephone)
    this.formEmployee.controls['Salary'].setValue(data.Salary)
  }

  updateEmployee(){
    this.employeeModels.firstName = this.formEmployee.value.firstName
    this.employeeModels.lastName = this.formEmployee.value.lastName
    this.employeeModels.email = this.formEmployee.value.email
    this.employeeModels.Telephone = this.formEmployee.value.Telephone
    this.employeeModels.Salary = this.formEmployee.value.Salary
    this.api.updateEmployee( this.employeeData.id,this.employeeModels)
    .subscribe(res => {
      Swal.fire("Complete", "Update Employee Complete", "success")
      this.getEmployee()
      let close = document.getElementById("close")
      close!.click()
    },
      err => {
        Swal.fire("Error", "Update Employee Error", "error")
      })
  }
}