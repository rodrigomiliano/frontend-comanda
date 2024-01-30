import { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  AppBar as AppBarMIU,
  CssBaseline,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import PeopleIcon from "@material-ui/icons/People";
import FreeBreakfastIcon from "@material-ui/icons/FreeBreakfast";
import LocalDiningIcon from "@material-ui/icons/LocalDining";
import RoomServiceIcon from "@material-ui/icons/RoomService";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function AppBar(props) {
  const { user } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [loggedUser, setloggedUser] = useState({});

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    // Limpiar los datos de autenticación del usuario del localStorage
    localStorage.removeItem("user");
    window.location.href = `/admin`;
  };

  useEffect(() => {
    setloggedUser(JSON.parse(localStorage.getItem("user")));
  }, [open]);

  return (
    <>
      <CssBaseline />
      <AppBarMIU
        position="static"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            COMANDA
          </Typography>
        </Toolbar>
      </AppBarMIU>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* <List>
          {['Inicio', 'Locales', 'Usuarios'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <CalendarTodayIcon /> : <FavoriteIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Gestión de órdenes', 'Mesas', 'Productos', ].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> */}

        <List component="nav">
          <div>{user}</div>
          <ListItem button component={Link} to="/admin/ver-inicio" onClick={handleDrawerClose}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Inicio" />
          </ListItem>

          <ListItem button component={Link} to="/admin/alta-productos" onClick={handleDrawerClose}>
            <ListItemIcon>
              <RoomServiceIcon />
            </ListItemIcon>
            <ListItemText primary="Productos" />
          </ListItem>

          <ListItem button component={Link} to="/admin/alta-mesas" onClick={handleDrawerClose}>
            <ListItemIcon>
              <LocalDiningIcon />
            </ListItemIcon>
            <ListItemText primary="Mesas" />
          </ListItem>

          {loggedUser.rol?.nombre == "USER_LOCAL" ? (
            <>
              <ListItem button component={Link} to="/admin/alta-usuarios" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuario" />
              </ListItem>
              <ListItem button component={Link} to="/admin/alta-locales" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Locales" />
              </ListItem>

              <ListItem button component={Link} to="/admin/gestion-ordenes" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <FreeBreakfastIcon />
                </ListItemIcon>
                <ListItemText primary="Gestión de órdenes" />
              </ListItem>
            </>
          ) : (
            ""
          )}
          {loggedUser.rol?.nombre == "ADMIN" ? (
            <>
              <ListItem button component={Link} to="/admin/alta-usuarios" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Usuarios" />
              </ListItem>
              <ListItem button component={Link} to="/admin/alta-locales" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <BusinessIcon />
                </ListItemIcon>
                <ListItemText primary="Locales" />
              </ListItem>

              <ListItem button component={Link} to="/admin/gestion-ordenes-2" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <FreeBreakfastIcon />
                </ListItemIcon>
                <ListItemText primary="Gestión de órdenes" />
              </ListItem>

              <ListItem button component={Link} to="/admin/alta-categorias" onClick={handleDrawerClose}>
                <ListItemIcon>
                  <LocalOfferIcon />
                </ListItemIcon>
                <ListItemText primary="Categorías" />
              </ListItem>
            </>
          ) : (
            ""
          )}
          <ListItem button component={Link} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
}

export default AppBar;
