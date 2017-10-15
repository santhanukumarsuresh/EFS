import { Router } from '@angular/router';
import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { AppService } from "../services/app.service";
import { FirebaseAuthService } from "../services/firebaseAuth.service";
import { FileUploadService } from "../services/fileUpload.service";
import { Observable, Subscription } from 'rxjs/Rx';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  private signUpForm;
  private passwrd1:string;
  private passwrd2:string;
  private signInForm;
  private signInsubscription: Subscription;
  private signUpsubscription: Subscription;
  private isValidEmail:boolean=false;
  private loading = false;


  constructor( 
               private router : Router, 
               private _appSer : AppService, 
               private _authSer : FirebaseAuthService,
               private _fileUploadSer : FileUploadService,) { 
               
  }

 ngOnInit() {
    this._authSer.signOut();
    this.signUpForm = new FormGroup({
      signUpUserName : new FormControl("",Validators.compose([
        Validators.required,
        this.signUpUserNameValidator,
        Validators.pattern(/^([0-9]|[a-z])+([0-9a-z]+)$/i)
      ])),
      signUpPassword : new FormControl("",this.signUpPasswordValidator),
      signUpCnfPassword :new FormControl("",this.signUpCnfPasswordValidator),
      signUpEmail :new FormControl("",this.signUpEmailValidator)
    })

    this.signInForm = new FormGroup({
      signInUserName : new FormControl("",Validators.compose([
        Validators.required,Validators.minLength(3),
        Validators.pattern(/^([0-9]|[a-z])+([0-9a-z]+)$/i)
      ])),
      signInPassword : new FormControl("",Validators.minLength(6))
    })
  }

  signUpUserNameValidator = name => { 
    if(name.value.length<3){
      return {"signUpUserName" : true}
    }else{
      return;
    }
  };

  signUpPasswordValidator = control => { 
    this.passwrd2="";
    if(control.value && control.value.length<6){
      return {"signUpPassword" : true}
    }else{
      return;
    }
  };

  signUpCnfPasswordValidator = control => { 
    if(control.value != this.passwrd1){
      return {"signUpCnfPassword" : true}
    }else{
      return;
    }
  };

  signUpEmailValidator = control => { 
    if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(control.value)){  
      this.isValidEmail=true;
        return ;  
      }else{
        this.isValidEmail=false;
        return {"signUpEmail" : true};
      }  
  };
  
  
  submitSignUpMethod = () => {
     this.signUpsubscription = this._authSer.signUP(this.signUpForm.value.signUpUserName,this.signUpForm.value.signUpPassword)
     .subscribe(
       success => { this._appSer.showSignIn=true,
                    this._fileUploadSer.addUsers(success,this.signUpForm.value.signUpEmail,this.signUpForm.value.signUpPassword),
                    this._authSer.signOut()
                  },
       error => console.log(`Something wrong: ${error}`)
     );
  };

  submitSignInMethod = () => {
    this.loading = true;    
    this.signInsubscription = this._authSer.signIn(this.signInForm.value.signInUserName,this.signInForm.value.signInPassword)
    .subscribe(
      success => {this.router.navigate(['manageFiles']),
      this.loading = false
    },          
      error => {console.log(`Something wrong: ${error}`)
      this.loading = false
            }
    );
    
 };
 



ngOnDestroy() {
  if(this.signInsubscription)this.signInsubscription.unsubscribe();
  if(this.signUpsubscription)this.signUpsubscription.unsubscribe();
}

}

