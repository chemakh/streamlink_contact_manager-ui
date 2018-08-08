import {CV} from '../shared/entities/cv.model';
import {DeveloperService} from '../shared/services/developer.service';

import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  moduleId: module.id,
  templateUrl: 'developer-cv.component.html',
  selector: 'app-developer-cv'
})
export class DeveloperCVComponent {

  referenceDeveloper: string;
  fileToUpload: File = null;

  cvs: CV[];


  constructor(private router: Router,
              activeRoute: ActivatedRoute, private service: DeveloperService,
              private toastr: ToastrService,) {

    this.referenceDeveloper = activeRoute.snapshot.parent.params['reference'];

    this.service.getDeveloperCVs(this.referenceDeveloper)
      .subscribe(response => this.cvs = response
        ,
        error =>
          this.router.navigate(['/developers','error']));

  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }

  save(form: NgForm) {

    if (form.valid) {
      this.service.createDeveloperCv(this.fileToUpload, this.referenceDeveloper)
        .subscribe(data => {
          console.log(data);
          this.cvs.push(data);
          this.fileToUpload = null;
        }, error => {
          this.toastr.error('Erreur lors de la Création du CV', 'Opération échoué !!!');
        });
    }
  }


  deleteCV(index: number) {

    if (confirm('Suppression du CV')) {
      const cv = this.cvs[index];


      this.service.deleteCV(cv.reference, this.referenceDeveloper)
        .subscribe(response => {

        this.cvs.splice(index, 1);
      }, error => {
        this.toastr.error('Erreur lors de la Suppression du CV', 'Opération échoué !!!');
      });
    }
  }


}
