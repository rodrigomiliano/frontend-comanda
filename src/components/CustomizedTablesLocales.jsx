import { useEffect, useState } from "react";
import React from "react";
import {
  withStyles,
  makeStyles,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
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

export default function CustomizedTables({
  locales,
  handleEdit,
  handleDelete,
}) {
  const classes = useStyles();
  const [loggedUser, setloggedUser] = useState({});

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("user")));
  }, [open]);

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">NOMBRE</StyledTableCell>
            <StyledTableCell align="center">CALLE</StyledTableCell>
            <StyledTableCell align="center">ALTURA</StyledTableCell>
            <StyledTableCell align="center">CP</StyledTableCell>
            <StyledTableCell align="center">TEL</StyledTableCell>
            <StyledTableCell align="center">IMG</StyledTableCell>
            <StyledTableCell align="center">DESCRIPCION</StyledTableCell>            
            <StyledTableCell align="center">ACCIONES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locales &&
            locales.map(
              ({
                id,
                nombre,
                calle,
                altura,
                codigo_postal,
                telefono,
                imagen,
                descripcion,                
              }) => (
                <StyledTableRow key={id}>
                  <StyledTableCell align="center">{id}</StyledTableCell>
                  <StyledTableCell align="center">{nombre}</StyledTableCell>
                  <StyledTableCell align="center">{calle}</StyledTableCell>
                  <StyledTableCell align="center">{altura}</StyledTableCell>
                  <StyledTableCell align="center">
                    {codigo_postal}
                  </StyledTableCell>
                  <StyledTableCell align="center">{telefono}</StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={imagen}
                      alt="Imagen del local"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {descripcion}
                  </StyledTableCell>                 
                  <StyledTableCell align="center">
                    <Grid
                      container
                      justifyContent="center"
                      className={classes.flexMargin}
                      spacing={2}
                    >
                      <Grid item xs={3} style={{ marginRight: 15 }}>
                        <IconButton
                          aria-label="edit"
                          onClick={() => handleEdit(id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Grid>

                      {loggedUser && loggedUser.rol?.nombre === "ADMIN" && (
                      <Grid item xs={3}>
                        <DialogInfo
                          mensaje={
                            <DeleteIcon size="small" aria-label="delete" />
                          }
                          pregunta="¿Realmente desea eliminar el local?"
                          btnIzquierda="Cancelar"
                          btnDerecha="Aceptar"
                          onConfirm={() => handleDelete(id)}
                          hrefIzquierda=""
                          hrefDerecha="baja-locales"
                        />
                      </Grid>
                       )}
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
