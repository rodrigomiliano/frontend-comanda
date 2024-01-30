import { Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import AppBarComensal from "../components/AppBarComensal";

import BienvenidaPage from "../pages/BienvenidaPages/BienvenidaPage";
import BienvenidaPage2 from "../pages/BienvenidaPages/BienvenidaPage2";
import SearchPage from "../pages/BuscarPages/SearchPage";
import SearchCategory from "../pages/BuscarPages/SearchCategory";
import SearchResto from "../pages/BuscarPages/SearchResto";
import MenuItems from "../pages/BuscarPages/MenuItems";
import MenuItem from "../pages/BuscarPages/MenuItem";
import CrearOrdenA from "../pages/CrearOrdenPages/CrearOrdenAPage";
import VerDescripcionProductoPage from "../pages/CrearOrdenPages/VerDescripcionProductoPage";
import VerDescripcionProductoPageBis from "../pages/CrearOrdenPages/VerDescripcionProductoPageBis";
import ModificarOrden from "../pages/CrearOrdenPages/ModificarOrdenPage";
import ModificarOrdenBis from "../pages/CrearOrdenPages/ModificarOrdenPageBis";
import SeleccionarMesa from "../pages/CrearOrdenPages/SeleccionarMesa";
import MarcharOrdenPage3 from "../pages/CrearOrdenPages/MarcharOrdenPage3";
import ConfirmaCerrarMesa from "../pages/ReservarMesaPages/ConfirmaCerrarMesa";
import AgregarAdicionalesPage1 from "../pages/CrearOrdenPages/AgregarAdicionalesPage1";
import VisualizarConsumos from "../pages/CrearOrdenPages/VisualizarConsumos";

const DashboardRouter = () => {
  return (
    <Container maxWidth="xs" disableGutters={true}>
      <AppBarComensal />

      <Routes>
        <Route path="bienvenida-2" element={<BienvenidaPage2 />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="category/:id" element={<SearchCategory />} />
        <Route path="resto/:id" element={<SearchResto />} />
        <Route path="items/:id" element={<MenuItems />} />
        <Route path="item/:productoId" element={<MenuItem />} />
        <Route path="crear-orden-a/:id" element={<CrearOrdenA />} />
        <Route path="ver-descripcion-producto/:id" element={<VerDescripcionProductoPage />}/>
        <Route path="ver-descripcion-producto-bis/:id" element={<VerDescripcionProductoPageBis />}/>
        <Route path="modificar-orden/:id" element={<ModificarOrden />} />
        <Route path="modificar-orden-bis/:id" element={<ModificarOrdenBis />} />
        <Route path="seleccionar-mesa/:id" element={<SeleccionarMesa />} />
        <Route path="marchar-orden-3/:id" element={<MarcharOrdenPage3 />} />
        <Route path="confirmar-cerrar-mesa/:id" element={<ConfirmaCerrarMesa />}/>
        <Route path="agregar-adicionales-1/:id" element={<AgregarAdicionalesPage1 />}/>
        <Route path="visualizar-consumos/:id" element={<VisualizarConsumos />}/>
        <Route path="/" element={<BienvenidaPage />} />
      </Routes>
    </Container>
  );
};

export default DashboardRouter;
