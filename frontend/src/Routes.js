import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Signin from "./user/Signin";
import PrivateRoute from "./auth/helper/PrivateRoute";
import Dashboard from "./user/Dashboard";
import AddGenre from "./user/AddGenre";
import ManageGenre from "./user/ManageGenre";
import ManageBooks from "./user/ManageBooks";
import AddBook from "./user/AddBook";
import UpdateGenre from "./user/UpdateGenre";
import UpdateBook from "./user/UpdateBook";
import Home from "./core/Home";
import BookDetails from "./core/BookDetails";
import Issue from "./core/Issue";

export default function Routes() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Signin} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create/genre" component={AddGenre} />
          <PrivateRoute exact path="/create/book" component={AddBook} />
          <PrivateRoute exact path="/genres" component={ManageGenre} />
          <PrivateRoute exact path="/books" component={ManageBooks} />
          <PrivateRoute exact path="/book/issue/:bookId" component={Issue} />
          <PrivateRoute
            exact
            path="/genre/update/:genreId"
            component={UpdateGenre}
          />
          <PrivateRoute
            exact
            path="/book/update/:bookId"
            component={UpdateBook}
          />
          <PrivateRoute exact path="/book/:bookId" component={BookDetails} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}
