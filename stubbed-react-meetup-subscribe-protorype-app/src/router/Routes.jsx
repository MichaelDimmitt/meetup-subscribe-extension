import React from 'react'
// import { createRoutesFromElements, Route } from 'react-router-dom';
import {
    RouterProvider,
    Route,
    createRoutesFromElements,
    createBrowserRouter
  } from "react-router-dom";

function Routes() {
  return (<RouterProvider router={
    createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" >
                <Route path="meetups" lazy={() => import('../pages/Meetups.jsx')} />
                <Route path="meetup-details" lazy={() => import('../pages/MeetupDetails.jsx')} />
            </Route>
    ))
  } />)
}

export default Routes