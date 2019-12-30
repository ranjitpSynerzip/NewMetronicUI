import { Component, OnInit } from '@angular/core';
import { ProjectModel } from "../../../shared/models/project-model.module";
import { ProjectService } from "../../../shared/Services/project.service";

@Component({
  selector: 'kt-project-group-details',
  templateUrl: './project-group-details.component.html',
  styleUrls: ['./project-group-details.component.scss']
})
export class ProjectGroupDetailsComponent implements OnInit {

	projectObj = new ProjectModel();
	projectId: number;
	IsHidden = true;

	constructor(private service: ProjectService) {}

	ngOnInit() {
		this.service.getProjectbyID(7).subscribe(data => {
			this.projectObj = data;
			console.log("getProject", this.projectObj);
		});
	}

	onSelect() {
		this.IsHidden = !this.IsHidden;
	}

}
