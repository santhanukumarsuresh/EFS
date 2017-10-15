import { environment } from '../../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';


export const firebaseConfig = environment.firebaseConfig;

export const AngularFireBaseModule = [ AngularFireModule.initializeApp(firebaseConfig),
                                       AngularFireDatabaseModule,
                                       AngularFireAuthModule
                                     ];

