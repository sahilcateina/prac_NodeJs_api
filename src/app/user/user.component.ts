import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  userList: { id: number; name: string; email: string }[] = [];
  editingUser: { id: number; name: string; email: string } | null = null;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    // Initialize the form
    this.userForm = this.fb.group({
      Name: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.fetchUsers(); // Fetch users on component initialization
  }

  // Fetch users from the service
  fetchUsers(): void {
    this.userService.getUsers().subscribe(
      (users) => {
        this.userList = users;
      },
      (error) => {
        console.error('Error fetching users:', error);
      }
    );
  }

  // Add a new user
  addUser(): void {
    if (this.userForm.valid) {
      const userData = {
        name: this.userForm.value.Name,
        email: this.userForm.value.EmailId,
      };

      this.userService.addUser(userData).subscribe(
        (newUser) => {
          // Add the new user to the list
          this.userList.push(newUser);

          // Reset the form and validation state
          this.userForm.reset();
          this.userForm.markAsPristine();
          this.userForm.markAsUntouched();

          alert('User added successfully!');
        },
        
      ),(error:any) => {
          console.error('Error adding user:', error);
          alert('Failed to add user. Please try again.');
      };
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  editUser(user: { id: number; name: string; email: string }): void {
    this.editingUser = user;
    this.userForm.patchValue({
      Name: user.name,
      EmailId: user.email,
    });
  }

  deleteUser(id: number): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(id).subscribe(() => {
          this.userList = this.userList.filter((user) => user.id !== id);
          alert('User deleted successfully!');
        },
        (error) => {
          console.error('Error deleting user:', error);
          alert('Failed to delete user. Please try again.');
        }
      );
    }
  }

}

