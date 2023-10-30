import { Model } from "./model";

export interface ArchitecturePeriod extends Model {
	name: string;
	synonyms: string[];
	start: {
		year: number;
		unit: "AD" | "BC"
	},
	end: {
		year: number;
		unit: "AD" | "BC"
	},
	stillActive: boolean;
}	