import { Observable, Subscription } from 'rxjs/Rx';
import { Injectable, OnInit, OnDestroy } from '@angular/core';
import { ConfigureFile } from "../manageFiles/configureFile";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { Router } from '@angular/router';
import * as _ from "lodash";
import { AppService } from "./app.service";


@Injectable()
export class FileUploadService implements OnDestroy{
  

 constructor( private db: AngularFireDatabase,
              private router : Router,
              private _appSer:AppService){  }

  uploads: FirebaseListObservable<ConfigureFile[]>;
  private basePath:string;
  private dbSubscription : Subscription;
 
  OnInit(){
  }

  getUploads(userId) {
    this.dbSubscription = this.db.list(`/efs/${userId}`).subscribe((files)=>{
      this._appSer.fileList = files;
    })
  }

  getUsers() {
    this.dbSubscription = this.db.list(`efs-users/`).subscribe((users)=>{
      this._appSer.userList = users;
      users.map(v => v.userName.split('@')[0] !== this._appSer.logedInUserName ? this._appSer.otherUserList.push(v):"")
    })
  }

  deleteUpload(key: string) {
    this.deleteFileData(key)
    .then( () => {
      this.deleteFileStorage(key)
    })
    .catch(error => console.log(error))
  }

  pushUpload(upload: ConfigureFile) {
      this.basePath = `/efs/${this._appSer.userInfo.uid}`;
      return new Promise((resolve,reject)=>{
        const storageRef = firebase.storage().ref();
        let metadata = {
          contentType: upload.file.type,
        };
        const uploadTask = storageRef.child(`${this.basePath}/'-efs-'`+upload.nanoTime).put(upload.file,metadata);
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
          (snapshot) =>  {
            // upload in progress
            let snap = snapshot as firebase.storage.UploadTaskSnapshot
            upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100
          },
          (error) => {
            // upload failed
            console.log(error)
          },
          () => {
            // upload success
            upload.url = uploadTask.snapshot.downloadURL
            upload.name = upload.file.name
            this.saveFileData(upload)
            console.log("getUpload : ",upload);
            return undefined
          }
        );

      })
      
  }


  shareUrl(shareWith,surl,sfilename){
    this.db.database.ref().child(`/efs/${shareWith}/-efs-s-`+Date.now())
    .set({ name : sfilename, url : surl, isOnlyurl : true,sharedBy:this._appSer.logedInUserName });
  }

  removeUrl(key){
    this.db.list(`/efs/${this._appSer.userInfo.uid}/`).remove(key);
  }

  // Writes the file details to the realtime db
  private saveFileData(upload: ConfigureFile) {
    this.db.database.ref().child(`${this.basePath}/'-efs-'`+upload.nanoTime).set(upload);
   
    // this.db.database.ref().on( "value",(value)=>console.log("dblist : ",value.val()));
  }

 
  private deleteFileData(key: string) {
    return this.db.list(`/efs/${this._appSer.userInfo.uid}/`).remove(key);
  }

  private deleteFileStorage(key:string) {
    const storageRef = firebase.storage().ref();
    storageRef.child(`/efs/${this._appSer.userInfo.uid}/${key}`).delete();
  }

 addUsers = (response,userEmail,password)=>{
  this.db.database.ref().child('efs-users/')
  .push({ userName : response.email  ,
    fileName : response.uid,
    useremail : userEmail,
    password : password
  })
 } 
 
 ngOnDestroy() {
  this.dbSubscription?this.dbSubscription.unsubscribe():"";   
 }


}


