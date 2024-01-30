import React from "react";
import {
  withStyles,
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables({ ordenes }) {
  const classes = useStyles();

  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            {/* <StyledTableCell align="center">ID</StyledTableCell> */}
            <StyledTableCell align="center">MESA</StyledTableCell>
            <StyledTableCell align="center">USUARIO</StyledTableCell>
            <StyledTableCell align="center">INGRESO</StyledTableCell>
            <StyledTableCell align="center">ULTIMO PEDIDO</StyledTableCell>
            <StyledTableCell align="center">ESTADO</StyledTableCell>
            <StyledTableCell align="center">INFO</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ordenes &&
            ordenes.map((orden) => (
              <StyledTableRow key={id}>
                {/* <StyledTableCell align="center">{id}</StyledTableCell> */}
                <StyledTableCell align="center">
                  {orden.comandaId}
                </StyledTableCell>
                <StyledTableCell align="center">{orden.estado}</StyledTableCell>
                <StyledTableCell align="center">
                  {orden.comandaMesa}
                </StyledTableCell>
                <StyledTableCell align="center">
                  <Grid
                    container
                    justifyContent="center"
                    className={classes.flexMargin}
                    spacing={2}
                  >
                    <Grid item xs={3}>
                      <IconButton
                        size="small"
                        aria-label="edit"
                        component={Link}
                        to="/admin/gestion-ordenes-2"
                      >
                        <InfoIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
