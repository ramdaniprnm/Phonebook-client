import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { RoutesBox } from './routes/RoutesBox';
import { RoutesForm } from './routes/RoutesForm';
import { RoutesAvatar } from './routes/RoutesAvatar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <RoutesBox />,
  },
  {
    path: "/add",
    element: <RoutesForm />,
  },
  {
    path: "/avatar/:id",
    element: <RoutesAvatar />,
  }
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
