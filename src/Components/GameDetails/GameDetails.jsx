import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import detCss from './details.module.css'

import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel/dist/assets/owl.theme.default.min.css';

function GameDetails(props) {



    const { id } = useParams()
    const [game, setgame] = useState();



    useEffect(function () {
        getGameDetails();
    }, [])


    async function getGameDetails() {
        try {
            const { data } = await axios.get(`https://free-to-play-games-database.p.rapidapi.com/api/game`, {
                params: { id },
                headers: { 'X-RapidAPI-Key': 'b52128808dmsh5826403ec30ac21p1b9548jsnfca5769e0b68', 'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com' }
            });
            console.log(data);
            setgame(data);
        } catch (error) {
            console.log('error: ', error);
        }


    }

    return (
        <>


            {game ? <section style={{ backgroundImage: `url('https://www.freetogame.com/g/${game.id}/background.jpg')`, backgroundSize: 'cover' }}>

                <div className={detCss.layer}>
                    <div className="container py-3">
                        <div className="row py-5 mt-5">

                            <div className="col-md-4">
                                <div>
                                    <div className="media position-relative">
                                        <video className='w-100 rounded' src={`https://www.freetogame.com/g/${id}/videoplayback.webm`} autoPlay />
                                        <img className={`w-100 rounded position-absolute top-0 start-0 ${detCss.thumbnail}`} src={game.thumbnail} alt="" />
                                    </div>

                                    <div className='mt-3'>
                                        <span className='btn btn-dark main-color col-md-3 me-3'>FREE</span>
                                        <Link className="btn btn-primary col-md-8" target="_blank" to={game.freetogame_profile_url}>
                                            PLAY NOW
                                            <i className='fas fa-sign-out-alt ms-2'></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-8 main-color">
                                <div>
                                    <h1>{game.title}</h1>
                                    <h5>About {game.title}</h5>
                                    <p className='fs-5'>{game.description}</p>

                                    {game.minimum_system_requirements ? <>
                                        <h5 className='mt-1'>Minimum System Requirements</h5>
                                        <ul className='list-unstyled'>
                                            <li className='mt-2'><span className='fw-bold'>graphics:</span> {game.minimum_system_requirements.graphics}</li>
                                            <li className='mt-2'> <span className='fw-bold'>memory:</span> {game.minimum_system_requirements.memory}</li>
                                            <li className='mt-2'><span className='fw-bold'>OS:</span> {game.minimum_system_requirements.os}</li>
                                            <li className='mt-2'><span className='fw-bold'>processor:</span> {game.minimum_system_requirements.processor}</li>
                                            <li className='mt-2'><span className='fw-bold'>storage:</span> {game.minimum_system_requirements.storage}</li>

                                        </ul>

                                    </> : ""}

                                    <h4 className='mt-5'>{game.title} screenshots</h4>
                                    <OwlCarousel className='owl-theme'
                                        items="1"
                                        autoplay={true}
                                        autoplayTimeout="2000"
                                        loop={true}
                                        dots={false}
                                    >

                                        {game.screenshots.map(function (img, idx) {
                                            return <>
                                                <div class='item'>
                                                    <img className='w-100' src={img.image} alt="ScreenShot" />
                                                </div>

                                            </>

                                        })}
                                    </OwlCarousel>

                                    <h2 className='my-3'>Additional Information</h2>

                                    <div className="row">
                                        <div className="col-md-4">
                                            <span className='text-muted'>Title</span>
                                            <p>{game.title}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span className='text-muted'>Developer</span>
                                            <p>{game.developer}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span className='text-muted'>Publisher</span>
                                            <p>{game.publisher}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span className='text-muted'>Release Date</span>
                                            <p>{game.release_date}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span className='text-muted'>Genre</span>
                                            <p>{game.genre}</p>
                                        </div>
                                        <div className="col-md-4">
                                            <span className='text-muted'>Platform</span>
                                            <p>
                                                <i className='fas fa-window-maximize text-muted me-2'></i>
                                                {game.platform}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section> : <LoadingScreen />}
        </>
    );
}

export default GameDetails;