import { Component } from '@angular/core';
import { Router } from '@angular/router';
import * as _ from "lodash";
import { AppService } from "./services/app.service";
import { FirebaseAuthService } from "./services/firebaseAuth.service";
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Effective Sharing';
  logedInUserName;
  constructor ( private router : Router,
                private _appSer : AppService,
                private _authSer : FirebaseAuthService){}

  ngOnInit() {
  }

 


  SignOut = () =>{
    this._authSer.signOut();
    this._appSer.logedInUserName = "";
    this.router.navigate(['login']);
  }
 

  
}
