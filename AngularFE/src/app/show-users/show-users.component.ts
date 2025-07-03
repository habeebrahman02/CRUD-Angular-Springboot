import { Component, OnInit } from '@angular/core';
// import { User,UserService } from '../services/user.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { User } from '../services/user';

@Component({
  selector: 'app-show-users',
  imports: [CommonModule, ReactiveFormsModule,FormsModule,NgxPaginationModule],
  templateUrl: './show-users.component.html',
  styleUrl: './show-users.component.scss'
})

export class ShowUsersComponent implements OnInit {
  p:number=1;
  

  users: User[] = [];

  constructor(private userService: UserService, public router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

 deleteUser(id: number | undefined): void {
  if (id === undefined) {
    console.error("User ID is undefined");
    return;
  }

  // Safe to use id as a number here
  this.userService.deleteUser(id).subscribe(() => {
    this.getUsers(); // refresh the list
  });
}
  getUsers() {
    throw new Error('Method not implemented.');
  }


  editUser(id: number): void {
    this.router.navigate(['/edit-user', id]);
  }

  

   pageChangeEvent(event: number){
    this.p = event;
    this.ngOnInit();
  }
}
