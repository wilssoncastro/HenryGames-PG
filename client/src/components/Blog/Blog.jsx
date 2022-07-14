import React, { useEffect } from "react";

import { Link } from "react-router-dom";
//import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getArticles } from "../../redux/actions/index";
import styles from "./Blog.module.css";
import NavBar from '../NavBar/navbar';
import Footer from '../Footer/Footer';


import {
    ScrollContainer,
    //Sticky,
    Animator,
    ScrollPage,
    Fade,
    //MoveOut,
    FadeIn,
    //ZoomIn,
    MoveIn,
    Zoom,
    Move
} from 'react-scroll-motion';



export default function Blog() {

    /*  const navigate = useNavigate(); */
    const dispatch = useDispatch();
    const allArticles = useSelector((state) => state.articles);
    console.log("Articles", allArticles)

    useEffect(() => {
        dispatch(getArticles());
    }, []);

    const Scrll0 = Fade()
    const Scrll1 = Zoom(0, 1)
    //const Scrll2 = Fade()
    const Scrll3 = FadeIn(0, 1)

    return (

        <div className="blog_container">
            <NavBar></NavBar>

            <div>
                {allArticles.length ?


                    <div className={styles.container}>


                        <ScrollContainer>
                            <ScrollPage page={0}>
                                <Animator animation={Scrll0}>
                                    <Link /* className={styles.btn} */ to='/home'>
                                        <button className={styles.btnBack}>Back</button>
                                    </Link>
                                    <div className={styles.articulos}>
                                        <Link color="#fff" to={"/blog/" + allArticles[0].id}>
                                            <h1>Most recent and important news and events in the world of video games</h1>
                                            <img className={styles.img} src={allArticles[0].image} width='700px' />
                                            <h4>{allArticles[0].name} </h4>
                                        </Link>
                                    </div>
                                </Animator>
                            </ScrollPage>
                            <ScrollPage page={1}>
                                <Animator animation={Scrll0}>
                                    <div className={styles.lanzamientos}>
                                        <Animator animation={Scrll1}>
                                            <div className={styles.border}>
                                                <Link to={"/blog/" + allArticles[1].id}>
                                                <h1>Releases</h1>
                                                <img className={styles.img} src={allArticles[1].image} width='450px' />
                                                <h4>{allArticles[1].name}</h4>
                                                </Link>
                                            </div>
                                        </Animator>
                                        <Animator animation={MoveIn(600, 0)}>
                                            <div>
                                                <div className={styles.border}>
                                                    <Link to={"/blog/" + allArticles[2].id}>
                                                        <img className={styles.img} src={allArticles[2].image} width='250px' />
                                                        <div className={styles.subArticle}>
                                                        <h4>{allArticles[2].name}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className={styles.border}>
                                                    <Link to={"/blog/" + allArticles[3].id}>
                                                        <img className={styles.img} src={allArticles[3].image} width='250px' />
                                                        <div className={styles.subArticle}>
                                                            <h4>{allArticles[3].name}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </Animator>
                                    </div>
                                </Animator>
                            </ScrollPage>
                            <ScrollPage page={2}>
                                <Animator animation={Scrll1}>
                                    {/*  <div className={styles.flex}> */}
                                    {/* <div><h1>NEWS</h1></div> */}
                                    <h1>NEWS</h1>
                                    <div className={styles.noticias}>
                                        <Animator animation={Move(650, 0)}>
                                            <div className={styles.border}>
                                                <Link to={"/blog/" + allArticles[4].id}>
                                                    <img className={styles.img} src={allArticles[4].image} width='350px' />
                                                    <h4>{allArticles[4].name}</h4>
                                                </Link>
                                            </div>
                                        </Animator>
                                        <Animator animation={Move(0, 650)}>
                                            <div className={styles.border}>
                                                <Link to={"/blog/" + allArticles[5].id}>
                                                    <img className={styles.img} src={allArticles[5].image} width='350px' />
                                                    <h4>{allArticles[5].name}</h4>
                                                </Link>
                                            </div>
                                        </Animator>
                                        <Animator animation={Move(-650, 0)}>
                                            <div className={styles.border}>
                                                <Link to={"/blog/" + allArticles[6].id}>
                                                    <img className={styles.img} src={allArticles[6].image} width='350px' />
                                                    <h4>{allArticles[6].name}</h4>
                                                </Link>
                                            </div>
                                        </Animator>
                                    </div>
                                    {/* </div> */}
                                </Animator>
                            </ScrollPage>
                            <ScrollPage page={3}>
                                <Animator animation={Scrll0}>
                                    <div className={styles.lanzamientos}>
                                        <div>
                                            <Animator animation={Move(0, 500)}>
                                                <h1>CLASICS</h1>
                                            </Animator>
                                            <Animator animation={Move(-650, 0)}>
                                                <div className={styles.border}>
                                                    <Link to={"/blog/" + allArticles[7].id}>
                                                        <img className={styles.img} src={allArticles[7].image} width='250px' />
                                                        <div className={styles.subArticle}>
                                                            <h4>{allArticles[7].name}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Animator>
                                            <Animator animation={Move(-650, 0)}>
                                                <div className={styles.border}>
                                                    <Link to={"/blog/" + allArticles[8].id}>
                                                        <img className={styles.img} src={allArticles[8].image} width='250px' />
                                                        <div className={styles.subArticle}>
                                                            <h4>{allArticles[8].name}</h4>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </Animator>
                                        </div>
                                        <Animator animation={Move(650, 0)}>
                                            <div className={styles.border}>
                                                <Link to={"/blog/" + allArticles[9].id}>
                                                    <img className={styles.img} src={allArticles[9].image} width='450px' />
                                                    <h4>{allArticles[9].name}</h4>
                                                </Link>
                                            </div>
                                        </Animator>
                                    </div>
                                </Animator>
                            </ScrollPage>
                            <ScrollPage page={4}>
                                <Animator animation={Scrll3}>
                                    {/* <div className={styles.flex}> */}
                                    <h1>CONSOLES</h1>
                                    <div className={styles.noticias}>
                                        <div className={styles.border}>
                                            <Link to={"/blog/" + allArticles[10].id}>
                                                <img className={styles.img} src={allArticles[10].image} width='500px' />
                                                <h4>{allArticles[10].name}</h4>
                                            </Link>
                                        </div>
                                        <div className={styles.border}>
                                            <Link to={"/blog/" + allArticles[11].id}>
                                                <img className={styles.img} src={allArticles[11].image} width='500px' />
                                                <h4>{allArticles[11].name}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                    {/* </div> */}
                                </Animator>
                            </ScrollPage>
                        </ScrollContainer>
                        <Footer />
                    </div>
                    :

                    <div className={styles.loading}>
                        <img src={"https://i.pinimg.com/originals/5c/dd/ad/5cddadeb5ed4d48a582cfeb328160826.gif"} /* width='200px' height='200px' */ />
                        <div><h1>Cargando...</h1></div>
                    </div>
                }

            </div>
        </div>
    )
}