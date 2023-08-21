// import './App.css';
import { Suspense ,lazy} from 'react';
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from 'react-router-dom';
import { routes } from './routes/routes';
import SuspenceLoader from './components/common/SuspenceLoader';

const ErrorComponent = lazy(() => import('./components/common/ErrorComponent'));


//createBrowserRouter is used instead of BrowserRouter 
const router=createBrowserRouter(
  createRoutesFromElements( //equivalent to Routes
    <Route>
      <Route path={routes.main.path} element={<Navigate to={`${routes.emails.path}/inbox`} />} />
      {/* full main screen has 2 dynamic parts: 1- the list of emails part 2- the view of each email after openng it part */}
      <Route path={routes.main.path} element={<routes.main.element/>}> 
        <Route path= {`${routes.emails.path}/:type`} element={<routes.emails.element/>} errorElement={<ErrorComponent/>} />
        <Route path={routes.view.path} element={<routes.view.element/>} errorElement={<ErrorComponent/>} />
      </Route>
      <Route path={routes.invalid.path} element={<Navigate to={`${routes.main.path}/inbox`} />}/>
    </Route>
  )
)

function App() {
  return (
    <Suspense fallback={<SuspenceLoader/>}>
      <RouterProvider router={router}/>
    </Suspense>
    
  );
}

export default App;
