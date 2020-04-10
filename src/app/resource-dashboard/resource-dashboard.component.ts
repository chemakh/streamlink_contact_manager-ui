import { Component, OnInit } from '@angular/core';
import { PositioningService } from '../shared/services/positioning.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../shared/services/project.service';

@Component({
  selector: 'app-resource-dashboard',
  templateUrl: './resource-dashboard.component.html',
  styleUrls: ['./resource-dashboard.component.css']
})
export class ResourceDashboardComponent implements OnInit {

  test;
  headElements = ['project title', 'Client', 'Start Date', 'End Date'];
  positioning: any = [];

  constructor(private positioningService: PositioningService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private projectService: ProjectService) {

    if (activeRoute.snapshot.params['error'] === 'error') {
      // this.toastr.warning('Erreur lors de la récupération de données', 'Opération échoué!');
      this.router.navigate(['/dashboard']);
    }
  }

  ngOnInit() {

    return this.positioningService.getPositionings().subscribe((data: {}) => {
      this.positioning = data as [];
    });
  }

}
