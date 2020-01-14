import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CampusManagementService } from '../../../shared/Services/campus-management.service';
import { ChartModel } from '../../../shared/models/chart.model';


@Injectable()

export class CollegeDashboardResolver implements Resolve<ChartModel[]> {
    constructor(private service: CampusManagementService, ) { }
    dataSource: ChartModel[];

    resolve(route: ActivatedRouteSnapshot): Observable<ChartModel[]> {
        return this.service.getCampusNew();
    }

}
