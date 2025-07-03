import { Component, OnInit } from '@angular/core';
// import { User,UserService } from '../services/user.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { User } from '../services/user';

@Component({
  selector: 'app-add-edit-user',
  imports: [CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './add-edit-user.component.html',
  styleUrl: './add-edit-user.component.scss'
})

export class AddEditUserComponent implements OnInit {
  user: User = { name: '', email: '', password: '' };
  isEditMode = false;

  constructor(
    private userService: UserService,
    public route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.userService.getUserById(+id).subscribe((data) => {
        this.user = data;
      });
    }
  }

  saveUser(): void {
    if (this.isEditMode) {
      this.userService.updateUser(this.user.id!, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}