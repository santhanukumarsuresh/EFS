import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

public showSignIn = true;
public logedInUserName="";
public userList;
public otherUserList: any[] = [];
public fileList;
public userInfo;
constructor( ) { }

}