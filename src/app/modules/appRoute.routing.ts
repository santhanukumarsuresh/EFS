import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent} from '../login/login.component';
import { PageNotFoundComponent } from '../pageNotFound/pageNotFound.component';
import { ManageFilesComponent } from "../manageFiles/manageFiles.component";

const routes: Routes = [
  { path: '', pathMatch:"full" ,redirectTo: "login" },
  { path: 'login', component : LoginComponent },
  { path: 'manageFiles', component : ManageFilesComponent },
  { path: '**', component : PageNotFoundComponent }
];

export const AppRoutingModule  = [RouterModule.forRoot(routes)];
export const routingComponents = [ LoginComponent,
                                   ManageFilesComponent,
                                   PageNotFoundComponent
                                  ];