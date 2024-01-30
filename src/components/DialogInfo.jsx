import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

export default function DialogInfo({
  mensaje,
  pregunta,
  btnIzquierda,
  btnDerecha,
  hrefDerecha,
  hrefIzquierda,
  onConfirm, // Agrega onConfirm como prop
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        {mensaje}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {pregunta}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              //onConfirm();
            }}
            color="primary"
            href={hrefIzquierda}
          >
            {btnIzquierda}
          </Button>
          <Button
            onClick={() => {
              handleClose();
              if (onConfirm) {
                onConfirm(); // Llama a onConfirm solo si está definido
              }
            }}
            color="primary"
            autoFocus
            href={hrefDerecha}
          >
            {btnDerecha}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
