import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedModule} from '../shared/shared.module';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {UserEditorComponent} from './users-editor.component';
import {UserTableComponent} from './users-table.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {Ng2SmartTableModule} from 'ng2-smart-table';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    NgSelectModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    CommonModule,
    Ng2SmartTableModule
  ],
  exports: [UserEditorComponent, UserTableComponent],
  declarations: [UserEditorComponent, UserTableComponent]
})

export class UserModule {
}