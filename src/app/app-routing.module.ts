import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
 {path:"user",component:UserComponent},
 { path: 'userlist', component: UserlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
