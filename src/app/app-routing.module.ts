import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
 {path:"user",component:UserComponent},
 { path: 'userlist', component: UserlistComponent },
 { path: "edit-user/:id", component: EditUserComponent }, // New route for editing
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
