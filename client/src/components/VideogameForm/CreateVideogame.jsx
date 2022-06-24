import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGenres, getTags, postVideogame } from "../../redux/actions/index.js";
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
    genre: [],
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
    dispatch(getTags());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.value]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.value]: e.target.value,
      })
    );
  };

  const handleGenre = (e) => {
    if (e.target.value !== "Seleccione Género/s")
      if (!input.genre.includes(e.target.value)) {
        setInput({
          ...input,
          genre: [...input.genre, e.target.value],
        });
      }
  };

  const handleTags = (e) => {
    if (e.target.value !== "Seleccione Tags")
      if (!input.tag.includes(e.target.value)) {
        setInput({
          ...input,
          tag: [...input.tag, e.target.value],
        });
      }
  };

  const handleDeleteGenre = (e) => {
    setInput({
      ...input,
      genre: input.genre.filter((ge) => ge !== e),
    });
  };

  const handleDeleteTags = (e) => {
    setInput({
      ...input,
      tag: input.tag.filter((t) => t !== e),
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
          genre: [],
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

      <h1>Crear Nuevo Videojuego</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <input
            className="inputName"
            type="text"
            name="name"
            placeholder="Name.."
            value={input.name}
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputDescription"
            type="text"
            placeholder="Descripción.."
            value={input.description}
            name="description"
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputReleased"
            type="text"
            placeholder="dd-mm-yyyy.."
            value={input.released}
            name="released"
            onChange={(e) => handleChange(e)}
          />

          <input
            className="inputImage"
            type="text"
            placeholder="Imagen.."
            value={input.image}
            name="image"
            onChange={(e) => handleChange(e)}
          />

          <label className="labelRating">Rating: </label>
          <input
            className="inputRating"
            placeholder="Rating.."
            type="number"
            value={input.rating}
            name="rating"
            onChange={(e) => handleChange(e)}
          />

          <label className="labelPrice">Price: </label>
          <input
            className="inputPrice"
            placeholder="Price.."
            type='number'
            value={input.price}
            name="price"
            onChange={(e) => handleChange(e)}
          />
        </div>

        <div>
          <label className="labelGenres">Géneros: </label>
          <br />
        </div>

        <select className="selectBox" onChange={(e) => handleGenre(e)}>
          <option disabled={input.genre.length > 0}>Selecciona Género</option>
          {genres.map((g) => (
            <option value={g.name}>{g.name}</option>
          ))}
        </select>

        <div>
          <br />
          {input.genre.map((e) => (
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

        <br />
        <div>
          <label>Tags: </label>
          <br />
          <select className="selectBox" onChange={(e) => handleTags(e)}>
            <option disabled={input.tags.length > 0}>Selecciona Tag</option>
            {tags.map((p) => (
              <option className="optionTags" value={p.name}>
                {p.name}
              </option>
            ))}
          </select>

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
        </div>

        {errors.name && <p className="error">{errors.name}</p>}
        {errors.description && <p className="error">{errors.description}</p>}
        {errors.released && <p className="error">{errors.released}</p>}
        {errors.rating && <p className="error">{errors.rating}</p>}

        <button className="botonCrear" type="submit">
          Crear Videojuego
        </button>
      </form>
    </div>
  );
}
