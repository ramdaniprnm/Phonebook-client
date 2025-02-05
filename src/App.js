import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PhonebookBox } from './components/PhonebookBox';
import { PhonebookAdd } from './components/PhonebookAdd';
import { ErrorPage } from './components/ErrorPage'
import AvatarPage from './components/AvatarPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhonebookBox />,
    errorElement: <ErrorPage />
  },
  {
    path: "/add",
    element: <PhonebookAdd />,
    errorElement: <ErrorPage />
  },
  {
    path: "/avatar/:id",
    element: <AvatarPage />,
    errorElement: <ErrorPage />
  }
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
