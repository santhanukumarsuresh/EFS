import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { pageLoaderModule } from './modules/pageLoder';
import { FlexLayoutModule } from "@angular/flex-layout";
import 'hammerjs';
import { AppRoutingModule, routingComponents} from './modules/appRoute.routing'
import { animationModule, materialModule} from './modules/animationMaterial'
import { AngularFireBaseModule } from "./modules/angularFireBase";
import { FormsModule , ReactiveFormsModule} from '@angular/forms'

import { AppComponent } from './app.component';
import { PopUpComponent } from './popUp/popUp.component'; 

import { AppService } from './services/app.service';
import { FirebaseAuthService } from "./services/firebaseAuth.service";
import { FileUploadService } from "./services/fileUpload.service";
import { DragDropDirective } from "./customDirective/dragDrop.directive";




@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PopUpComponent,
    DragDropDirective
],
  imports: [
    BrowserModule,
    pageLoaderModule,
    FlexLayoutModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    animationModule,
    materialModule,
    AngularFireBaseModule
  ],
  entryComponents: [
    PopUpComponent
  ],
  providers: [AppService,FirebaseAuthService,FileUploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
