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
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";

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
  categorias,
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
            <StyledTableCell align="center">FOTO</StyledTableCell>
            <StyledTableCell align="center">DESTACADO</StyledTableCell>
            <StyledTableCell align="center">ACCIONES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categorias &&
            categorias.map(({ id, nombre, imagen, destacado }) => {
              console.log("Valor de destacado:", destacado);
              return (
                <StyledTableRow key={id}>
                  <StyledTableCell align="center">{id}</StyledTableCell>
                  <StyledTableCell align="center">{nombre}</StyledTableCell>
                  <StyledTableCell align="center">
                    <img
                      src={imagen}
                      alt="Imagen de categoria"
                      style={{ width: "100px", height: "auto" }}
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {destacado ? (
                      <StarIcon color="secondary" />
                    ) : (
                      <StarBorderIcon />
                    )}
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
                          pregunta="¿Realmente desea eliminar la categoría?"
                          btnIzquierda="Cancelar"
                          btnDerecha="Aceptar"
                          onConfirm={() => handleDelete(id)}
                          hrefIzquierda=""
                          hrefDerecha="baja-categorias"
                        />
                      </Grid>
                    </Grid>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
