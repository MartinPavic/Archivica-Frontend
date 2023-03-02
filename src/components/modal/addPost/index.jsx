import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FeedIcon from '@mui/icons-material/Feed';
import DescriptionIcon from '@mui/icons-material/Description';
import BackupIcon from '@mui/icons-material/Backup';

import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

import styles from './style.module.scss';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  width: 'auto'
};

const BootstrapInput = styled(InputBase)(({ theme }) => ({
    'label + &': {
      marginTop: theme.spacing(3),
    },
    '& .MuiInputBase-input': {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.mode === 'light' ? '#fcfcfb' : '#2b2b2b',
      border: '1px solid #ced4da',
      fontSize: 16,
      width: 'auto',
      padding: '10px 12px',
      transition: theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
      ]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));

const AddPost = props => {
  const [open, setOpen] = React.useState(props.openModal);
  const handleClose = () => setOpen(true);
  const [value, setValue] = React.useState('details');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  return (
    <>
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
            sx={{
                '.MuiFormControl-root': {
                    margin: '10px 10px 10px 0'
                }
            }}
        >
            <Fade in={open}>
                <Box sx={style}>
                    <BottomNavigation value={value} showLabels onChange={handleChange} className={style.navigation} sx={{
                        '& .Mui-selected': {
                            color: '#012B3D !important',
                            borderBottom: '2px solid #012B3D'
                        },
                        '& .MuiBottomNavigationAction-label.Mui-selected': {
                            borderBottom: 'none'
                        },
                        '& button': {
                            flexDirection: 'row',
                            maxWidth: 'none',
                            '& svg': {
                                marginRight: '10px'
                            }
                        }
                    }}>
                        <BottomNavigationAction label="Details" value="details" icon={<FeedIcon />} />
                        <BottomNavigationAction label="Description" value="description" icon={<DescriptionIcon />} />
                        <BottomNavigationAction label="Upload" value="upload" icon={<BackupIcon />} />
                    </BottomNavigation>
                    <div className={styles.content}>
                        <span className={styles.step}>Step 1 of 3</span>
                        <h2>Information about object</h2>
                        <div className={styles.content_fields}>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Bootstrap
                                </InputLabel>
                                <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Bootstrap
                                </InputLabel>
                                <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Bootstrap
                                </InputLabel>
                                <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Bootstrap
                                </InputLabel>
                                <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
                            </FormControl>
                            <FormControl variant="standard">
                                <InputLabel shrink htmlFor="bootstrap-input">
                                    Bootstrap
                                </InputLabel>
                                <BootstrapInput defaultValue="react-bootstrap" id="bootstrap-input" />
                            </FormControl>
                        </div>
                    </div>
                    <Divider />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: ' 0 2rem' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            endIcon={<NavigateNextIcon />}
                            sx={{ mt: 3, mb: 2 }}   
                        >
                            Next Step
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    </>
  );
}

export default AddPost;