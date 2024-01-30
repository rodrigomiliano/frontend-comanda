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
  Switch,
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
  productos,
  handleEdit,
  handleDelete,
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">NOMBRE</StyledTableCell>
            <StyledTableCell align="center">DESCRIPCION</StyledTableCell>
            <StyledTableCell align="center">CATEGORIA</StyledTableCell>
            <StyledTableCell align="center">PRECIO</StyledTableCell>
            <StyledTableCell align="center">FOTO</StyledTableCell>
            <StyledTableCell align="center">LOCAL</StyledTableCell>
            <StyledTableCell align="center">ACTIVO</StyledTableCell>
            <StyledTableCell align="center">ACCIONES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productos &&
            productos.map(
              ({
                id,
                nombre,
                descripcion,
                categoria,
                precio,
                imagen,
                local,
                activo,
              }) => {
                console.log(`ID ${id} - Valor de activo:`, activo);
                return (
                  <StyledTableRow key={id}>
                    <StyledTableCell align="center">{id}</StyledTableCell>
                    <StyledTableCell align="center">{nombre}</StyledTableCell>
                    <StyledTableCell align="center">
                      {descripcion}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {categoria.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">{precio}</StyledTableCell>
                    <StyledTableCell align="center">
                      <img
                        src={imagen}
                        alt="Imagen del producto"
                        style={{ width: "100px", height: "auto" }}
                      />
                    </StyledTableCell>
                    <StyledTableCell align="center">{local.id}</StyledTableCell>
                    <StyledTableCell align="center">
                      {activo ? "Si" : "No"}
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
                        <Grid item xs={3}>
                          <DialogInfo
                            mensaje={<DeleteIcon aria-label="delete" />}
                            pregunta="¿Realmente desea eliminar el producto?"
                            btnIzquierda="Cancelar"
                            btnDerecha="Aceptar"
                            onConfirm={() => handleDelete(id)}
                            hrefIzquierda=""
                            hrefDerecha="baja-productos"
                          />
                        </Grid>
                      </Grid>
                    </StyledTableCell>
                  </StyledTableRow>
                );
              }
            )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
