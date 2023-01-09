import * as React from 'react';
import { styled, useTheme  } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';

import ArchitectureIcon from '@mui/icons-material/Architecture';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import BusinessIcon from '@mui/icons-material/Business';
import PublicIcon from '@mui/icons-material/Public';
import DateRangeIcon from '@mui/icons-material/DateRange';
import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';
import PostAddIcon from '@mui/icons-material/PostAdd';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';

import FilterModal from '../../modal/filterModal';

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));


const MobileNavigation = props => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();

    return (
        <>
            <FilterModal openModal={open}/>
            <Drawer
                sx={{
                    width: 240,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 240,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="right"
                open={props.open}
            >
                <DrawerHeader>
                    <IconButton onClick={props.onClick}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <HomeIcon sx={{ width: 30, height: 30 }}/>
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PostAddIcon sx={{ width: 30, height: 30 }}/>
                        </ListItemIcon>
                        <ListItemText primary="Latest Blogs" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button>
                        <ListItemIcon>
                            <ArchitectureIcon />
                        </ListItemIcon>
                        <ListItemText primary='Architects' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <SquareFootIcon />
                        </ListItemIcon>
                        <ListItemText primary='Architectural Styles' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <BusinessIcon />
                        </ListItemIcon>
                        <ListItemText primary='Cities' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <PublicIcon />
                        </ListItemIcon>
                        <ListItemText primary='Places' />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <DateRangeIcon />
                        </ListItemIcon>
                        <ListItemText primary='Blogs' />
                    </ListItem>
                    {/* <ListItem button>
                        <ListItemIcon>
                            <CategoryIcon />
                        </ListItemIcon>
                        <ListItemText primary='Unsorted' />
                    </ListItem> */}
                    <Divider sx={{ margin: '5px 0 15px' }}>
                        <Chip label="POSTS SEARCH" />
                    </Divider>
                    <ListItem button onClick={() => setOpen(!open)} >
                        <ListItemIcon>
                            <FilterAltRoundedIcon />
                        </ListItemIcon>
                        <ListItemText primary='Advanced filter' />
                    </ListItem>
                </List>
        </Drawer>
      </>
    );
}

export default MobileNavigation;