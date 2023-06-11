export interface Filter {
	property: string;
	operator: "$lt" | "$eq" | "$gt" | "$lte" | "$gte";
	value: string;
}

export interface FilterPageSortLimit {
	filters: Filter[], 
	page: number,
	sort: "asc" | "desc",
	limit: number,
}
