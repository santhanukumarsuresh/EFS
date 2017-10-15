import { Router } from '@angular/router';
import { Injectable, OnDestroy, OnInit } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable,Subscription } from 'rxjs/Rx'
import * as firebase from 'firebase/app';
import { FileUploadService } from "./fileUpload.service";
import { AppService } from "./app.service";



@Injectable()
export class FirebaseAuthService implements OnInit,OnDestroy{

public user$: Observable<firebase.User>;
private user$Subscribtion:Subscription;


constructor(private _firebaseAuth : AngularFireAuth, 
            private _fileUploadSer : FileUploadService,
            private _appSer:AppService,
            private router : Router) {
    this.user$ = this._firebaseAuth.authState;
}

ngOnInit() { }


private setUserStatus = () => {
    this.user$Subscribtion = this.user$.subscribe((userInfo)=>{
        if(userInfo){
            this._appSer.userInfo = userInfo; 
            this._appSer.logedInUserName = userInfo.email.split('@')[0];
            this._fileUploadSer.getUploads(userInfo.uid);
        }else{
            this.router.navigate(['login']);
        }
    })
}

getUserCurrentStatus = ()=>{
    this.setUserStatus();
}

signIn = (user,passwrd) : Observable<any> => { return Observable.fromPromise(this._firebaseAuth
    .auth.signInWithEmailAndPassword(`${user}@efs.com`,passwrd))
}
signUP = (user,passwrd) : Observable<any> => { return Observable.fromPromise(this._firebaseAuth
    .auth.createUserWithEmailAndPassword(`${user}@efs.com`,passwrd))
}

signOut = () => this._firebaseAuth.auth.signOut();

ngOnDestroy(): void {
     this.user$Subscribtion?this.user$Subscribtion.unsubscribe():"";
}
    
}
