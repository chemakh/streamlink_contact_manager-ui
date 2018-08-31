import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../environments/environment';
import {Action} from '../entities/action.model';
import {HttpClient, HttpParams} from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {LoaderService} from "./loader.service";


@Injectable()
export class ActionService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getActions(developerReference: string): Observable<Action[]> {
    this.loaderService.show();
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference)};


    return this.http.get<Action[]>(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


  createAction(action: Action, developerReference: string): Observable<Action> {
    this.loaderService.show();
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference)};

    return this.http.post<Action>(url, action, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  updateAction(action: Action, reference: string, developerReference: string): Observable<Action> {
    this.loaderService.show();
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http.put<Action>(url, action, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  deleteAction(reference: string, developerReference: string) {
    this.loaderService.show();
    const url = environment.API + '/ws/developers/actions';

    const options = {params: new HttpParams().set('developerReference', developerReference).set('reference', reference)};


    return this.http.delete(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  getSocietyActions(societyContactReference: string, societyReference: string): Observable<Action[]> {
    this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';


    if (societyContactReference == null) {
      const options = {
        params: new HttpParams().set('societyReference', societyReference)
      };

      return this.http.get<Action[]>(url, options)
        ._finally(() => {
          this.loaderService.hide();
        });
    } else {
      const options = {
        params: new HttpParams().set('societyContactReference', societyContactReference)
          .set('societyReference', societyReference)
      };

      return this.http.get<Action[]>(url, options)
        ._finally(() => {
          this.loaderService.hide();
        });
    }
  }


  createSocietyAction(action: Action, societyContactReference: string, societyReference: string): Observable<Action> {
    this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference)
    };
    return this.http.post<Action>(url, action, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }

  updateSocietyAction(action: Action, reference: string, societyContactReference: string, societyReference: string): Observable<Action> {
    this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    if (societyContactReference != null) {
      const options = {
        params: new HttpParams().set('societyContactReference', societyContactReference)
          .set('societyReference', societyReference).set('reference', reference)
      };

      return this.http.put<Action>(url, action, options)
        ._finally(() => {
          this.loaderService.hide();
        });
    } else {
      const options = {
        params: new HttpParams().set('societyReference', societyReference).set('reference', reference)
      };

      return this.http.put<Action>(url, action, options)
        ._finally(() => {
          this.loaderService.hide();
        });

    }
  }

  deleteSocietyAction(reference: string, societyContactReference: string, societyReference: string) {
    this.loaderService.show();
    const url = environment.API + '/ws/societies/contacts/actions';

    const options = {
      params: new HttpParams().set('societyContactReference', societyContactReference)
        .set('societyReference', societyReference).set('reference', reference)
    };


    return this.http.delete(url, options)
      ._finally(() => {
        this.loaderService.hide();
      });
  }


}
