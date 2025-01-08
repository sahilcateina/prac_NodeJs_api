import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; //add

import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { HttpClientModule } from '@angular/common/http';
import { UserlistComponent } from './userlist/userlist.component';
import { EditUserComponent } from './edit-user/edit-user.component'; 

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UserlistComponent,
    EditUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,         //add
    HttpClientModule     
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
