import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef} from '@angular/material'

@Component({
  selector: 'app-popUp',
  templateUrl: './popUp.component.html',
  styleUrls: ['./popUp.component.css']
})
export class PopUpComponent implements OnInit {

  constructor( @Inject(MD_DIALOG_DATA) public data: any,
                public dialogRef: MdDialogRef<PopUpComponent>) { }
   popUpData;
  ngOnInit() {
    this.popUpData = this.data;
  }

}
