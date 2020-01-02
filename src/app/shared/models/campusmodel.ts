export class Campusgridmodel {
	public campusId: number;
	public clientId: number;
	public campusName: string;
	public clientName: string;
	public districtId: number;
	public districtName: string;
	public displayOrder: number;
	public createdById: number;
	public createdByName: string;
	public createdDate: Date;
	public modifiedById: number;
	public modifiedDate: Date;
	public campusIsDeleted: boolean;
	public accountCode: number;

}


export class Campusmodel {
	public campusId: number;
	public clientId: number;
	public campusName: string;
	public districtId: number;
	public displayOrder: number;
	public createdBy: number;
	public createdDate: Date;
	public modifiedBy: number;
	public modifiedDate: Date;
	public isDeleted: boolean;
	public accountCode: number;

}
