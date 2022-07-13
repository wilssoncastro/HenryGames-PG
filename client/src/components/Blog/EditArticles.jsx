import React from "react";
import { useState, useEffect } from "react";
import { getArticles, updateArticle } from "../../redux/actions/index";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Blog.module.css";
import NavBar from "../NavBar/navbar";
import Footer from '../Footer/Footer';


export default function EditArticles() {


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allArticles = useSelector((state) => state.articles);
  console.log("Articles", allArticles)

  useEffect(() => {
    dispatch(getArticles());
  }, []);

  const [input, setInput] = useState({
    id: "",
    name: "",
    contents: "",
    image: "",
  })

  const [error, setError] = useState({})


  function validate(input) {
    let error = {};
    if (input.name === "") {
      error.name = "no ahi nombre"
    }
  }

  function handleOnChange(e) {
    if (!input.id) {
      setError({
        ...error,
        id: "You must select an item"
      })
    }
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    /* setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    ); */
    console.log("input", input)
    console.log("error", error)
  }

  function handleSelect(e) {
    const idArticle = allArticles.filter(x => x.id === e.target.value)
    setInput({
      ...input,
      id: e.target.value,
      name: idArticle[0].name,
      contents: idArticle[0].contents,
      image: idArticle[0].image,
    });
    setError({
      ...error,
      id: "",
    })

    /* setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    ); */
    console.log("id", idArticle)
  }

  function handleSubmit(e) {
    let id = input.id
    console.log("idSubmit", id)
    if (input.id === "" || input.name === "" || input.contents === "" || input.image === "") {
      e.preventDefault();
      setError({
        ...error,
        name: "debes diligenciar todos lo input"
      })

    } else {
      e.preventDefault();
      dispatch(updateArticle(id, input));
      navigate('/blog')
    }

    //navigate(`/home/${type}/${name}/${userId}/${avatar}`);
  }



  return (
    
     
      <div>
      {allArticles.length ?
      
        <div className={styles.containerAll}>
           <NavBar/>
          <br />
          <br />
          <Link /* className={styles.btn} */ to='/admin'>
                        <button className={styles.btnBack}>Back</button>
                    </Link>
          <form>
            <div className={styles.containerFull}>
              <div className={styles.containerForm}>
                <div>
                  {/* <p className={input.id !== "" ? null : styles.error}>seleccione el articulo a editar</p> */}
                </div>
                {input.id !== "" ? input.name : <p className={styles.error}> Select the article to edit</p>}
                <select className={styles.select} name="id" onChange={(e) => handleSelect(e)}>
                  <option id="des" disabled>
                    Article...
                  </option>
                  {allArticles.map((e) => {
                    return (
                      <option name={e.name} value={e.id} id={e.id} key={e.id}>{e.name}{" "}</option>
                    );
                  })}
                </select>
                {/* {error.id && (<p className={styles.parrafo} >{error.id}</p>)} */}
                <p className={styles.error}>{error === "" ? null : error.id}</p>
                <div>
                  <label className={styles.label}>Title</label>
                  <input className={styles.input} name="name" type="text" placeholder="name" onChange={(e) => handleOnChange(e)} />
                </div>
                <div>
                  <label className={styles.label}>Content</label>
                  <textarea className={styles.input} name="contents" type="text" placeholder="contents" onChange={(e) => handleOnChange(e)} />
                </div>
                <div>
                  <label className={styles.label}>Image</label>
                  <input className={styles.input} name="image" type="text" placeholder="image" onChange={(e) => handleOnChange(e)} />
                </div>
                <div>
                  <button className={styles.btn} type="submit" padding="1rem 1rem" onClick={(e) => handleSubmit(e)}>PUBLISH</button>
                </div>
                {input.name !== "" && input.image !== "" && input.contents !== "" ? null : <p className={styles.error}>{error.name}</p>}
                {/*  <p className={styles.error}>{error.name === "" ? null : error.name}</p> */}
              </div>
              <div className={styles.containerArticle}>
                <div>
                  {input.name === "" ? <h1>(TITLE)</h1> : <h1>{input.name}</h1>}
                  {/* <p>{input.name ==="" ? TITULO : input.name}</p> */}
                  {input.image !== "" ? <img src={input.image} /* width='200px' */ height='200px' />
                    : <h1>(IMAGE)</h1>}
                  {input.contents === "" ? <h1>(CONTENT)</h1> : null}
                  <div className={styles.contenido}>
                    {input.name === "" ? null : <p>{input.contents}</p>}
                  </div>
                </div>
              </div>
              
            </div>
          </form>
          <Footer/>
        </div>
        :
        <div className={styles.loading}>
          <NavBar/>
          <img src={"https://i.pinimg.com/originals/5c/dd/ad/5cddadeb5ed4d48a582cfeb328160826.gif"} /* width='200px' height='200px' */ />
        </div>
      }
      </div>

    
  )
}