import { createBrowserRouter, RouterProvider, Outlet} from "react-router-dom"
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home1 from "./pages/Home1";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './Style.scss'


const Layout =()=>{
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children:[
      {
        path: "/",
        element: <Home1/>,
      },
    ]
  },

  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/register",
    element: <Register/>,
  },

]);

function App1() {
  return (
    <div className="app">
      <div className="container">
         <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App1;
