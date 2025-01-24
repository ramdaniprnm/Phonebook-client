import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { PhonebookBox } from './components/PhonebookBox';
import { PhonebookAdd } from './components/PhonebookAdd';
import AvatarPage from './components/AvatarPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PhonebookBox />,
  },
  {
    path: "/add",
    element: <PhonebookAdd />,
  },
  {
    path: "/avatar/:id",
    element: <AvatarPage />,
  }
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
