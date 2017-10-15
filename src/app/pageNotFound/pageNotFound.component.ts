import { Component, OnInit, OnChanges, SimpleChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit,AfterViewChecked } from '@angular/core';
import { Observable } from "rxjs/Rx";

@Component({
  selector: 'app-pageNotFound',
  templateUrl: './pageNotFound.component.html',
  styleUrls: ['./pageNotFound.component.css']
})
export class PageNotFoundComponent implements AfterContentInit, DoCheck, 
OnInit , OnChanges , AfterContentChecked, AfterViewInit, AfterViewChecked{
  onInputUp="1";
  hookMessage = [];


  constructor() { console.log(this.hookMessage.push("constructor"),this.onInputUp) }
  //    -----------LifeCyle - Hooks----------------
  
  ngOnChanges(changes: SimpleChanges) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    console.log(this.hookMessage.push("onchane"),this.onInputUp)

  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log(this.hookMessage.push("onInit"),this.onInputUp)
    
  }
  ngDoCheck() {
   //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
   //Add 'implements DoCheck' to the class.
   console.log(this.hookMessage.push("docheck"),this.onInputUp)
   
  }
  ngAfterContentInit() {
   //Called after ngOnInit when the component's or directive's content has been initialized.
   //Add 'implements AfterContentInit' to the class.
   console.log(   this.hookMessage.push("contentInit"),this.onInputUp)

  }
  ngAfterContentChecked() {
   //Called after every check of the component's or directive's content.
   //Add 'implements AfterContentChecked' to the class.
   console.log(   this.hookMessage.push("contentchecked"),this.onInputUp)

  }
  ngAfterViewInit() {
   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
   //Add 'implements AfterViewInit' to the class.
   console.log( this.hookMessage.push("afterviewInit"),this.onInputUp)
  }
  ngAfterViewChecked() {
   //Called after every check of the component's view. Applies to components only.
   //Add 'implements AfterViewChecked' to the class.
   console.log(   this.hookMessage.push("viewchecked"),this.onInputUp)

  }
  ngOnDestroy() {
   //Called once, before the instance is destroyed.
   //Add 'implements OnDestroy' to the class.
   console.log(   this.hookMessage.push("desstroyed"),this.onInputUp)

  }
 
}
// var RxOb = Observable.create((observer) =>
//   setInterval( () => observer.next(1),1000)).
//   scan((x,val)=>x+val,0).throttleTime(2000).map(val=>val/2).take(20)



// RxOb.subscribe(x => console.log(x));
// RxOb.subscribe(x => console.log("s",x));
// RxOb.unsbscribe();
