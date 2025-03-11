import React from "react";
import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import NavbarUserMenu from "./NavbarUserMenu";

const Navbar = (props) => {

  const location = useLocation();
  const url = location.pathname;
  
  const queryParameters = new URLSearchParams(window.location.search)
  const id = queryParameters.get("id")
  const search = queryParameters.get("search")

  var [showMenu, setShowMenu] = useState(false);
  var [toLogin, setToLogin] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
    document.getElementById("menuIcon").src = showMenu ? "/img/menu-icon.png" : "/img/cancel-icon.png";
  }

  const closeMenu = () => {
    setShowMenu(false);
    document.getElementById("menuIcon").src = "/img/cancel-icon.png";
  }

  const handleLogin = () => {
    setToLogin(true);
  }
  
  const ToLogin = () => {
          if (toLogin == true) {
              setToLogin(false);
  
              if (url == null || url == "") url = "/" // default url <- error que vio David (Linux no deja guardar URL?)
  
              if (id == null)
                  if (search == null)
                      return <Navigate to="/login" state={{prevUrl: url, has_id: false, id: id, has_search: false, search: search}} />;
                  else
                      return <Navigate to="/login" state={{prevUrl: url, has_id: false, id: id, has_search: true, search: search}} />;
              else
                  return <Navigate to="/login" state={{prevUrl: url, has_id: true, id: id, has_search: false, search: search}} />;
          }
  }

    return(
      <>
        <nav class="bg-dark">
          <div class="row w-100 p-2 pe-0">
            <div class="col-lg-1 col-md-1 col-sm-2 col-3">
              <a class="navbar-brand" href="/">
                <img class="mt-1" src='/img/logo.png' width="50" height="50"/>
              </a>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-2 col-2 text-center d-none d-md-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/music">Música</a>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-2 col-2 text-center d-none d-md-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/games">Juegos</a>
            </div>

            <div class="col-lg-1 col-md-0 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/movies">Cine</a>
            </div>

            <div class="col-lg-1 col-md-0 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/tv">TV</a>
            </div>

            <div class="col-lg-1 col-md-0 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/books">Libros</a>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-3 col-3 text-center d-none d-sm-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/community">Comunidad</a>
            </div>

            <div class="col-lg-5 col-md-5 col-sm-7 col-6 d-flex justify-content-end">
                <form class="w-100" action="/search">
                  <div class="row mt-2">
                    <div class="col-lg-2 col-md-2 col-sm-1 col-0"></div>

                    <div class="col-lg-5 col-md-5 col-sm-5 col-9 p-0 m-0">
                      <input type="text" class="form-control me-1" placeholder="Buscar..." name="search"/>
                    </div>
                    
                    <div class="col-lg-1 col-md-1 col-sm-1 col-3 p-0 m-0">
                      <button type="submit" class="btn rounded bg-white">
                        <img class="pb-1" src='/img/search.png' width="15" height="20"/>
                      </button>
                    </div>

                    <div class="col-lg-3 col-md-4 col-sm-4 col-0 d-none d-sm-block">
                      <div class="text-end">
                        <NavbarUserMenu isNavShown={props.isNavShown}/>
                      </div>
                    </div>
                  </div>
                </form>
            </div>

            <div class="col-lg-0 col-md-0 col-sm-0 col-3 d-block d-sm-none mt-2 text-end">
              <a class="text-white" onClick={toggleMenu}><img id="menuIcon" src="/img/menu-icon.png" alt="Menu icon" height="40"></img></a>
            </div>
          </div>
        </nav>

        {showMenu &&
        <div class="fixed w-100 col bg-dark">
          <div class="m-0 row text-start">
            <a class="btn text-white" href="/music" onClick={closeMenu}>Música</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/games" onClick={closeMenu}>Juegos</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/movies" onClick={closeMenu}>Cine</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/tv" onClick={closeMenu}>TV</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/books" onClick={closeMenu}>Libros</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/community" onClick={closeMenu}>Comunidad</a>
          </div>

          <div class="m-0 row text-start">
            <a class="btn text-white" href="/login" onClick={handleLogin}>Iniciar sesión</a>
            <ToLogin/>
          </div>
        </div>}
      </>
    );
};

export default Navbar;