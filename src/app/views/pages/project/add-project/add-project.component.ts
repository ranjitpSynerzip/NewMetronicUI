import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { ProjectModel } from '../../../../shared/models/project-model.module';
import { ProjectService } from '../../../../shared/Services/project.service';


@Component({
  selector: 'kt-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})


export class AddProjectComponent implements OnInit {

  APIUrl = environment.baseUrl;
  frontendVersion = '';

  Statues = [];
  companies = [];
  contacts = [];
  activities = [];
  projectObj = new ProjectModel();
  selectedStatus = null;
  selectedCompany = null;
  selectedContact = null;
  selectedActivity = null;
  selectedBondSeries = null;
  selectedFundLocation = null;
  selectedOrgCode = null;
  selectedBondFundCategory = null;
  selectedContactFordisAcc = null;
  selectedContactForDisAcc = null;
  selectedContactprmgr = null;
  selectedContactfimgr = null;
  selectedContactdofcon = null;
  selectedContactpm = null;
  selectedContactcm = null;
  selectedCompanycm = null;
  selectedContactior = null;
  selectedCompanyior = null;
  selectedContactaor = null;
  selectedCompanyaor = null;
  selectedContactgc = null;
  selectedCompanygc = null;

  BondSeries = [
    { id: 1, name: 'Bond Series 1' },
    { id: 2, name: 'Bond Series 2' },
    { id: 3, name: 'Bond Series 3' },
    { id: 4, name: 'Bond Series 4' },
    { id: 5, name: 'Bond Series 5' },
  ];
  FundLocation = [
    { id: 1, name: 'Fund Location 1' },
    { id: 2, name: 'Fund Location 2' },
    { id: 3, name: 'Fund Location 3' },
    { id: 4, name: 'Fund Location 4' },
    { id: 5, name: 'Fund Location 5' },
  ];

  OrgCode = [
    { id: 1, name: 'Org Code 1' },
    { id: 2, name: 'Org Code 2' },
    { id: 3, name: 'Org Code 3' },
    { id: 4, name: 'Org Code 4' },
    { id: 5, name: 'Org Code 5' },
  ];

  BondFundCategory = [
    { id: 1, name: 'Bond Fund Category 1' },
    { id: 2, name: 'Bond Fund Category 2' },
    { id: 3, name: 'Bond Fund Category 3' },
    { id: 4, name: 'Bond Fund Category 4' },
    { id: 5, name: 'Bond Fund Category 5' },
  ];

  loader = true;
  constructor(private service: ProjectService, private http: HttpClient) { }

  ngOnInit() {
    this.service.getStatus().subscribe(data => {
      this.Statues = data;
      console.log(this.Statues);
    });

    this.service.getCompanies().subscribe(data => {
      this.companies = data;
      console.log(this.companies);
    });

    this.service.getContacts().subscribe(data => {
      this.contacts = data;
      console.log(this.contacts);
    });

    this.service.getActivities().subscribe(data => {
      this.activities = data;
      console.log(this.activities);
    });
  }

  onSaveButton() {
    this.projectObj.projectName = "Test";
    this.projectObj.campusId = 1;
    this.projectObj.districtId = 2;
    this.projectObj.isDeleted = false;
    this.projectObj.statusId = this.selectedStatus;
    this.projectObj.activityId = this.selectedActivity;
    this.projectObj.gccompanyId = this.selectedCompanygc;
    this.projectObj.gccontactId = this.selectedContactgc;
    this.projectObj.aorcompanyId = this.selectedCompanyaor;
    this.projectObj.aorcontactId = this.selectedContactaor;
    this.projectObj.iorcompanyId = this.selectedCompanyior;
    this.projectObj.iorcontactId = this.selectedContactior;
    this.projectObj.cmcompanyId = this.selectedCompanycm;
    this.projectObj.cmcontactId = this.selectedContactcm;

    this.projectObj.pmcontactId = this.selectedContactpm;
    this.projectObj.doFcontactId = this.selectedContactdofcon;
    this.projectObj.fmcontactId = this.selectedContactfimgr;
    this.projectObj.pgmgrcontactId = this.selectedContactprmgr;
    this.projectObj.dacontactId = this.selectedContactForDisAcc;

    this.projectObj.bondFundCategoryId = this.selectedBondFundCategory;
    this.projectObj.orgCodeId = this.selectedOrgCode;
    this.projectObj.fundLocationId = this.selectedFundLocation;
    this.projectObj.bondSeriesId = this.selectedBondSeries;



    this.service.postProject(this.projectObj).subscribe(
      success => {
        console.log("Project Added", true);
        //   this.getData();
      },
      error => {
        console.log("Project Added", false);
      }
    );

  }


}
