export interface Filter {
	property: string;
	operator: "$lt" | "$eq" | "$gt" | "$lte" | "$gte";
	value: string;
}

export interface Sort {
	property: string;
	operator: "asc" | "desc";
}

export interface FilterPageSortLimit {
	filters: Filter[], 
	page: number,
	sort: Sort,
	limit: number,
}
