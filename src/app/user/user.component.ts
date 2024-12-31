import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  userForm: FormGroup;
  users: any[] = [];
  isEditMode: boolean = false;
  currentUserId: number | null = null;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      Name: [''],
      EmailId: ['']
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  // Fetch all users
  getUsers() {
    this.userService.getUsers().subscribe((data) => {
      this.users = data;
    });
  }

  // Handle form submission
  SubmitForm() {
    const formData = this.userForm.value;
  
    if (this.isEditMode && this.currentUserId !== null) {
      // Update User
      this.userService.updateUser(this.currentUserId, {
        name: formData.Name,
        email: formData.EmailId
      }).subscribe(() => {
        this.resetForm();
        this.getUsers(); // Refresh the list
      });
    } else {
      // Create User
      this.userService.createUser({
        name: formData.Name,
        email: formData.EmailId
      }).subscribe(() => {
        this.resetForm();
        this.getUsers(); // Refresh the list
      });
    }
  }
  
  
  // Helper function to switch tabs
  switchToUserListTab() {
    const userListTab = document.querySelector('#profile-tab') as HTMLElement;
    if (userListTab) {
      userListTab.click();
    }
  }
  // Edit a user
  editUser(user: any) {
    this.isEditMode = true;
    this.currentUserId = user.id;
    this.userForm.setValue({
      Name: user.name,
      EmailId: user.email
    });
  }

  // Delete a user
  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.getUsers();
    });
  }

  // Reset form
  resetForm() {
    this.userForm.reset();
    this.isEditMode = false;
    this.currentUserId = null;
  }

}
