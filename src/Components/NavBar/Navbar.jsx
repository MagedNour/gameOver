import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar({ crrUser, clearUserData }) {

    const navigate = useNavigate()

    function logOut() {

        clearUserData();
        navigate('/login')


    }


    return (

        <>
            <nav className="navbar navbar-expand-lg border-bottom border-dark border-3 fixed-top">
                <div className="container">
                    <Link className="navbar-brand text-white" to="/home">

                        <img src={require('../../images/logo (1).png')} style={{ width: '70px' }} alt="" />
                        Game Over

                    </Link>



                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        {crrUser ? <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item me-2">
                                <Link className="nav-link main-color " aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item me-2">
                                <Link className="nav-link main-color " aria-current="page" to="game/all">All</Link>
                            </li>

                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle main-color" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Platforms
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to="game/platform/pc">Pc</Link></li>
                                    <li><Link class="dropdown-item" to="game/platform/browser">Browser</Link></li>
                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle main-color" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    sort-by
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to="game/sort-by/release-date">release-date</Link></li>
                                    <li><Link class="dropdown-item" to="game/sort-by/popularity">popularity</Link></li>
                                    <li><Link class="dropdown-item" to="game/sort-by/alphabetical">alphabetical</Link></li>
                                    <li><Link class="dropdown-item" to="game/sort-by/relvance">relevance</Link></li>

                                </ul>
                            </li>

                            <li class="nav-item dropdown">
                                <Link class="nav-link dropdown-toggle main-color" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Categories
                                </Link>
                                <ul class="dropdown-menu">
                                    <li><Link class="dropdown-item" to="game/category/racing">racing</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/sports">sports</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/social">social</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/shooter">shooter</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/open-world">open-world</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/zombie">zombie</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/fantasy">fantasy</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/action-rpg">action-rpg</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/action">action</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/flight">flight</Link></li>
                                    <li><Link class="dropdown-item" to="game/category/battle-royale">battle-royale</Link></li>

                                </ul>
                            </li>

                        </ul> : ""}


                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">


                            {crrUser ? <>

                                {/* User is loged In */}
                                <li className="nav-item me-2">
                                    <span onClick={logOut} className="nav-link btn btn-outline-primary text-primary" to="/register">Log out</span>
                                </li>
                            </>


                                : <>
                                    {/* User is Loged Out */}

                                    <li className="nav-item me-2">
                                        <Link className="nav-link main-color " aria-current="page" to="/login">Login</Link>
                                    </li>
                                    <li className="nav-item me-2">
                                        <Link className="nav-link btn btn-outline-primary text-primary" to="/register">Join Free</Link>
                                    </li></>}



                        </ul>



                    </div>
                </div>
            </nav>


        </>

    );
}

export default Navbar;