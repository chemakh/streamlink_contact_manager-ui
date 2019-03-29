import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Positioning} from '../shared/entities/positioning.model';
import {PositioningService} from '../shared/services/positioning.service';
import {NgForm} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {ProjectService} from '../shared/services/project.service';
import {Project} from '../shared/entities/project.model';
import {ResourceService} from '../shared/services/resource.service';
import {UserService} from '../shared/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-positioning-edit',
  templateUrl: './positioning-edit.component.html',
  styleUrls: ['./positioning-edit.component.css']
})
export class PositioningEditComponent implements OnInit {


  editing = false;
  positioning: Positioning = new Positioning();
  project: Project = new Project();

  users: any[];
  stages: any[];
  projects: any = [];
  resources: any = [];


  constructor(private router: Router,
              private route: ActivatedRoute,
              private service: PositioningService,
              private resourceService: ResourceService,
              private projectService: ProjectService,
              private userService: UserService,
              private toastr: ToastrService
  ) {
  }


  ngOnInit() {

    this.userService.getUsers().subscribe(response => {
      this.users = response;
    });

    this.stages = [
      {label: 'Tous', value: ''},
      {label: 'Non definie', value: 'NOT_DEFINED'},
      {label: 'En attente', value: 'Waiting'},
      {label: 'Présenter au client', value: 'PresentedToClient'},
      {label: 'Envoye CV', value: 'SendingCV'},
      {label: 'Rejeter', value: 'Rejected'},
      {label: 'Gagné', value: 'Won'},
      {label: 'Positionné', value: 'Positioned'}];

    let ref = this.route.snapshot.params.reference;
    console.log(this.route);

    this.service.getPositioning(ref).subscribe(res => {
      this.positioning = res;
      this.positioning.projectReference = res.projectReference;
      console.log(this.positioning.projectReference);

    });
    this.projectService.getProjects().subscribe(res => {
      this.projects = res;

    });

    this.resourceService.getResources().subscribe(res => {
      let ress: any[];
      ress = res;
      ress.map((i) => {
        i.fullName = i.firstname + ' ' + i.lastname;
        return i;
      });
      this.resources = ress;
    });


  }

  updatePostioning(form: NgForm) {
    this.service.updatePositioning(this.positioning, this.positioning.reference).subscribe(res => {
      this.positioning = res;
      Swal.fire('Données Mise à jour avec succés', 'Opération Réussite!', 'success');
      this.toastr.success('Données Mise à jour avec succés', 'Opération Réussite!');
      this.router.navigateByUrl('/positionings');

    }, error => {
      Swal.fire('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!', 'error');
      this.toastr.error('Erreur lors de la modification de du Positionnement', 'Opération échoué !!!');
    });
  }

}
