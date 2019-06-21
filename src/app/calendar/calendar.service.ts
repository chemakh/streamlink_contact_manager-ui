import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable, Subject} from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class CalendarService implements Resolve<any> {
  events: any;
  onEventsUpdated: Subject<any>;

  /**
   * Constructor
   *
   * @param {HttpClient} _httpClient
   */
  constructor(
    private _httpClient: HttpClient) {
    // Set the defaults
    this.onEventsUpdated = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Resolver
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {Observable<any> | Promise<any> | any}
   */
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.all([
        this.getEvents()
      ]).then(
        ([events]: [any]) => {
          resolve();
        },
        reject
      );
    });
  }

  /**
   * Get events
   *
   * @returns {Promise<any>}
   */

  getAllEvents() {
    return this._httpClient.get('http://localhost:9090/ws/time_line/all').pipe(
      map(this.extractData)
    );
  }

  getEventByRef(ref: string) {
    return this._httpClient.get('http://localhost:9090/ws/time_line?ligneTempsReference='+ref).pipe(
      map(this.extractData)
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }
  getEvents(): Promise<any> {
    return new Promise((resolve, reject) => {

      this._httpClient.get('http://localhost:9090/ws/time_line/all')
        .subscribe((response: any) => {
          this.events = response.data;

          this.onEventsUpdated.next(this.events);

          resolve(this.events);
        }, reject);
    });
  }

  /**
   * Update events
   *
   * @param events
   * @returns {Promise<any>}
   */
  updateEvents(events): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient.post('api/calendar/events', {
        id: 'events',
        data: [...events]
      })
        .subscribe((response: any) => {
          this.getEvents();
        }, reject);
    });
  }


  deleteEvent(event){
    return this._httpClient.delete("http://localhost:9090/ws/time_line?ligneTempsReference="+event.reference);
  }

}