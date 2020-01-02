import { Component, OnInit } from "@angular/core";
import { ProjectModel } from "../../../shared/models/project-model.module";
import { ProjectService } from "../../../shared/Services/project.service";

@Component({
	selector: "kt-project-details",
	templateUrl: "./project-details.component.html",
	styleUrls: ["./project-details.component.scss"]
})
export class ProjectDetailsComponent implements OnInit {
	projectObj = new ProjectModel();
	projectId: number;
	IsHidden = true;

	constructor(private service: ProjectService) {}

	ngOnInit() {
		this.service.getProjectbyID(13).subscribe(data => {
			this.projectObj = data;
			console.log("getProject", this.projectObj);
		});
	}

	onSelect() {
		this.IsHidden = !this.IsHidden;
	}
}
