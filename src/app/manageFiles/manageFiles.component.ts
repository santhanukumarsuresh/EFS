import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

import * as _ from "lodash";
import { ConfigureFile } from "./configureFile";
import { FileUploadService } from "../services/fileUpload.service";
import { FirebaseListObservable } from 'angularfire2/database';
import { FirebaseAuthService } from "../services/firebaseAuth.service";
import { Observable, Subscription } from 'rxjs/Rx'
import { MdDialog } from "@angular/material";
import { PopUpComponent } from "../popUp/popUp.component";


@Component({
  selector: 'app-manageFiles',
  templateUrl: './manageFiles.component.html',
  styleUrls: ['./manageFiles.component.css']
})
export class ManageFilesComponent implements OnInit,OnDestroy {

  selectedFiles: FileList;
  private selectedFileList: any[]=[];
  ConfigureSelectedFile: ConfigureFile;
  uploads : FirebaseListObservable<ConfigureFile[]>;
  private popUpsubscription: Subscription;
  private dragDropzoneActive:boolean = false;
  private isAddFiles:boolean = false;

   constructor(  private _appSer:AppService,
                 private _fileUploadSer : FileUploadService,
                 private _authSer : FirebaseAuthService,
                 private router : Router,
                 public dialog: MdDialog) { 
               }
   
   ngOnInit() {
     this._authSer.getUserCurrentStatus();
     this._fileUploadSer.getUsers()
     
    // this._appSer.logedInUserName = this._appSer.userInfo &&  this._appSer.userInfo.email ?this._appSer.userInfo.email:this.router.navigate(['login']) ;      
     // this._fileUploadSer.getUploads({limitToLast: 5}).subscribe((res)=> console.log(res));
   }
   
  
   toggleManageFile(){
     this.isAddFiles=!this.isAddFiles;
   }

   removeSelectedFile(file){
    file ? this.selectedFileList.splice(this.selectedFileList.indexOf(file),1): this.selectedFileList=[];
   }

   detectFiles(event) {
       this.selectedFiles = event.target.files;
        for (let key in this.selectedFiles) {
          if(this.selectedFiles.hasOwnProperty(key))
          this.selectedFileList.push(this.selectedFiles[key]);
        }
   }
 
   confirmDelete(title,key) {
     this.popUpsubscription= this.dialog.open(PopUpComponent,{
     width: "454px",
     height: "214px",
     disableClose : false,
     direction : "ltr",
     hasBackdrop : true,
     data : {
       title : title,
       content : "Are you sure?"
     }
     }).afterClosed().subscribe((response)=>{ 
       console.log("popUpResponse",response),
       response===true?this._fileUploadSer.deleteUpload(key):""});
   }
 
  
  //  drogDropzoneState($event: boolean) {
  //   this.dragDropzoneActive = $event;
  // }

  // uploadDroppedFiles(event){
  //   this.selectedFiles = event;
  //   for (let key in this.selectedFiles) {
  //     if(this.selectedFiles.hasOwnProperty(key))
  //     this.selectedFileList.push(this.selectedFiles[key]);
  //   }
  // }
 
   uploadAll(){
    for (let key in this.selectedFiles) {
           if(this.selectedFiles.hasOwnProperty(key))
           this.upload(this.selectedFiles[key]);
         }
         
   }

   upload(selectedFile) {
     let file = selectedFile
     if(!file) return;
     this.ConfigureSelectedFile = new ConfigureFile(file);
     this._fileUploadSer.pushUpload(this.ConfigureSelectedFile);
     this.removeSelectedFile(file);
    
    

    //  if (_.isEmpty(file)) return;
    //  let filesIndex = _.range(files.length)
    //    _.each(filesIndex, (idx) => {
    //    this.ConfigureSelectedFile = new ConfigureFile(files[idx]);
    //    this._fileUploadSer.pushUpload(this.ConfigureSelectedFile)}
    //  )
   }
  

 ngOnDestroy() {
  this.popUpsubscription?this.popUpsubscription.unsubscribe():"";
 }

}
