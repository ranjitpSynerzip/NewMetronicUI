import { ProjectgroupModel } from './../../../shared/models/projectgroup-model';
import { ProjectGroupService } from './../../../shared/Services/project-group.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'kt-project-group',
  templateUrl: './project-group.component.html',
  styleUrls: ['./project-group.component.scss']
})
export class ProjectGroupComponent implements OnInit {

	APIUrl = environment.baseUrl;

	selectedArchitect = null;
	selectedProManager = null;
	selectedEACStatus = null;
	selectedPBStatus = null;
	selectedRStatus = null;
	IsHidden = true;
	Statues = [];
	contacts = [];
	companies = [];
	projectObj = new ProjectgroupModel();

  constructor(private service: ProjectGroupService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
	this.service.getStatus().subscribe(data => {
		this.Statues = data;
		console.log(this.Statues);
	  });

	  this.service.getContacts().subscribe(data => {
		this.contacts = data;
		console.log(this.contacts);
	  });

	  this.service.getCompanies().subscribe(data => {
		this.companies = data;
		console.log(this.companies);
	  });

  }

  onSelect() {
	this.IsHidden = !this.IsHidden;
}

  onSaveButton() {
	  debugger;
	//this.projectObj.projectGroupId = 0;
	this.projectObj.createdDate = new Date();
	this.projectObj.createdBy = 1;
	this.projectObj.pmId = this.selectedProManager;
	this.projectObj.aorId = this.selectedArchitect;
	this.projectObj.isDeleted = false;

    this.service.postProjectGroup(this.projectObj).subscribe(
      success => {
        console.log("Project Group Added", true);
        //this.router.navigateByUrl('/projects/projectlist');

      },
      error => {
        console.log("Project Group Added", false);
      }
    );

  }




}
