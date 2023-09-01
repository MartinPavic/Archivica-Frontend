import { Model } from "./model";

export interface Country extends Model {
	name: string;
	continentId: string;
}