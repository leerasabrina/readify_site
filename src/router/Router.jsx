
import { createBrowserRouter } from 'react-router';
import Root from '../Layout/Root';
import ErrorPage from '../Pages/ErrorPage';
import Home from '../Pages/Home';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Private from '../Private/Private';
import Profile from '../Pages/Profile';
import Bookshelf from '../Pages/Bookshelf';
import Mybooks from '../Pages/Mybooks';
import Addbook from '../Pages/Addbook';
import Detail from '../Pages/Detail';
import Contact from '../Pages/Contact';
import MyDetails from '../Pages/MyDetails';
import Terms from '../Pages/Terms';
import Condition from '../Layout/Condition';
import Privacy from '../Pages/Privacy';
 
 export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
      element:<Root></Root>,
      children:[
        {index:true,Component:Home},
        {path:'signin',Component:SignIn},
        {path:'signup',Component:SignUp},
        {path:'profile',element:<Private><Profile></Profile></Private>},
        {path:'addbook',element:<Private><Addbook></Addbook></Private>},
        {path:'mybooks',element:<Private><Mybooks></Mybooks></Private>},
        {path:'details/:id',element:<Private><MyDetails></MyDetails></Private>},
        {path:'bookshelf',element:<Bookshelf></Bookshelf>},
        {path:'contact',element:<Contact></Contact>},
        {path:'bookshelf/:id',element:<Detail></Detail>}

      ]
    },
    {
      path:'/',
      element:<Condition></Condition>,
      children:[
        {path:'terms',element:<Terms></Terms>},
        {path:'privacy',element:<Privacy></Privacy>},
      ]
    }
  ]);