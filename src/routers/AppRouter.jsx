import { Routes, Route } from "react-router-dom"
import AdminRouter from "./AdminRouter"
import DashboardRouter from "./DashboardRouter"

const AppRouter = () => {
    return (

        <Routes>
          <Route path="/*" element= { <DashboardRouter />} />
          <Route path="/admin/*" element= { <AdminRouter />} />        
        </Routes>

    )
}

export default AppRouter;