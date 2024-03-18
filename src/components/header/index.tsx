import { AppBar, Toolbar, IconButton, Typography, Stack, Tooltip, Zoom } from "@mui/material";
import {Architecture, Home, Newspaper, Settings, Style, AdminPanelSettings } from "@mui/icons-material";
import useAuth from "../../contexts/useAuth";
import { useRouter } from "next/router";
import Image from "next/image";
import AccountMenu from "./accountMenu";
const Header = () => {
    const { user } = useAuth();
    const router = useRouter();
    return (
        <>
            {user && (
                <AppBar sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
                    <Toolbar>
                        <Image
                            className="cursor-pointer"
                            src="/assets/images/logo.png"
                            width={100}
                            height={60}
                            onClick={() => router.push("/")}
                            alt={""}
                        />

                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="center"
                            spacing={4}
                            sx={{ flexGrow: 1 }}
                        >
                            <Tooltip arrow title="Home" TransitionComponent={Zoom} >
                                <IconButton size="large" edge="start" color="primary" onClick={() => router.push("/")}>
                                    <Home fontSize="large" sx={{ color: "black" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Architects" TransitionComponent={Zoom} onClick={() => router.push("/architects")}>
                                <IconButton size="large" edge="start" color="primary">
                                    <Architecture fontSize="large" sx={{ color: "black" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Architecture Styles" TransitionComponent={Zoom} onClick={() => router.push("/architecture-styles")}>
                                <IconButton size="large" edge="start" color="primary">
                                    <Style fontSize="large" sx={{ color: "black" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Architecture Period" TransitionComponent={Zoom} onClick={() => router.push("/architecture-periods")}>
                                <IconButton size="large" edge="start" color="primary">
                                    <Newspaper fontSize="large" sx={{ color: "black" }} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip arrow title="Admin panel" TransitionComponent={Zoom} onClick={() => router.push("/admin")}>
                                <IconButton size="large" edge="start" color="primary">
                                    <AdminPanelSettings fontSize="large" sx={{ color: "black" }} />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                        <IconButton size="large" edge="start" color="primary" aria-label="menu">
                            <Settings fontSize="large" sx={{ color: "black" }} />
                        </IconButton>
                        <AccountMenu />
                    </Toolbar>
                </AppBar>
            )}
        </>
    );
};

export default Header;
