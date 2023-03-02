import React from "react";
import FilterListRoundedIcon from "@mui/icons-material/FilterListRounded";
import Button from "@mui/material/Button";

import Sidebar from "../src/components/sidebar";
import Table from "../src/components/table";
import RoundSelect from "../src/components/UI/roundSelect";
import YearFilter from "../src/components/filtering/yearFilter";

import homeStyle from "../src/styles/Home.module.scss";
import archStyle from "../src/styles/Architects.module.scss";

const selectData = [
    {
        title: "Continent",
        items: [
            { id: 1, title: "Africa" },
            { id: 2, title: "Asia" },
            { id: 3, title: "Europe" },
        ],
    },
    {
        title: "Country",
        items: [
            { id: 1, title: "England" },
            { id: 2, title: "Croatia" },
            { id: 3, title: "France" },
        ],
    },
    {
        title: "City",
        items: [
            { id: 1, title: "Vienna" },
            { id: 2, title: "London" },
            { id: 3, title: "Amsterdam" },
        ],
    },
    {
        title: "Style",
        items: [
            { id: 1, title: "Dark Age Europe" },
            { id: 2, title: "Modern Europe" },
            { id: 3, title: "Post Modern Europe" },
        ],
    },
    {
        title: "Purpose",
        items: [
            { id: 1, title: "Military" },
            { id: 2, title: "Presidential" },
            { id: 3, title: "Sport" },
        ],
    },
];

const originalData = [
    {
        architect: "Álvaro Siza",
        continent: "Africa",
        country: "France",
        city: "Vienna",
        style: "Dark Age Europe",
        purpose: "sport",
    },
    {
        architect: "Antoine Predock",
        continent: "US",
        country: "France",
        city: "Vienna",
        style: "Dark Age Europe",
        purpose: "sport",
    },
    {
        architect: "Ben van Berkel",
        continent: "NL",
        country: "France",
        city: "Vienna",
        style: "Dark Age Europe",
        purpose: "sport",
    },
    {
        architect: "Bernard Tschumi",
        continent: "CH",
        country: "Croatia",
        city: "Vienna",
        style: "Dark Age Europe",
        purpose: "sport",
    },
];

const Architects = () => {
    const [data, setData] = React.useState(originalData);
    const [searchValues, setSearchValues] = React.useState({
        architect: "",
        continent: "",
        country: "",
        city: "",
        style: "",
        purpose: "",
    });

    const handleSelectChange = (title: string, value: string) => {
        setSearchValues({ ...searchValues, [title]: value });
    };

    const renderSelectOptions = selectData.map((select) => (
        <RoundSelect key={select.title} title={select.title} items={select.items} onChange={handleSelectChange} />
    ));

    const handleApply = () => {
        const newData = originalData.filter((item) => {
            if (
                (searchValues.architect.toLocaleLowerCase() === item.architect.toLocaleLowerCase() ||
                    searchValues.architect === "") &&
                (searchValues.continent.toLocaleLowerCase() === item.continent.toLocaleLowerCase() ||
                    searchValues.continent === "") &&
                (searchValues.country.toLocaleLowerCase() === item.country.toLocaleLowerCase() ||
                    searchValues.country === "") &&
                (searchValues.city.toLocaleLowerCase() === item.city.toLocaleLowerCase() || searchValues.city === "") &&
                (searchValues.style.toLocaleLowerCase() === item.style.toLocaleLowerCase() ||
                    searchValues.style === "") &&
                (searchValues.purpose.toLocaleLowerCase() === item.purpose.toLocaleLowerCase() ||
                    searchValues.purpose === "")
            ) {
                return item;
            }
        });
        setData(newData);
    };

    return (
        <>
            <div className={homeStyle.left}>
                <Sidebar />
            </div>
            <div className={[homeStyle.right, archStyle.right].join(" ")}>
                <div className={archStyle.right_wrapper}>
                    <FilterListRoundedIcon /> Filter items
                </div>
                <div className={archStyle.right_select}>{renderSelectOptions}</div>
                <div className={archStyle.right_filter}>
                    <div className={archStyle.right_filter_year}>
                        <YearFilter />
                    </div>
                    <Button variant="contained" sx={{ borderRadius: "50px" }} onClick={() => handleApply()}>
                        Apply
                    </Button>
                </div>
                <Table data={data} />
            </div>
        </>
    );
};

export default Architects;
