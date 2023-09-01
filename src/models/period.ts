import { Model } from "./model";

export interface Period extends Model {
	name: string;
    synonym: string;
    start: {
		year: number;
		unit: "AD" | "BC";
	};
	end: {
		year: number;
		unit: "AD" | "BC";
	};
    stillActive?: boolean;

}