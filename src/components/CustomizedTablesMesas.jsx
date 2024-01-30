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
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import DialogInfo from "./DialogInfo";

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

export default function CustomizedTables({ mesas, handleEdit, handleDelete }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">SILLAS</StyledTableCell>
            <StyledTableCell align="center">OBSERV</StyledTableCell>
            <StyledTableCell align="center">USER</StyledTableCell>
            <StyledTableCell align="center">LOCAL</StyledTableCell>
            <StyledTableCell align="center">ESTADO</StyledTableCell>            
            <StyledTableCell align="center">ACCIONES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mesas &&
            mesas.map(
              ({ id, sillas, observacion, usuario, local, estado}) => (
                <StyledTableRow key={id}>
                  <StyledTableCell align="center">{id}</StyledTableCell>
                  <StyledTableCell align="center">{sillas}</StyledTableCell>
                  <StyledTableCell align="center">
                    {observacion}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {usuario.usuario}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {local.nombre}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {estado.nombre}
                  </StyledTableCell>                  
                  <StyledTableCell align="center">
                    <Grid container justifyContent="center" spacing={2}>
                      <Grid item xs={3}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={3}>
                        <DialogInfo
                          mensaje={<DeleteIcon aria-label="delete" />}
                          pregunta="¿Realmente desea eliminar la mesa?"
                          btnIzquierda="Cancelar"
                          btnDerecha="Aceptar"
                          onConfirm={() => handleDelete(id)}
                          hrefIzquierda=""
                          hrefDerecha="baja-mesas"
                        />
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              )
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
