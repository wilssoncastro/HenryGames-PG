import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {findArticle} from '../../redux/actions/index';
import NavBar from '../NavBar/navbar';
//import styles from "./detail.module.css"

export default function Article(props){
    const { id } = useParams();
    console.log("id", id)
    const dispatch =useDispatch()
    

    useEffect(() => {
        //dispatch(findArticle(props.match.params.id));
        dispatch(findArticle(id));
    },[dispatch])

    const article = useSelector((state) => state.article)
    console.log("article", article)

    return(
        <div>
        {article.length === 0 ? 
            <div>
                
            <img src={"https://i.pinimg.com/originals/5c/dd/ad/5cddadeb5ed4d48a582cfeb328160826.gif"} /* width='200px' height='200px' *//>
            <div><h1>Cargando...</h1></div>
        </div>
           :
        <div>
            <Link /* className={styles.btn} */ to='/blog'><button>Back</button></Link>
           {/*  <div> <NavBar/></div> */}
            <h1>{article.name}</h1>
            <img src= {article.image}/>
            <h3>{article.contents}</h3>
            
        </div>
        }
        </div>
    )
}