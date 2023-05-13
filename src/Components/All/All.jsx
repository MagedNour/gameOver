import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function All(props) {


    const [readyGames, setreadyGames] = useState([]);
    const [allGames, setallGames] = useState();





    async function getAllGames() {

        try {
            const { data } = await axios.get('https://free-to-play-games-database.p.rapidapi.com/api/games', {
                headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' }
            });
            console.log(data);
            setreadyGames(data.slice(0, 20))
            setallGames(data)
        } catch (error) {
            console.log("error", error);
        }
    }

    function moreGames() {
        setreadyGames(allGames.slice(0, readyGames.length + 20));
    }

    useEffect(function () {
        getAllGames();
    }, [])


    return (
        <>


            {readyGames ? <div className="container py-5">
                <div className="row">


                    {readyGames.map(function (game, idx) {
                        return <>
                            <div key={idx} className="col-md-3 gy-4">

                                <Link to={`/gameDetails/${game.id}`} className='text-decoration-none main-color'>


                                    <div className='gItem item-bg'>
                                        <img src={game.thumbnail} className='w-100' alt={game.title} />

                                        <div className="body d-flex justify-content-between pt-3 px-3">
                                            <h4>{game.title.slice(0, 15)}...</h4>
                                            <span className='badge-main'>Free</span>
                                        </div>
                                        <p className='px-3'>{game.short_description.slice(0, 25)}...</p>

                                        <div className='item-footer d-flex justify-content-between pb-3 px-3'>
                                            <i class="fas fa-plus-square light-gray"></i>

                                            <div>
                                                <span class="badge bg-secondary text-dark me-2">{game.genre}</span>
                                                <i title="Available on Windows" class="fab fa-windows text-muted"></i>
                                            </div>
                                        </div>
                                    </div>

                                </Link>

                            </div>
                        </>
                    })}

                </div>

                <div className="text-center py-5">
                    <button onClick={moreGames} className='btn btn-outline-secondary'> More Games {'>'} </button>
                </div>
            </div> : <LoadingScreen />}
        </>
    );
}

export default All;