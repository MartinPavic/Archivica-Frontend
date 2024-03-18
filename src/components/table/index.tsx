import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import Button from '@mui/material/Button';
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#002d3d',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow: any = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const CustomizedTables = (props: any) => {
  return (
    <TableContainer component={Paper} >
      <Table aria-label="customized table">
        {/* <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell align="right">Country</StyledTableCell>
            <StyledTableCell align="right">Visit</StyledTableCell>
          </TableRow>
        </TableHead> */}
        <TableBody>
          {props.data.map((row: any) => (
            <StyledTableRow key={row.architect}>
                {row.architect && <StyledTableCell component="th" scope="row">{row.architect}</StyledTableCell>}
                {row.continent && <StyledTableCell>{row.continent}</StyledTableCell>}
                {row.country && <StyledTableCell>{row.country}</StyledTableCell>}
                {row.city && <StyledTableCell>{row.city}</StyledTableCell>}
                {row.style && <StyledTableCell>{row.style}</StyledTableCell>}
                {row.purpose && <StyledTableCell>{row.purpose}</StyledTableCell>}
                <StyledTableCell align="right">
                    <Button variant="contained" endIcon={<NavigateNextRoundedIcon />} sx={{ borderRadius: '50px' }} >
                        Visit
                    </Button>
                </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default CustomizedTables;