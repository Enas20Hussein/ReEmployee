import { Component, ElementRef,Inject, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ServiceService } from './shared/service.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'firstname',
    'lastname',
    'email',
    'birthday',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  title = 'ReEmployee';
  empform!: FormGroup<any>;
  education: string[] = ['student', 'junior', 'senior', 'post graduate'];
  @ViewChild('fileInput') fileInput!: ElementRef;
  constructor(private fb: FormBuilder,private service:ServiceService)
  {
      this.empform = this.fb.group({
        firstname: '',
        lastname: '',
        email: '',
        birthday: '',
        gender: '',
        education: '',
        company: '',
        experience: '',
        package: '',
      });
    }
    ngOnInit(): void {
      this.getemployeelist();
      
  }
 
  onformSubmit() {
    if (this.empform.valid) {
      this.service.addemployee(this.empform.value).subscribe({
        next: (val: any) => {
          alert('employee added successfully');
          
        },
        error: (err: any) => {
          alert(err);
        },
      });
    }
  }
  getemployeelist() {
    this.service.getallemployee().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        alert(err);
      },
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  deleterowEmployee(id: number) {
    this.service.deletemployee(id).subscribe({
      next: (res) => {
        alert('Employee is removed');
        this.getemployeelist();
      },
      error: console.log,
    });
  }
 

}
