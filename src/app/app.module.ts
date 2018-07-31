import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';//FOrms Module not needed

import { AppComponent } from './app.component';

//Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { environment } from '../environments/environment';

//Components
import { FormInfoComponent } from './components/form-info/form-info.component';
import { ListInfoComponent } from './components/list-info/list-info.component';
import { PersonaComponent } from './components/persona/persona.component';
import { RouterModule } from '@angular/router';


//Services 
import { PersonaService } from './services/persona.service';

@NgModule({
  declarations: [
    AppComponent,
    FormInfoComponent,
    ListInfoComponent,
    PersonaComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),//Recibe como parámetro la configuración
    AngularFireDatabaseModule,
    RouterModule.forRoot([
      { path: 'registro', component: FormInfoComponent },
      { path: 'lista', component: ListInfoComponent },
      { path: '', redirectTo: 'lista', pathMatch: 'full' },
      { path: '**', redirectTo: 'registro', pathMatch: 'full' }
    ])
  ],
  providers: [
    PersonaService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
