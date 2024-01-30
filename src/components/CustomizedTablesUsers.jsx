import { useEffect, useState } from "react";
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

export default function CustomizedTables({ users, handleEdit, handleDelete }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loggedUser, setloggedUser] = useState({});

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("user")));
  }, [open]);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">USER</StyledTableCell>
            <StyledTableCell align="center">NOMBRE</StyledTableCell>
            <StyledTableCell align="center">APELLIDO</StyledTableCell>
            <StyledTableCell align="center">DNI</StyledTableCell>
            <StyledTableCell align="center">EMAIL</StyledTableCell>
            <StyledTableCell align="center">TEL</StyledTableCell>
            <StyledTableCell align="center">ROL</StyledTableCell>
            <StyledTableCell align="center">PASS</StyledTableCell>
            <StyledTableCell align="center">ACTIVO</StyledTableCell>
            <StyledTableCell align="center">ACCIONES</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map(
              ({
                id,
                usuario,
                nombre,
                apellido,
                dni,
                email,
                telefono,
                rol,
                contrasena,
                activo,
              }) => {
                console.log(`ID ${id} - Valor de activo:`, activo);
                return (
                  <StyledTableRow key={id}>
                    <StyledTableCell align="center">{id}</StyledTableCell>
                    <StyledTableCell align="center">{usuario}</StyledTableCell>
                    <StyledTableCell align="center">{nombre}</StyledTableCell>
                    <StyledTableCell align="center">{apellido}</StyledTableCell>
                    <StyledTableCell align="center">{dni}</StyledTableCell>
                    <StyledTableCell align="center">{email}</StyledTableCell>
                    <StyledTableCell align="center">{telefono}</StyledTableCell>
                    <StyledTableCell align="center">
                      {rol.nombre}
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {showPassword ? (
                        contrasena
                      ) : (
                        <input
                          type="password"
                          value={contrasena}
                          readOnly
                          style={{
                            border: "none",
                            width: "100%",
                            textAlign: "center",
                          }}
                        />
                      )}
                    </StyledTableCell>
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

                        {loggedUser && loggedUser.rol?.nombre === "ADMIN" && (
                          <Grid item xs={3}>
                            <DialogInfo
                              mensaje={<DeleteIcon aria-label="delete" />}
                              pregunta="¿Realmente desea eliminar el usuario?"
                              btnIzquierda="Cancelar"
                              btnDerecha="Aceptar"
                              onConfirm={() => handleDelete(id)}
                              hrefIzquierda=""
                              hrefDerecha="baja-usuarios"
                            />
                          </Grid>
                        )}
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
