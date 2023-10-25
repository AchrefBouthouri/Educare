import {Component, OnInit, ViewChild} from '@angular/core';
import {User} from "../../../../../core/model/user.model";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserService} from "../../../../../core/service/user/user.service";
import {MatTableDataSource} from "@angular/material/table";
import { Router } from '@angular/router';

@Component({
  selector: 'app-get-users',
  templateUrl: './get-users.component.html',
  styleUrls: ['./get-users.component.css']
})
export class GetUsersComponent implements OnInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'username','action'];
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>();
  users:User[]  = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService,private router: Router) {}

  ngOnInit() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.dataSource.data = users; // set the data for the MatTableDataSource
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
      this.dataSource.data = this.users; // update the data in the MatTableDataSource
    });
  }




}
