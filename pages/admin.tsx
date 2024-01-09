import { Box, Container, Tab, Tabs, Typography } from "@mui/material";
import { NextPage } from "next";
import background from "../assets/images/buildings.jpg";
import { useState } from "react";
import { TabPanel } from "@mui/lab";
import Architects from "./architects";
import ArchitectureStyles from "./architecture-styles";
import ArchitecturePeriods from "./architecture-periods";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}
const Admin: NextPage = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    return (
        <Box
            className="no-scrollbar w-full h-screen flex justify-center px-12"
            sx={{ backgroundImage: `url(${background.src})`, minHeight: "400px", backdropFilter: "blur(4.7px)" }}
        >
            <Container className="no-scrollbar relative top-16 overflow-y-scroll">
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Architects" {...a11yProps(0)} />
                    <Tab label="Styles" {...a11yProps(1)} />
                    <Tab label="Periods" {...a11yProps(2)} />
                </Tabs>
                <CustomTabPanel value={value} index={0}>
                    <Architects isAdminPage={true} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <ArchitectureStyles isAdminPage={true}/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={2}>
                    <ArchitecturePeriods isAdminPage={true}/>
                </CustomTabPanel>
            </Container>
        </Box>
    );
};

export default Admin;
