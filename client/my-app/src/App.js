import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import AdminNavbar from "./components/AdminNavbar";
import Footer from "./components/Footer"
import Placement from "./pages/Placement";
import AdminPlacement from "./pages/AdminPlacement";
import Internship from "./pages/Internship";
import Add from "./pages/Add";
import Update from "./pages/Update";
import AdminPlacementDelete from "./pages/AdminPlacementDelete";
import InternUpdate from "./pages/InternUpdate"
import "./style.scss"
import AdminUpdate from "./pages/AdminUpdate";
import Read from "./pages/Read"
import AdminHome from "./pages/AdminHome";
import AdminInternship from "./pages/AdminInternship";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const AdminLayout = () => {
  return (
    <>
      <AdminNavbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {

    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <Home />
      },
      {
        path: "/placement",
        element: <Placement />
      },
      {
        path: "/internship",
        element: <Internship />
      },
      {
        path: "/adminHome",
        element: <AdminHome />
      },
      {
        path: "/adminPlacement",
        element: <AdminPlacement />
      },
      {
        path: "/adminInternship",
        element: <AdminInternship />
      },

    ],
    // path: '/admin',
    // element: <AdminLayout />,
    // children: [
    //   {
    //     path: "/adminHome",
    //     element: <AdminHome />
    //   },
    //   {
    //     path: "/adminPlacement",
    //     element: <AdminPlacement />
    //   },
    //   {
    //     path: "/adminInternship",
    //     element: <AdminInternship />
    //   },
    // ]


  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    // path: "/admin/placement/${student.rid}/update"
    path: "/update",
    element: <Update />,
  },
  {
    path: "/update/:id",
    element: <AdminUpdate />
  },
  {
    path: "/add",
    element: <Add />,
  },
  {
    path: "/interUpdate",
    element: <InternUpdate />
  },
  {
    path: "/placement/delete/:id",
    element: <AdminPlacementDelete />
  }


])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>

    </div>
  );
}



export default App;
