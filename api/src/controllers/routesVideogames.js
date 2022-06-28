const { Router } = require("express");
const router = Router();
const { Op } = require("sequelize");

//import DB MODELS
const { Videogame, Genre } = require("../db.js");

//------------------------------------------POST-----------------------------------------------------------
router.post("/", async (req, res) => {
  const {
    name,
    release_date,
    image,
    description,
    price,
    on_sale,
    free_to_play,
    short_screenshots,
    tags,
    esrb_rating,
    requirements,
    genres,
  } = req.body;

  try {
    let videogameCreate = await Videogame.create({
      name,
      description,
      release_date,
      image,
      rating: 3.0,
      price,
      on_sale,
      free_to_play,
      db_created: true,
      id: Math.ceil(Math.random() * 100000) * 35,
      short_screenshots,
      tags,
      esrb_rating,
      requirements,
    });

    if (genres) {
      let genresDb = await Genre.findAll({
        where: {
          name: genres,
        },
      });
      console.log(videogameCreate.id);

      videogameCreate.addGenre(genresDb);
    }

    res.send(`El videojuego ${req.body.name}, fue creado con exito`);
  } catch (error) {
    console.log(error);
  }
});

//---------------------------------------PUT-----------------------------------------------------------
router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const {
    name,
    release_date,
    image,
    description,
    price,
    on_sale,
    free_to_play,
    short_screenshots,
    tags,
    esrb_rating,
    requirements,
    genres,
  } = req.body;

  let condition = {};

  try {
    const videogame = await Videogame.findByPk(id);

    if (!videogame) {
      return res.send("No se encontró el videojuego");
    }
    if (name) {
      condition.name = name;
    }
    if (description) {
      condition.description = description;
    }
    if (release_date) {
      condition.release_date = release_date;
    }
    if (image) {
      condition.image = image;
    }
    if (price) {
      condition.price = price;
    }
    if (on_sale) {
      condition.on_sale = on_sale;
    }
    if (free_to_play) {
      condition.free_to_play = free_to_play;
    }
    if (short_screenshots) {
      condition.short_screenshots = short_screenshots;
    }
    if (esrb_rating) {
      condition.esrb_rating = esrb_rating;
    }
    if (tags) {
      condition.tags = tags;
    }
    if (requirements) {
      condition.requirements = requirements;
    }

    await videogame.update(condition);

    if (genres) {
      let genreDelete = await Genre.findAll({
        where: { name: { [Op.notLike]: `${genres}%` } },
      });
      let genresDb = await Genre.findAll({
        where: { name: { [Op.iLike]: `${genres}%` } },
      });

      await videogame.removeGenre(genreDelete);
      await videogame.addGenre(genresDb);
    }

    res.send("Datos del videojuego actualizado");
  } catch (error) {
    console.log(error);
  }
});


//-----------------------------------------DELETE-----------------------------------------------------------
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    let deleteVideogame = await Videogame.findByPk(id);

    if (!deleteVideogame) {
      res.status(404).send("No se encontró el videojuego");
    } else {
      await deleteVideogame.destroy();
      res.send("El videojuego fue borrado correctamente");
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
