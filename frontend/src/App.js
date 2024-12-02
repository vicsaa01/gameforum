import React, { useState, useEffect } from 'react';

import ErrorBoundary from "./components/ErrorBoundary"

import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages";
import Community from "./pages/community";
import CreateGroup from "./pages/create-group";
import CreateList from "./pages/create-list";
import Discussion from "./pages/discussion";
import Music from "./pages/music";
import Games from "./pages/games";
import Movies from "./pages/movies";
import TV from "./pages/tv";
import Books from "./pages/books";
import Group from "./pages/group";
import Item from "./pages/item";
import List from "./pages/list-v2";
import Login from "./pages/login";
import Search from './pages/search';
import EditUser from "./pages/edit-user-v2";
import EditGroup from "./pages/edit-group";
import EditList from "./pages/edit-list";
import User from "./pages/user";
import Footer from "./components/Footer";
import CreateDiscussion from './pages/create-discussion';
import AddItem from './pages/add-item';
import Register from './pages/register';
import ForgotPass from './pages/forgot-pass';
import AddRecommendation from './pages/add-recommendation';
import Invites from './pages/invites';
import InviteUser from './pages/invite-user';
import JoinRequests from './pages/join-requests';
import AddToGroup from './pages/add-to-group';
import AddToList from './pages/add-to-list';

const App = () => {
  const [showNav, setShowNav] = useState(true);
  return (
    <Router>
        <body class="h-100">
            <div class="container-fluid h-100 d-flex flex-column">
                {showNav && <Navbar isNavShown={showNav} />}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/music" element={<Music />} />
                    <Route path="/games" element={<Games />} />
                    <Route path="/movies" element={<Movies />} />
                    <Route path="/tv" element={<TV />} />
                    <Route path="/books" element={<Books />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/item" element={<Item />} />
                    <Route path="/add-item" element={<AddItem />} />
                    <Route path="/add-recommendation" element={<AddRecommendation />} />
                    <Route path="/add-to-group" element={<AddToGroup />} />
                    <Route path="/add-to-list" element={<AddToList />} />

                    <Route path="/community" element={<Community />} />
                    <Route path="/group" element={<Group />} />
                    <Route path="/discussion" element={<Discussion />} />
                    <Route path="/list" element={<List />} />
                    <Route path="/create-group" element={<CreateGroup />} />
                    <Route path="/create-discussion" element={<CreateDiscussion />} />
                    <Route path="/create-list" element={<CreateList />} />
                    <Route path="/edit-group" element={<EditGroup />} />
                    <Route path="/edit-list" element={<EditList />} />
                    <Route path="/join-requests" element={<JoinRequests />} />

                    <Route path="/login" element={<Login setNav={setShowNav} />}/>
                    <Route path="/register" element={<Register setNav={setShowNav} />} />
                    <Route path="/forgot-pass" element={<ForgotPass setNav={setShowNav} />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/edit-user" element={<EditUser />} />
                    <Route path="/invites" element={<Invites />} />
                    <Route path="/invite-user" element={<InviteUser />} />
                </Routes>
                {showNav && <Footer />}
            </div>
        </body>
    </Router>
  );
};

export default App;