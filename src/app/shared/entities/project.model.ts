import {User} from './user.model';
import {SocietyContact} from './society-contact.model';

export class Project {

  reference: string;
  title: string;
  service: string;
  managerReference: string;
  rhReference: string;
  societyContactReference: string;
  type: string;
  stage: string;
  note: string;
  createdDate: Date;
  modifiedDate: Date;
}

export class ProjectInformation {
  projectReference: string;
  activityArea: string;
  place: string;
  durationByMonth: number;
  currency: string;
  budget: number;
  startingDate: Date;
  responseDate: Date;
  closingDate: Date;

}

export class ProjectView {

  reference: string;
  title: string;
  manager: User;
  rh: User;
  client: string;
  societyContact: SocietyContact;
  type: string;
  stage: string;
  note: string;
  activityArea: string;
  place: string;
  durationByMonth: number;
  currency: string;
  budget: number;
  startingDate: Date;
  responseDate: Date;
  closingDate: Date;
  createdDate: Date;
  modifiedDate: Date;
}
