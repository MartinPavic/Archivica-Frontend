import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';

import Filtering from '../../filtering';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const FilterModal = props => {
  const [open, setOpen] = React.useState(props.openModal ?? false);
  const handleClose = () => setOpen(false);

//   React.useEffect(() => {
//     setOpen(!open);
//   }, [props.openModal])

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
        >
            <Fade in={open}>
                <Box sx={style}>
                    <Divider sx={{ margin: '5px 0 25px' }}>
                        <Chip label="POSTS SEARCH" />
                    </Divider>
                    <Filtering />
                    <div style={{ display: 'flex' }}>
                        <Button
                            type="submit"
                            fullWidth
                            sx={{ mt: 3, mb: 2 }}
                            onClick={() => setOpen(false)}
                        >
                            CANCEL
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            APPLY
                        </Button>
                    </div>
                </Box>
            </Fade>
        </Modal>
    </>
  );
}

export default FilterModal;