import {ActionEditorComponent} from './action/action-editor.component';
import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {AuthComponent} from './auth/auth.component';
import {AuthGuard, LoginGuard} from './auth/auth.guard';
import {AuthInterceptor} from './auth.interceptor';
import {AuthModule} from './auth/auth.module';
import {DeveloperTableComponent} from './developer/developer-table.component';
import {DeveloperModule} from './developer/developer.module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {AppNavbarComponent} from './app-navbar/app-navbar.component';
import {ContactEditorComponent} from './contact/contact-editor.component';
import {ContractEditorComponent} from './contract/contract-editor.component';
import {DeveloperEditorComponent} from './developer/developer-editor.component';
import {DeveloperComponent} from './developer/developer.component';
import {PersonalInfoEditorComponent} from './developer/personal-info-editor.component';
import {SkillsEditorComponent} from './developer/skills-editor.component';
import {EvaluationEditorComponent} from './evaluation/evaluation-editor.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ToastrModule} from 'ngx-toastr';
import {DeveloperCVScannerComponent} from './developer/developer-cv-scanner.component';
import {LoaderModule} from './loader/loader.module';
import {SocietyModule} from './society/society.module';
import {SocietyTableComponent} from './society/society-table.component';
import {SocietyEditorComponent} from './society/society-editor.component';
import {SocietyComponent} from './society/society.component';
import {SocietyContactTableComponent} from "./society-contact/society-contact-table.component";
import {SocietyContactModule} from "./society-contact/society-contact.module";
import {SocietyContactEditorComponent} from "./society-contact/society-contact-editor.component";
import {SocietyContactComponent} from "./society-contact/society-contact.component";


registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent
  ],
  imports: [
    BrowserModule, DeveloperModule, AuthModule, SocietyContactModule,
    HttpClientModule, LoaderModule, SocietyModule,
    ToastrModule.forRoot(),
    RouterModule.forRoot([
      {path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
      {
        path: 'developers', component: DeveloperTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developers/create/from-cv', component: DeveloperCVScannerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developers/create', component: DeveloperEditorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developers/:error', component: DeveloperTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'developers/:mode/:reference', component: DeveloperComponent, canActivate: [AuthGuard],
        children: [
          {path: 'general', component: DeveloperEditorComponent},
          {path: 'contact', component: ContactEditorComponent},
          {path: 'skills', component: SkillsEditorComponent},
          {path: 'personal-info', component: PersonalInfoEditorComponent},
          {path: 'contract', component: ContractEditorComponent},
          {path: 'action', component: ActionEditorComponent},
          {path: 'evaluation', component: EvaluationEditorComponent},
          {path: '**', redirectTo: 'general'}
        ]
      },
      {
        path: 'societies', component: SocietyTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'societies/create', component: SocietyEditorComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'societies/:error', component: SocietyTableComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'societies/:mode/:reference', component: SocietyComponent, canActivate: [AuthGuard],
        children: [
          {path: 'general', component: SocietyEditorComponent},
          {path: 'contact', component: ContactEditorComponent},
          {path: 'action', component: ActionEditorComponent},
          {path: 'contacts', component: SocietyContactTableComponent},
          {path: 'contacts/create', component: SocietyContactEditorComponent},
          {path: 'contacts/:error', component: SocietyContactTableComponent},
          {
            path: 'contacts/:mode/:societyContactReference', component: SocietyContactComponent,
            children: [
              {path: 'general', component: SocietyContactEditorComponent},
              {path: 'contact', component: ContactEditorComponent},
              {path: 'action', component: ActionEditorComponent},
              {path: '**', redirectTo: 'general'}
            ]
          },
          {path: '**', redirectTo: 'general'}
        ]
      },
      {path: '**', redirectTo: '/developers'}
    ])
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }, {provide: LOCALE_ID, useValue: 'fr'}
  ], bootstrap: [AppComponent]
})
export class AppModule {
}
