import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  userId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Inject Router
    private fb: FormBuilder,
    private userService: UserService
  ) {
    // Initialize the form
    this.editUserForm = this.fb.group({
      Name: ['', Validators.required],
      EmailId: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    // Get the user ID from the route parameters
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.userId) {
      this.fetchUserData(this.userId);
    }
  }

  // Fetch user data and pre-fill the form
  fetchUserData(id: number): void {
    this.userService.getUsers().subscribe(
      (users) => {
        const user = users.find((u) => u.id === id);
        if (user) {
          this.editUserForm.patchValue({
            Name: user.name,
            EmailId: user.email,
          });
        } else {
          alert('User not found!');
          this.router.navigate(['/user']);
        }
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }

  // Update user details
  updateUser(): void {
    if (this.editUserForm.valid && this.userId) {
      const updatedData = {
        name: this.editUserForm.value.Name,
        email: this.editUserForm.value.EmailId,
      };

      this.userService.editUser(this.userId, updatedData).subscribe(
        () => {
          alert('User updated successfully!');
          this.router.navigate(['/user']); // Redirect to user list
        },
        (error) => {
          console.error('Error updating user:', error);
          alert('Failed to update user. Please try again.');
        }
      );
    } else {
      alert('Please fill out the form correctly.');
    }
  }

  // Method to navigate back to the user list
    public navigateToUserList(): void {
     this.router.navigate(['/user']);
  }
 }
