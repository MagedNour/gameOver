import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import homecss from './home.module.css'


function Home() {

    const [homeGames, sethomeGames] = useState([]);
    



    async function getHomeGames() {
        const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity', {
            headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' }
        });
        console.log(data.slice(0, 3));
        sethomeGames(data.slice(0, 3))

    }

    useEffect(function () {
        getHomeGames()
    }, [])

    return (
        <>
            <section className={homecss.homebg}>
                <div className="container main-color text-center mt-5">
                    <h1>Find & track the best
                        <span className='go-blue'> free-to-play </span>
                        games!
                    </h1>
                    <p className='lead text-muted'>Track what you've played and search for what to play next! Plus get free premium loot! </p>
                    <Link to={'/game/allgit'} className='btn btn-outline-secondary'>Browse Games</Link>
                </div>
            </section>


            {homeGames.length > 0 ? <section className='main-color py-5'>
                <div className="container">
                    <h3 className='py-4'>
                        <i className='fas fa-robot me-2'></i>
                        Personalized Recommendations
                    </h3>

                    <div className="row">


                        {homeGames.map(function (game, idx) {
                            return <div key={idx} className="col-md-4">

                                <Link to={`/gameDetails/${game.id}`} className='text-decoration-none main-color'>

                                    <div className='gItem item-bg'>
                                        <img src={game.thumbnail} className='w-100' alt="gametitle" />

                                        <div className="body d-flex justify-content-between py-3 px-3">
                                            <h4>{game.title}</h4>
                                            <span className="badge-main">FREE</span>

                                        </div>
                                    </div>

                                </Link>
                            </div>
                        })}

                    </div>
                </div>
            </section> : <LoadingScreen />}
        </>
    );
}

export default Home;