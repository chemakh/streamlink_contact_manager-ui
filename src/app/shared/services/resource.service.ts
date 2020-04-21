import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';
import { Contact } from '../entities/contact.model';
import { CV } from '../entities/cv.model';
import { PersonalInformation } from '../entities/personal-information.model';
import { SkillsInformation } from '../entities/skills-information.model';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';


import { LoaderService } from './loader.service';
import { Resource, ResourceView } from '../entities/resource.model';
import {map} from 'rxjs/operators';


@Injectable()
export class ResourceService {

  constructor(private http: HttpClient, private loaderService: LoaderService) {
  }

  getResource(reference: string): Observable<Resource> {

    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = { params: new HttpParams().set('developerReference', reference) };

    return this.http.get<Resource>(url, options);

  }

  getResources() {
    const url = environment.API + '/ws/resources/all';
    return this.http.get(url);
  }



  createResources(resource: Resource): Observable<Resource> {

    const url = environment.API + '/ws/resources';
    return this.http.post<Resource>(url, resource);
  }

  createResourceFromDeveloper(developerReference: string): Observable<Resource> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/from_developer';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .post<Resource>(url, null, options);
  }

  updateResource(resource: Resource, reference: string): Observable<Resource> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = { params: new HttpParams().set('developerReference', reference) };


    return this.http
      .put<Resource>(url, resource, options);
  }

  deleteResource(reference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources';

    const options = { params: new HttpParams().set('developerReference', reference) };


    return this.http
      .delete(url, options)
      .pipe(map((res: HttpResponse<any>) => res.body));
  }

  getResourceSkills(developerReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/skills';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http.get<SkillsInformation>(url, options);
  }

  updateResourceSkills(skills: SkillsInformation, developerReference: string): Observable<SkillsInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/skills';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .put<SkillsInformation>(url, skills, options);
  }


  getResourceInfo(developerReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/personal_info';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this
      .http
      .get<PersonalInformation>(url, options);
  }

  updateResourceInfo(info: PersonalInformation, developerReference: string): Observable<PersonalInformation> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/personal_info';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .put<PersonalInformation>(url, info, options);
  }

  getResourceContact(developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/contact';


    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this
      .http
      .get<Contact>(url, options);
  }

  updateResourceContact(contact: Contact, developerReference: string): Observable<Contact> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/contact';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .put<Contact>(url, contact, options);
  }

  getResourceCVs(developerReference: string): Observable<CV[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this
      .http
      .get<CV[]>(url, options);
  }

  createResourceCv(fileToUpload: File, developerReference: string): Observable<CV> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const formData: FormData = new FormData();
    formData.append('cv', fileToUpload, fileToUpload.name);

    const options = { params: new HttpParams().set('developerReference', developerReference) };


    return this.http
      .put<CV>(url, formData, options);
  }

  deleteCV(reference: string, developerReference: string) {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/cv';

    const options = { params: new HttpParams().set('developerReference', developerReference).set('reference', reference) };


    return this.http
      .delete(url, options);
  }

  searchResources(term: string): Observable<ResourceView[]> {
    // this.loaderService.show();
    const url = environment.API + '/ws/resources/auto-complete';
    const options = { params: new HttpParams().set('term', term) };
    return this.http.get<ResourceView[]>(url, options);
  }


}
