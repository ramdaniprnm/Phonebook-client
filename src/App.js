import React from 'react';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';
import AvatarPage from './components/AvatarPage';
import PhonebookAdd from './components/PhonebookAdd';
import PhonebookItem from './components/PhonebookHead';
import './App.css';


const route = createBrowserRouter([
  {
    path: "/",
    element: <PhonebookItem />,
  },
  {
    path: "/add",
    element: <PhonebookAdd />,
  },
  // {
  //   path: "/avatar/:id",
  //   element: <AvatarPage />,
  // },
])

const App = () => {
  return (
    <>
      <RouterProvider router={route} />
    </>
  )
}


export default App;
