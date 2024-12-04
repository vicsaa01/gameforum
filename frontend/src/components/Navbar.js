import React from "react";

import NavbarUserMenu from "./NavbarUserMenu";

const Navbar = (props) => {

  const validateSearch = () => {}

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

            <div class="col-lg-1 col-md-1 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/movies">Cine</a>
            </div>

            <div class="col-lg-1 col-md-1 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/tv">TV</a>
            </div>

            <div class="col-lg-1 col-md-1 col-sm-2 col-2 text-center d-none d-lg-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/books">Libros</a>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-3 col-3 text-center d-none d-sm-block">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/community">Comunidad</a>
            </div>

            <div class="col-lg-1 col-md-2 col-sm-3 col-7 text-start d-block d-sm-none">
              <a class="boton-navbar btn pt-3 pb-3 rounded text-white" href="/community">Comunidad</a>
            </div>

            <div class="col-lg-0 col-md-0 col-sm-0 col-2 d-block d-sm-none d-flex justify-content-end">
              <NavbarUserMenu isNavShown={props.isNavShown}/>
            </div>

            <div class="col-lg-5 col-md-5 col-sm-7 col-12 d-flex justify-content-end">
                <form class="w-100" action="/search" onSubmit={validateSearch}>
                  <div class="row mt-2">
                    <div class="col-lg-3 col-md-2 col-sm-2 col-1"></div>

                    <div class="col-lg-5 col-md-5 col-sm-5 col-9 p-0 m-0">
                      <input type="text" class="form-control me-1" placeholder="Buscar..." name="search"/>
                    </div>
                    
                    <div class="col-lg-1 col-md-1 col-sm-1 col-1 p-0 m-0">
                      <button type="submit" class="btn rounded bg-white">
                        <img class="pb-1" src='/img/search.png' width="15" height="20"/>
                      </button>
                    </div>

                    <div class="col-lg-3 col-md-4 col-sm-4 col-1 d-none d-sm-block">
                      <div class="w-100 d-flex justify-content-end">
                      <NavbarUserMenu isNavShown={props.isNavShown}/>
                      </div>
                      
                    </div>
                  </div>
                </form>
            </div>
          </div>
        </nav>
      </>
    );
};

export default Navbar;