import { useEffect, useState } from "react"
import { Country } from "../models/country"
import { useAuthenticatedRequest } from "./useRequest";
import apiService from "../services/api";

export const useCountries = () => {
	const [countries, setCountries] = useState<Country[]>([]);
	const countriesRequest = useAuthenticatedRequest({ request: apiService.getCountries });

	useEffect(() => {
		const getCountries = async () => {
			const response = await countriesRequest.call({ filters: [], sort: { property: "name", operator: "asc"}, limit: 247, page: 1 });
			setCountries(response ? response : []);
		}
		getCountries();
	}, [])

	return countries;
}