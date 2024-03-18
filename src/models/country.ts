import { Model } from "./model";

export interface Country extends Model {
	id: number;
	name: string;
	continentId: string;
}