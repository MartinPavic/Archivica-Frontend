export interface Period {
	_id: string;
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