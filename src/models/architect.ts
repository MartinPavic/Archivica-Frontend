import { Model } from "./model";

export interface Architect extends Model {
	firstName: string;
	lastName: string;
	yearBorn: number;
	yearDied?: number;
	countryId: string;
}