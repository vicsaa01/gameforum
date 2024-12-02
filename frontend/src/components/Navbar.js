import React from "react";

import NavbarUserMenu from "./NavbarUserMenu";

const Navbar = (props) => {

  const validateSearch = () => {}

    return(
        <header>
                <div class="row">
                    <div class="navbar w-100 bg-dark">
                        <div class="col-lg-1 col-md-2 col-sm-3 col-xs-3">
                            <a class="navbar-brand ms-3 me-3" href="/">
                                <img src='/img/logo.png' width="50" height="50"/>
                            </a>
                        </div>
                        
                        <div class="col-lg-5 col-md-0 col-sm-0 col-xs-0">
                          <div class="d-none d-lg-block">
                            <div class="row">
                              <div class="col">
                                <a class="boton-navbar btn d-none d-md-block pt-3 pb-3 rounded text-white text-center me-3" href="/music">Música</a>
                              </div>
                              <div class="col">
                                <a class="boton-navbar btn d-none d-md-block pt-3 pb-3 rounded text-white text-center me-3" href="/games">Juegos</a>
                              </div>
                              <div class="col">
                                <a class="boton-navbar btn d-none d-md-block pt-3 pb-3 rounded text-white text-center me-3" href="/movies">Cine</a>
                              </div>
                              <div class="col">
                                <a class="boton-navbar btn d-none d-md-block pt-3 pb-3 rounded text-white text-center me-3" href="/tv">TV</a>
                              </div>
                              <div class="col">
                                <a class="boton-navbar btn d-none d-md-block pt-3 pb-3 rounded text-white text-center me-3" href="/books">Libros</a>
                              </div>
                            </div>
                          </div>
                        </div>

                              <div class="col-lg-1 col-md-2 col-sm-9 col-xs-3">
                                <div class="d-flex float-lg-end float-sm-start">
                                  <a class="boton-navbar btn pt-3 pb-3 rounded text-white text-center" href="/community">Comunidad</a>
                                </div>
                              </div>
                        
                        <div class="col-lg-5 col-md-8 col-sm-12 col-xs-12">
                            <div class="d-flex justify-content-end">
                                <form action="/search" onSubmit={validateSearch}>
                                    <div class="row">
                                      <div class="col-8 p-0 m-0">
                                        <input type="text" class="form-control me-1" placeholder="Buscar..." name="search"/>
                                      </div>
                                      <div class="col-4 p-0 m-0">
                                        <button type="submit" class="btn rounded bg-white">
                                            <img class="pb-1" src='/img/search.png' width="15" height="20"/>
                                        </button>
                                      </div>
                                    </div>
                                </form>

                                <NavbarUserMenu isNavShown={props.isNavShown}/>
                            </div>
                        </div>
                    </div>
                </div>
        </header>
    );
};

export default Navbar;