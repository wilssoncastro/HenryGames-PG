import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGenres, postVideogame } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";


const regularExpresions = {
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
};

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Please put a name for continue";
  } else if (!input.description) {
    errors.description = "Please put a description for continue";
  } else if (!regularExpresions.date.test(input.released)) {
    errors.released = "Please enter a valid released date to continue";
  } else if (parseFloat(input.rating) < 1 || parseFloat(input.rating) > 5) {
    errors.rating = "The rating must be a number from 1 to 5";
  } /*else if ( VALIDACION PRICE ){

  }*/
  return errors;
}

export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const tags = useSelector((state) => state.tags);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    released: "",
    image: "",
    rating: 0,
    description: "",
    genres: [],
    tags: [],
    price: 0,
    short_screenshots: [],
    requirements: [],
    esrb_ratings: [],
    /*  free_to_play: false,       //! Verificar como va     
     on_sale: false, */            //! Verificar como va                  
  });



  useEffect(() => {
    dispatch(getGenres());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  };

  const handleImage = (e) => {
    let image = document.getElementById("main_image").value
    if (image != "")
      {
        {
          setInput({
            ...input,
            image: image,
          });
        }
      }
  };
  const handleDeleteImage = (e) => {
    setInput({
      ...input,
      image: ""
    });
  };

  const handleShortImage = (e) => {
    let image = document.getElementById("Short-Image").value
    if (image != "")
    if(input.short_screenshots.length <= 3){
      {{setInput({
            ...input,
            short_screenshots: [...input.short_screenshots, image],
          });
      }}
    }
  };

  const handleDeleteShortImage = (e) => {
    setInput({
      ...input,
      short_screenshots: input.short_screenshots.filter((tag) => tag !== e),
    });
  };

  const handleGenre = (e) => {
    if (e.target.value !== "Seleccione Género/s")
      if (!input.genres.includes(e.target.value)) {
        setInput({
          ...input,
          genres: [...input.genres, e.target.value],
        });
      }
  };

  const handleDeleteGenre = (e) => {
    setInput({
      ...input,
      genres: input.genres.filter((ge) => ge !== e),
    });
  };

  const handleTags = (e) => {
    let valorTag = document.getElementById("tags").value

    if (valorTag != [])
      if (!input.tags.includes(valorTag)) {
        {
          setInput({
            ...input,
            tags: [...input.tags, valorTag],
          });
        }
      }

  };

  const handleDeleteTags = (e) => {
    setInput({
      ...input,
      tags: input.tags.filter((tag) => tag !== e),
    });
  };




  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name &&
      !errors.description &&
      !errors.rating &&
      !errors.released
    ) {
      if (!input.name) {
        alert("El videojuego debe tener un nombre");
      } else if (!input.description) {
        alert("El videojuego necesita una descripción");
      } else if (!input.released) {
        alert("La fecha es inválida");
      } else if (input.genre.length < 1) {
        alert("El videojuego debe tener mínimo un género");
      } /* else if (input.tags.length < 1) {
        alert("El videojuego debe tener mínimo un tag");
      }  */else {
        dispatch(postVideogame(input));
        alert("Videojuego creado correctamente");
        setInput({
          name: "",
          description: "",
          image: "",
          rating: 0,
          released: "",
          on_sale: false,                           //*  hacer validaciones      
          price: 0,                                 //*  hacer validaciones
          free_to_play: false,                      //*  hacer validaciones
          genres: [],
          tags: [],
          short_screenshots: [],                    //*  hacer validaciones
          requirements: [],                         //*  hacer validaciones
          esrb_ratings: "Rating Pending",           //*  hacer validaciones
        });
        navigate("/home");
      }
    }
  };

  return (
    <div>
      <Link to="/home">
        <button>Regresar a Página Principal</button>
      </Link>

      <h2>THANK YOU FOR CHOOSING HENRY GAMES TO PUBLISH YOUR VIDEO GAME!</h2>
      <p>Please make sure to read our terms and conditions below:</p>
      <Link to="/home">
        <button>Terms and conditions</button>
      </Link>
      <p>Please fill out the following form with information about the video game you want to publish</p>


      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Videogame name"
                value={input.name}
                onChange={(e) => handleChange(e)}
              />

            </div>
            <div>
              <label>Description</label>
              <input
                className="inputDescription"
                type="text"
                placeholder="Descripción.."
                value={input.description}
                name="description"
                onChange={(e) => handleChange(e)}
              />

            </div>
            <div>

              <label>Release date</label>
              <input
                className="inputReleased"
                type="text"
                placeholder="dd-mm-yyyy.."
                value={input.released}
                name="released"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div>
              <label>Main image</label>
              <input
                className="inputImage"
                type="text"
                placeholder="Main Image"
                name="image"
                id= "main_image"
              />
              <button
              className="botonX"
              onClick={(e) => handleImage(e)}
              type="reset"
            >add Image
            </button>
            <div>
              {input.image != ""? (
              <div>
              <img src={input.image} /> <button
                  className="botonX"
                  onClick={(e) => handleDeleteImage(e)}
                  type="reset"
                >
                  X
                </button>
                </div>
                ) : ""
              }           
           
            </div>
            </div>

            <div>

              <div>
              <label> Insert 4 short screenshots</label>
              </div>
              <div>
            
              <input
                className="inputImage"
                type="text"
                placeholder="Insert url image"
                name="short_screenshots"
                id= "Short-Image"                
              />
              <button
              className="botonX"
              onClick={(e) => handleShortImage(e)}
              type="reset"
            >add Image
            </button>
              </div>
              <div>
                {input.short_screenshots.map(e=>(
                  <div>
                   <img src={e} alt="Image Not Fount" />
                   <button
                  className="botonX"
                  onClick={() => handleDeleteShortImage(e)}
                  type="reset"
                >
                  X
                </button>
                  </div>
                ))}
              </div>
              
            </div>
            {/*        
la persona no puede calificar su porpio juego!!! poner el el post que el rating sea 3 automatico
          <label className="labelRating">Rating: </label>
          <input
            className="inputRating"
            placeholder="Rating.."
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          /> */}

            <label className="labelPrice">Price: </label>
            <input
              className="inputPrice"
              placeholder="Price.."
              type='number'
              value={input.price}
              name="price"
              onChange={(e) => handleChange(e)}
            />
            <label className="labelPrice">ARS$</label>
          </div>

          <div>
            <label className="labelGenres">Genres: </label>
            <br />
          </div>

          <select className="selectBox" onChange={(e) => handleGenre(e)}>
            <option disabled={input.genres.length > 0}>Selecciona Género</option>
            {genres.map((g) => (
              <option value={g.name}>{g.name}</option>
            ))}
          </select>

          <div>
            <br />
            {input.genres.map((e) => (
              <div>
                <span>{e}</span>
                <button
                  className="botonX"
                  onClick={() => handleDeleteGenre(e)}
                  type="reset"
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <div>
            <label>Tags</label>
            <input
              className="input"
              id="tags"
              type="text"
              placeholder="Write a tag for your game..."
              name="tags"


            />
            <button
              className="botonX"
              onClick={(e) => handleTags(e)}
              type="reset"
            >add tag
            </button>
          </div>


          <div>
            <br />
            {input.tags.map((e) => (
              <div>
                <span>{e}</span>
                <button
                  className="botonX"
                  onClick={() => handleDeleteTags(e)}
                  type="reset"
                >
                  X
                </button>
              </div>
            ))}
          </div>


          <br />
          {/* <div>
          <label>Tags: </label>
          <br />
          {/* <select className="selectBox" onChange={(e) => handleTags(e)}>
            <option disabled={input.tags.length > 0}>Selecciona Tag</option>
            {tags.map((p) => (
              <option className="optionTags" value={p.name}>
                {p.name}
              </option>
            ))}
          </select>  

          
        </div> */}

          {errors.name && <p className="error">{errors.name}</p>}
          {errors.description && <p className="error">{errors.description}</p>}
          {errors.released && <p className="error">{errors.released}</p>}
          {errors.rating && <p className="error">{errors.rating}</p>}

          <button className="botonCrear" type="submit">
            Public Videogame
          </button>
        </form>
      </div>
    </div>
  );
}
