import React,  { useEffect } from "react";

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
        <div>
            <div>
                <NavBar />
            </div>
            <div className={styles.container}>
                <ScrollContainer>
                    <ScrollPage page={0}>
                        <Animator animation={Scrll0}>

                            <div>
                                <img className={styles.img} src={allArticles[0].image} alt='' width='700px' />
                                <h4>{allArticles[0].name}</h4>
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={1}>
                        <Animator animation={Scrll0}>
                            <div className={styles.lanzamientos}>
                                <Animator animation={Scrll1}>
                                    <div className={styles.border}>
                                        <h1>Lanzamientos</h1>
                                        <img className={styles.img} src={allArticles[1].image} alt='' width='450px' />
                                        <h4>{allArticles[1].name}</h4>
                                    </div>
                                </Animator>
                                <Animator animation={MoveIn(600, 0)}>
                                    <div>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[2].image} alt='' width='250px' />
                                            <div className={styles.subArticle}> 
                                                <h4>{allArticles[2].name}</h4>
                                            </div>

                                        </div>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[3].image} alt='' width='250px' />
                                            <div className={styles.subArticle}>
                                                <h4>{allArticles[3].name}</h4>
                                            </div>
                                        </div>
                                    </div>
                                </Animator>
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={2}>
                        <Animator animation={Scrll1}>
                            <div className={styles.flex}>
                                <div><h1>Noticias</h1></div>
                                <div className={styles.noticias}>
                                    <Animator animation={Move(650, 0)}>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[4].image} alt='' width='350px' />
                                            <h4>{allArticles[4].name}</h4>
                                        </div>
                                    </Animator>
                                    <Animator animation={Move(0, 650)}>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[5].image} alt='' width='350px' />
                                            <h4>{allArticles[5].name}</h4>
                                        </div>
                                    </Animator>
                                    <Animator animation={Move(-650, 0)}>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[6].image} alt='' width='350px' />
                                            <h4>{allArticles[6].name}</h4>
                                        </div>
                                    </Animator>
                                </div>
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={3}>
                        <Animator animation={Scrll0}>
                            <div className={styles.lanzamientos}>
                                <div>
                                    <Animator animation={Move(0, 500)}>
                                        <h1>clasicos</h1>
                                    </Animator>
                                    <Animator animation={Move(-650, 0)}>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[7].image} alt='' width='250px' />
                                            <div className={styles.subArticle}>
                                                <h4>{allArticles[7].name}</h4>
                                            </div>
                                        </div>
                                    </Animator>
                                    <Animator animation={Move(-650, 0)}>
                                        <div className={styles.border}>
                                            <img className={styles.img} src={allArticles[8].image} alt='' width='250px' />
                                            <div className={styles.subArticle}>
                                                <h4>{allArticles[8].name}</h4>
                                            </div>
                                        </div>
                                    </Animator>
                                </div>
                                <Animator animation={Move(650, 0)}>
                                    <div className={styles.border}>
                                        <img className={styles.img} src={allArticles[9].image} alt='' width='450px' />
                                        <h4>{allArticles[9].name}</h4>
                                    </div>
                                </Animator>
                            </div>
                        </Animator>
                    </ScrollPage>
                    <ScrollPage page={4}>
                        <Animator animation={Scrll3}>
                            <div className={styles.flex}>
                                <h1>consolas</h1>
                                <div className={styles.noticias}>
                                    <div className={styles.border}>
                                        <img className={styles.img} src={allArticles[10].image} alt='' width='500px' />
                                        <h4>{allArticles[10].name}</h4>
                                    </div>
                                    <div className={styles.border}>
                                        <img className={styles.img} src={allArticles[11].image} alt='' width='500px' />
                                        <h4>{allArticles[11].name}</h4>
                                    </div>
                                </div>
                            </div>
                        </Animator>
                    </ScrollPage>
                </ScrollContainer>
                <Footer />
            </div>
        </div>
    )
}