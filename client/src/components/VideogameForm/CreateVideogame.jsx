import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getGenres, postVideogame, getEsrb } from "../../redux/actions/index.js";
import { useDispatch, useSelector } from "react-redux";
import './CreateVideogame.css'
import swal from 'sweetalert'
import {
  validateAlertName, validateAlertDescription, validateAlertdRelease, validateAlertMainImage,
  validateAlertShortScreeen, validateAlertFreeToPlay, validateAlertGenres, validateAlertEsrb, validateAlertRequeriments,
  validateAlertErrors
} from './alerts'
import NavBar from "../NavBar/navbar.jsx";



const regularExpresions = {
  date: /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/
};

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Please put a name for continue";
  } if (!input.description) {
    errors.description = "Please put a description for continue";
  } else if (regularExpresions.date.test(input.release_date) == false) {
    errors.release_date = ' You must enter date with "dd-mm-yyyy" format '
  } else if (input.price <= 0 || input.price === "whitOutPrice") {
    errors.price = "The price of the game must be greater than 0";
  } else if (input.free_to_play === "select") {
    errors.free_to_play = "Select if your game is free or not";
  }
  return errors;
}



export default function VideogameCreate() {
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);
  const esrb = useSelector((state) => state.esrb);
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    release_date: "",
    image: "",
    description: "",
    genres: [],
    tags: [],
    price: "whitOutPrice",
    short_screenshots: [],
    requirements: [],
    esrb_rating: "",
    free_to_play: "select",
    on_sale: false,
  });


  console.log(input)

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getEsrb());
  }, []);

  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.name && !errors.description && !errors.price && !errors.release_date && !errors.free_to_play) {
      validateAlertErrors()
    } {
      if (!input.name) {
        validateAlertName()
      } else if (!input.description) {
        validateAlertDescription()
      }
      else if (!input.release_date) {
        validateAlertdRelease()
      }
      else if (!input.image) {
        validateAlertMainImage()
      }
      else if (input.short_screenshots.length <= 3) {
        validateAlertShortScreeen()
      }
      else if (input.free_to_play == "select") {
        validateAlertFreeToPlay()
      }
      else if (input.genres.length < 1) {
        validateAlertGenres()
      }
      else if (!input.esrb_rating) {
        validateAlertEsrb()
      }
      else if (input.requirements.length < 1) {
        validateAlertRequeriments()
      }
      else {
        function alertSubmit() {
          swal({
            title: "Publish video game",
            text: "Are you sure you want to publish this game?",
            icon: "info",
            buttons: ["No", "Yes"]
          }).then(response => {
            if (response) {
              dispatch(postVideogame(input));
              setInput({
                name: "",
                release_date: "",
                image: "",
                description: "",
                genres: [],
                tags: [],
                price: "whitOutPrice",
                short_screenshots: [],
                requirements: [],
                esrb_rating: "",
                free_to_play: "select",
                on_sale: false,
              });
              swal({
                title: "Confirmed",
                text: "Gamed Created"
              })
              navigate("/home");
            }
          })
        }
        alertSubmit()
      }
    }
  };

  const handleImage = (e) => {
    let image = document.getElementById("main_image").value
    if (image != "") {
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
      if (input.short_screenshots.length <= 3) {
        {
          {
            setInput({
              ...input,
              short_screenshots: [...input.short_screenshots, image],
            });
          }
        }
      }
  };

  const handleDeleteShortImage = (e) => {
    setInput({
      ...input,
      short_screenshots: input.short_screenshots.filter((tag) => tag !== e),
    });
  };

  const handleFreeToPlay = (e) => {
    if (e.target.value !== "Select")
      if (e.target.value == "true") {
        setInput({
          ...input,
          free_to_play: true,
          price: 0
        });
      } else if (e.target.value == "false") {
        setInput({
          ...input,
          free_to_play: false,
          price: 0
        });
      }
  };

  const handleChangePrice = (e) => {
    setInput({
      ...input,
      [e.target.name]: parseFloat(e.target.value),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
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

  const handleEsrb = (e) => {
    if (e.target.value !== "Select ESRB")
      if (!input.esrb_rating.includes(e.target.value)) {
        setInput({
          ...input,
          esrb_rating: e.target.value,
        });
      }
  };

  const handleDeleteEsrb = (e) => {
    setInput({
      ...input,
      esrb_rating: "",
    });
  };

  const handleChangeRequirements = (e) => {
    {
      setInput({
        ...input,
        requirements: [e.target.value],
      });
    }
  };




  return (
    <div className="videogame_created_container">
      <Link to="/admin">
        <button>Back to Admin page</button>
      </Link>

      <p>Please fill out the following form with information about the video game you want to publish</p>

      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            <div>
              <div>
                <label>Name: </label>
                <input
                  className={errors.name ? "input_text_error" : "input_text"}
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
                  className={errors.description ? "input_text_error" : "input_text"}
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
                  className={errors.release_date ? "input_text_error" : "input_text"}
                  name="release_date"
                  type="text"
                  laceholder="DD-MM-YYYY"
                  value={input.release_date}
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
                  id="main_image"
                />
                <button
                  className="botonX"
                  onClick={(e) => handleImage(e)}
                  type="reset"
                >add Image
                </button>
                <div>
                  {input.image != "" ? (
                    <div >
                      <img src={input.image} className="image_form" />
                      <button
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

                <div >
                  <label> Insert 4 short screenshots</label>
                </div>
                <div>

                  <input
                    className="inputImage"
                    type="text"
                    placeholder="Insert url image"
                    name="short_screenshots"
                    id="Short-Image"
                  />
                  <button
                    className="botonX"
                    onClick={(e) => handleShortImage(e)}
                    type="reset"
                  >add Image
                  </button>
                </div>
                <div className="screenShots_Image">
                  {input.short_screenshots.map(e => (
                    <div>
                      <img src={e} alt="Image Not Fount" className="image_form" />
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

              <div>
                <label>
                  Free to play?
                </label>
                <select className="selectisfree" onChange={(e) => handleFreeToPlay(e)}>
                  <option value="Select" >Select:</option>
                  <option value={true}>YES</option>
                  <option value={false}>NO</option>

                </select>

              </div>
              <div>
                {input.free_to_play === false && (
                  <div>
                    <label className="labelPrice">Price: </label>
                    <input
                      className="inputPrice"
                      placeholder="Price.."
                      type='number'
                      value={input.price}
                      name="price"
                      onChange={(e) => handleChangePrice(e)}
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                    <label className="labelPrice">ARS$</label>
                  </div>
                )}

              </div>


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
            <div>
              <label>ESRB RATING: </label>
              <br />
              <select className="selectBox" onChange={(e) => handleEsrb(e)}>
                <option disabled={input.esrb_rating == ""} value={"Select ESRB"}>Select ESRB</option>
                {esrb.map((p) => (
                  <option className="optionTags" value={p.name}>
                    {p.name}
                  </option>
                ))}
              </select>
              <a href="https://www.esrb.org/ratings-guide/" target="_blank">More information</a>


            </div>



            <div>
              <br />
              <div>
                {input.esrb_rating != "" && (<div><span>{input.esrb_rating}</span>
                  <button
                    className="botonX"
                    onClick={() => handleDeleteEsrb()}
                    type="reset"
                  >
                    X
                  </button></div>)}

              </div>
            </div>
            <div>
              <label>Requirements: </label>
              <input
                className="inputDescription"
                type="text"
                placeholder="Requirements.."
                value={input.requirements}
                name="description"
                onChange={(e) => handleChangeRequirements(e)}
              />

            </div>

            {errors.name && <p className="error">{errors.name}</p>}
            {errors.description && <p className="error">{errors.description}</p>}
            {errors.release_date && <p className="error">{errors.release_date}</p>}


            <button className="botonCrear" type="submit">
              Public Videogame
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
