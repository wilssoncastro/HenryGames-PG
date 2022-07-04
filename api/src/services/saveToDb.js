
const { Genre, Esrb } = require('../db')
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env
const { Sale} = require('../db.js');
const { Article} = require('../db.js');


async function genres(){
    
    console.log('Guardando generos en base de datos')
    console.log('Espera por favor...')
    const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = (allGenres.data.results)
    let generos =  genres.map(g=> {
       Genre.create(
        {
          name: g.name       
        }
  
      )
    })
      await Promise.all(generos)
        console.log('Generos guardados')
        console.log('Back levantado exitosamente✔️ , PUEDES SEGUIR CODEANDO!')
        
  }
  async function esrb(){
    console.log("guardando Esrb Ratings")
    
  let allRatings = ["Everyone", "Everyone 10+", "Teen", "Mature", "Adults Only", "Rating Pending"]

        allRatings.forEach(Rate => {
            Esrb.findOrCreate({
                where: {name: Rate}
            })
        })
        console.log('Esrb Ratings guardados')
        
  }


  //con esta funcion cargo la base de datos con articulos para el Blog
  async function addArticle(){

    const articles = [
        {
            name:"Cómo funcionan los 1000 planetas de 'Starfield': Bethesda desvela el secreto del inmenso universo del juego",
            contents:"De entre las revelaciones más interesantes que Bethesda y Microsoft hicieron sobre su futuro juego de exploración espacial 'Starfield', había una cifra que llamó la atención: el juego tendría la friolera de mil planetas que explorar, cada uno con sus propias características físicas, fauna y flora. Bethesda, compañía que tiene en su cartera franquicias de la envergadura de 'The Elder Scrolls' y 'Fallout', sabe lo que es enfrentarse a mundos ingentes... pero hasta ahora se habían restringido a un solo planeta. Por supuesto, Bethesda no va a programar uno a uno cada lugar donde puede aterrizar el jugador de 'Starfield'. En una entrevista con IGN, el director del juego, Todd Howard, ha explicado cómo funcionará esta espectacular característica del título. La clave, aunque tiene sus matices, como muchos jugadores pueden suponer, está en la generación procedimental, un procedimiento que ya puso en práctica con 'Skyrim'.Sin embargo, Howard comenta también que no todos los planetas tienen la misma cantidad de contenido, y habrá algunos más poblados y con más misiones que cumplir en ellos. Lo que sí asegura Todd Howard es que será una experiencia dominada solo parcialmente por la generación procedimental, ya que 'Starfield' es el juego con más contenido hecho a mano en el que se han embarcado hasta ahora: cuenta con 200.000 líneas de diálogo y una buena parte de diseño hecho de forma tradicional.",
            image:"https://i.blogs.es/e70d60/starfield/1366_2000.jpeg",
        },
        {
            name: "Cómo Shin Chan, un fenómeno pensado por y para Japón, ha terminado llegando a Switch y PS4 en Europa",
            contents:"La editora Neos Corporation y la desarrolladora Millennium Kitchen han anunciado que el videojuego de las vacaciones de Shin Chan, que recibe el ostentoso título de 'Shin-chan: Me and the Professor on Summer Vacation – The Endless Seven-Day Journey', va a ser publicado fuera de Japón, lo que excede las intenciones iniciales de un juego que estaba pensado únicamente para aquel mercado. Pero... ¿cómo ha pasado? ¿Por qué en una industria en la que centenares de videojuegos quedan inéditos en Occidente precisamente este nos llega a España?La fama de Shin Chan. El nuevo videojuego de Shin Chan llegará no solo a Nintendo Switch, para donde ya había sido anunciado, sino también para Playstation 4 en agosto. No lo hará completamente localizado, sino con textos traducidos y subtítulos para los diálogos en inglés, japonés, alemán, español y portugués. Eso ya nos da una pista de a qué mercados apunta esta exportación más o menos inesperada: por ejemplo, el producto no incluye textos en francés. La serie de manga original fue creada en 1992, obra de Yoshito Usui, que ha vendido más de 148 millones de copias en todo el mundo. Cuando el autor falleció en 2009, la serie se interrumpió momentáneamente, pero volvió a publicarse un año después, a manos del equipo de ayudantes de Usui. Sin embargo, lo que dio fama internacional al personaje de Shinnosuke Nohara fue la corrosiva adaptación a serie de televisión.",
            image:"https://i.blogs.es/e7abcf/66271-s2/1366_2000.jpeg",

        },
        {
            name:"Return to Monkey Island' confirma el gran giro visual de la mítica franquicia. Y es bastante arriesgado",
            contents:"En el evento de Nintendo dedicado a las third parties que van a publicar próximamente en la Switch ha habido tiempo de todo: de franquicias que han explicado sus mecánicas para nuevas entregas, como 'Mario + Rabbids - Sparks of Hope' a regresos de iconos clásicos del videojuego, como Bomberman, Pac-Man o Sonic. Ha habido tiempo hasta para una inesperada incursión (¡ya disponible!) de la saga 'Portal' en Nintendo Switch. Aunque sin duda el anuncio más notable ha sido el de 'Return to Monkey Island', que ha dejado ver unas cuantas imágenes en movimiento del regreso a las andadas de Guybrush Threepwood auspiciadas por su creador original, el mítico Ron Gilbert. Y lo hace con un anuncio: el juego será exclusivo (muy posiblemente de forma temporal) en Nintendo Switch, en lo que respecta a consolas. Por lo demás, el trailer que se ha presentado en el Nintendo Direct no ha desvelado nada acerca del argumento más allá de que vuelven escenarios muy familiares para los fans de la saga, y también un villano temible: el mismísimo LeChuck, rediseñado para la ocasión con el característico grafismo de esta nueva entrega. Porque lo que también queda claro es que esta entrega será visualmente muy diferente. Más allá del pixel-art de las primeras entregas y de algunas secuelas poligonales, esta nueva entrega opta por una estética estilo collage que nunca antes se había visto en la serie. La expresividad extrema, casi de dibujos animados, que caracterizaba a las aventuras gráficas de LucasArts, es sustituida por una rigidez que no está claro aún si encajará al cien por cien con el espíritu de la saga.",
            image:"https://i.blogs.es/b5600e/return-to-monkey-island-screen-alt1/1366_2000.jpeg",
        },
        
        {
            name:"Trailer de 'Final Fantasy VII Remake Parte 2', exclusivo para PS5 el año que viene, y que ya anuncia tercera entrega",
            contents:"Finalmente, como cierre del breve evento del 25 aniversario de 'Final Fantasy VII', llegó el trailer de la segunda parte del remake del clásico, que finalmente recibirá el título de 'Final Fantasy VII Rebirth'. Y se apuntó una fecha aproximada para su lanzamiento: el próximo invierno, como escuetamente concluyó Square Enix. También se desveló cuántos episodios compondrían este remake del que es, posiblemente, uno de los juegos más queridos y mitificados de la franquicia. Ahora que el juego ha ido avanzando y Square Enix ha podido planificar el resto de la historia, ha afirmado que la saga se compondrá de tres partes, que el tercer capítulo ya ha comenzado su desarrollo, y que por la propia naturaleza de estos episodios, en los que se tiene una hoja de ruta muy definida, el desarrollo avanza muy rápido.",
            image:"https://i.blogs.es/e4188b/02_ff7rebirth_screenshot/500_333.jpeg",
        },
        {
            name:"Xbox Cloud Gaming ya está dentro de los televisores de Samsung: estas son nuestras primeras impresiones",
            contents:"Ya está aquí. El repositorio de videojuegos 'Gaming Hub' anunciado por Samsung durante la última edición del CES acaba de llegar a sus televisores de 2022. Y lo ha hecho con una promesa bajo el brazo: mejorar la experiencia de los usuarios de estos televisores que disfrutamos con los videojuegos. No obstante, esto no es todo. Junto a este software han llegado también varios servicios de juego vía streaming, así que no hemos dejado escapar la oportunidad de poner a prueba uno de ellos: Xbox Cloud Gaming. El televisor que hemos utilizado es el actual modelo insignia de Samsung, el Neo QLED QN900B 8K con retroiluminación mini LED.",
            image:"https://i.blogs.es/15ee26/xboxsamsung-ap/1366_2000.jpeg",
        },
        {
            name:"El juego que me he descargado ni se parece al del anuncio que vi en Instagram: no eres tú, es una práctica habitual (y lucrativa)",
            contents:"Seguro que entre instastorie e instastorie te han salido anuncios de algún juego para el móvil. Las imágenes muestran animaciones 3D en las que tienes que arreglar una casa mediante estrategia o bien juegos de aventura en los que eres un pirata que conquista barcos. Sin embargo, una vez que descargas el juego descubres que nada tiene que ver con el anuncio que te ha pescado para probar el juego. Te encuentras con juegos a lo match-3, al estilo de Candy Crush, o juegos de gestión de recursos en 2D. Lleva ocurriendo desde 2019 y es una práctica que no ha pasado desapercibida en redes. Hay decenas de vídeos en Youtube de comparaciones de los anuncios con los juegos reales, recibiendo duras críticas. Puede parecer que es una estrategia un tanto “cutre” o con poco recorrido, pero la realidad es que se ha postulado como una estrategia de márketing generalizada en la industria. Todos saben que existe y todos (o casi todos) la han practicado alguna vez. Hoy la desgranamos para contar todo lo que hay detrás. El primer juego con el que se hizo esta estrategia fue Matchington Mansion, o al menos el primero que se ha registrado. Es un juego de match-3 (puzle que trata de formar combinaciones de tres o más fichas de un mismo tipo o color) creado por unos desarrolladores prácticamente desconocidos, pero que empezaron a pisar los talones al mismísimo Playrix (empresa rusa que está tras Gardenscapes y Homescapes). ¿Cómo lo hicieron? Creando una campaña súper agresiva de márketing con unos anuncios muy llamativos aunque no concordaran al 100% con el juego final. En este artículo de Deconstructor of Fun lo analizan paso a paso. En 2019 llegaron a 15 millones de dólares en ingresos netos (actualmente son 5 millones de dólares), pero su éxito no solo se vio reflejado en números, sino que la misma Playrix les copió la estrategia con Gardenscapes y Homescapes. De hecho, en 2020 ASA (Advertising Standards Authority, la agencia que fija los estándares publicitarios en Reino Unido) penalizó a Playrix por difundir esos mismos anuncios por considerarlos “engañosos”. La estrategia parece simple: mostrar un anuncio muy atractivo a la gente, un anuncio “falso”, y conseguir descargas. Sin embargo, hay mucho más. Por una parte, estos anuncios siempre corresponden a juegos que ya tienen millones de descargas de base; por otro, nos hemos encontrado incluso con la sorpresa de que los anuncios son mucho más “feos” que el juego original.",
            image:"https://i.blogs.es/a097c4/foto-2/1366_2000.jpg",
        },
        {
            name:"Microsoft Edge se vuelve jugón: añade opciones para disfrutar más de xCloud y juegos Free-to-play",
            contents:"El navegador web de Microsoft quiere ser un navegador para gamers. Las nuevas opciones de la versión 103 de Microsoft Edge permiten que accedamos más fácil y directamente que nunca al juego en la nube e incluso a juegos gratuitos. La apuesta de Microsoft es interesante: al abrir una nueva pestaña podremos acceder al apartado 'Gaming' desde el que se muestran noticias y accesos a juegos sencillos en formato Free-to-play. Y para los que juegan a videojuegos en la nube con Xbox Cloud Gaming (xCloud), llega Clarity Boost, que mejora la calidad visual de la experiencia. En esa nueva sección 'Gaming' se aprovecha la interfaz de usuario de las Xbox y se presentan noticias, guías de juego, emisiones en directo, torneos o novedades de lanzamientos en este segmento. Además podremos en todo momento acceder al menú Juegos (Games). Al hacerlo se abrirá un panel lateral con una selección de videojuegos arcade y free-to-play entre los que están 'Microsoft Jewel', 'Mahjongg Dimensions', 'Deal or no Deal', 'Cubis', 'Battleship' y 'Surf Game'. Los suscriptores de Xbox Game Pass Ultimate que disfrutan de las opciones de juego en la nube también tienen una noticia interesante: la llegada de la opción Clarity Boost, que había estado disponible en versiones preliminares del navegador, y que permite que los juegos en streaming se vean con más claridad y definición que en otros navegadores.",
            image:"https://i.blogs.es/93349d/captura-de-pantalla-2022-06-24-a-las-8.26.38/1366_2000.jpeg",
        },
        {
            name:"Atari cumple 50 años y lanza dos nuevos cartuchos para la mítica Atari 2600: son más caros que cualquier juego actual",
            contents:"A Nolan Bushnell y a Ted Dabney les parecía que eso de los videojuegos tenían futuro. Ahora aquella percepción parece obvia, pero en 1972 tenía un punto de locura. Les dio igual: crearon Atari y la convirtieron en una de las empresas legendarias de este segmento. Ahora acaban de cumplir 50 años, y lo han hecho con una pequeña pero singular celebración. Una historia convulsa. Todo empezó con 'Pong', y el lanzamiento de su consola VCS —popularmente conocida como la Atari 2600— fue uno de los grandes detonantes de la industria de los videojuegos. Luego llegarían desastres como el de 'E.T.' y fracasos de máquinas como la Atari Jaguar.Atari se reinventa (o lo intenta). Tras pasar por varias manos y ser adquirida y readquirida por varias empresas, hoy en día Atari está formada por dos divisiones: una que trata de desarrollar nuevas versiones de sus juegos clásicos y al parecer quiere convertirse en desarrolladora de nuevos títulos para PC. La otra que se dedica a productos relacionados con la cadena de bloques. Uf. 50 años después. La empresa ha pasado a un segundo plano en el terreno de los videojuegos de primer nivel y su papel ahora es el de una empresa que en esencia vive de su pasado. Lo demuestra el lanzamiento de la retroconsola Atari VCS, que tardó en llegar y que además lo hizo a un precio elevado (400 dólares). La nostalgia era una vez más el argumento fundamental, como con otros productos en esta línea. En su sitio web dedicado a ese 50 aniversario queda claro cómo todo está centrado en su legado como pionera, y no tanto en su papel actual, mucho más dedicado al retrogaming. O a la construcción de un hotel temático, algo sorprendente para una empresa de este tipo. Cartuchos físicos, una idea curiosa... Lo cierto es que a Atari se le ha ocurrido una idea curiosa para celebrar este aniversario: han lanzado dos cartuchos para la Atari 2600 en edición limitada. Son una reedición de los míticos 'Missile Command' y 'Adventure'.",
            image:"https://i.blogs.es/aabc58/captura-de-pantalla-2022-06-29-a-las-13.40.24/1366_2000.jpeg",
        },
        {
            name:"'Teenage Mutant Ninja Turtles: Shredder's Revenge': el encanto pixelado de los mejores brawlers de los 80",
            contents:"Para qué negarlo: desde que mostró sus primeros vídeos, este nuevo juego de las Tortugas Ninja nos cautivó por su descomunal colorido y por lo genuinamente fiel que pretendía ser a la estética y las mecánicas de los mejores arcades de los personajes. Juegazos como la recreativa de Konami de 1989, 'Turtles in Time', 'TMNT' en Game Boy Advance y otras joyas no tan conocidas, como 'TMNT 3: The Radical Rescue' de Game Boy o 'TMNT: Hyperstone Heist' de Mega Drive, entre muchos otros. Son un total de veintibastantes juegos distintos (sin contar la múltiples conversiones, en algunos casos a un buen puñado de formatos para cada título), unos mejores, otros peores (casi nunca terribles), pero siempre sinónimos de acción y diversión, también muy a menudo con trompazos multijugador a bordo. Este 'Teenage Mutant Ninja Turtles: Shredder's Revenge' parece haber tomado buena nota de lo que caracteriza a la franquicia y lo ha potenciado. Sin complicarse la vida en lo conceptual (nada de elementos RPG, unos pequeñísimos toques de aventura en el Modo Historia, donde hay partes que pueden considerarse muy generosamente misiones secundarias), 'Shredder's Revenge' va al grano. Y lo hace siendo sumamente respetuoso con el grafismo que se espera de un juego inspirado en la serie de animación de los ochenta, y rediseñando personajes y mecánicas de combate. En lo visual 'Shredder's Revenge' es una auténtica delicia. Sin llegar a la agresividad o la radicalidad de hitos recientes del género, como el magistral 'Streets of Rage 4' o 'Battletoads' (significativamente, también recuperaciones de iconos del género de los ochenta), el rediseño sutil de los personajes, acercando la textura del píxel al estilo redondeado del cartoon convierte al juego en una pequeña maravilla estética. Brillan de forma especial los escenarios, rebosantes de detalles, herederos directos de tantos brawlers de recreativa y sin tramos repetitivos: todos evolucionan y van cambiando según se avanza por ellos. Una auténtica gozada que encuentran la guinda en las fantásticas animaciones: cada personaje no solo tiene distintas velocidades potencia y resistencia, sino que cuenta con golpes y ténicas propias y que sirven para dotar de personalidad a las cuatro tortugas, la rata Splinter y los dos personajes humanos, April y Casey.",
            image:"https://i.blogs.es/5ed5b1/tmnt-shredders-revenge-screenshot-06-en-27jan22/1366_2000.jpeg",
        },
        {
            name:"Por qué estamos obsesionados con hacer que 'Doom' funcione en los sitios más random",
            contents:"En 1992 id Software lanzaba 'Wolfenstein 3D' y cambiaba la historia de los videojuegos. El género FPS (First-Person Shooter) se convertía en un fenómeno absoluto, y tras el llegaría dos títulos aún más míticos, 'Doom' y 'Quake'. La franquicia ha conquistado a millones de jugadores y ha contado con numerosas secuelas, pero lo curioso es que el 'Doom' original se ha convertido en un reto para los desarrolladores que querían poder jugarlo no en ordenadores, sino casi en cualquier cosa gobernada por chips. De hecho hay una pregunta convertida en meme cuando se lanza cualquier nuevo dispositivo electrónico. ¿Puede correr 'Doom'? Así es. Desde hace un tiempo, cada vez que se presenta algún nuevo producto tecnológico, alguien acaba preguntando si se podrá jugar a Doom en él. Antes la pregunta estaba orientada a ordenadores y consolas, pero con los años la potencia de incluso dispositivos mucho más modestos también ha acabado generando esa misma pregunta entre algunos desarrolladores. Correr 'Doom' en casi cualquier cosa era una mezcla entre reto de desarrollo —el código fuente está disponible desde hace años— y demostración de que a estas alturas efectivamente cualquier dispositivo puede acabar ejecutando este juego. Aunque no esté pensado para eso en absoluto. Primero fueron las versiones normales. El videojuego se lanzó inicialmente para MS-DOS en 1993, pero pronto aparecerían versiones para Windows —Bill Gates hasta pensó en adquirir id Software—, Linux, Mac OS (1994), o consolas como la SNES y la PlayStation (1995), la 3DO (1996), o la Sega Saturn (1997). Luego llegaría el 'port' ('versión adaptada') para la Game Boy Advance (2001), la Xbox 360 (2006), los móviles iOS (2009) o la Nintendo Switch (2019). Pero hay más sitios en los que se puede correr 'Doom'. Muchos más. Luego llegó la locura: 'Doom' hasta en un test de embarazo. Hemos visto cómo 'Doom' no paraba de llegar a más y más productos relacionados con la tecnología directa o indirectamente. La evolución ha sido asombrosa y básicamente demuestra que a estas alturas 'Doom' puede correr prácticamente en cualquier producto. Lo hemos visto en un Porsche 911, en el C64, en el MP3 SanDisk Sansa Clip, en el robot de cocina de Lidl, en un PC con Windows 95... creado en Minecraft, en un Apple Watch, en un iPod nano, en una Raspberry Pi, en una calculadora de TI alimentada por patatas, en un cajero automático, en una impresora, en una consola hiperbarata para niños, en la TouchBar de los MacBook Pro, en un piano, en una Game & Watch, en un osciloscopio (aunque es 'Quake', no 'Doom'), en un viejo móvil de Sony, y hasta en un test de embarazo. Hay más, claro, y no es difícil adivinar dónde ir encontrando nuevos sitios en los que sorprenderse y en los que la gente consigue que corra 'Doom'. Es, por supuesto, en el subrredit r/itrunsdoom. ¿Por qué la gente hace esto? Hay multitud de razones, pero probablemente la más clara sea otra pregunta. ¿Por qué no? 'Doom' es Open Source, está escrito en C, un lenguaje que dispone de compiladores en todo tipo de plataformas, ese código se ha ido actualizando y es especialmente eficiente y se ha convertido en ese 'Hello World' de los videojuegos. Para muchos desarrolladores es una buena forma de demostrarse a sí mismos que pueden lograrlo. No solo eso: para esos desarrolladores es reto es también divertido, y dado que 'Doom' es un fenómeno cultural, conseguir que se ejecute en algún nuevo dispositivo puede acabar dando cierta reputación al desarrollador. ¿Qué más se puede pedir?",
            image:"https://i.blogs.es/bfb53a/captura-de-pantalla-2022-06-22-a-las-11.02.01/1366_2000.jpeg",
        },
        {
            name:"Valve aumenta la producción de la Steam Deck y anuncia que doblará los envíos semanales",
            contents:"Buenas noticias para todas aquellas personas que están esperando para comprar una Steam Deck. Valve acaba de anunciar que ha aumentado la producción de su consola portátil, lo que se traduce en un aumento de más del doble de los envíos semanales. Además, a través de una publicación en su cuenta oficial de Twitter, la compañía asegura que ha terminado de enviar los correos electrónicos de reserva del segundo trimestre, y que a partir del día 30 de junio empezará a enviar los que corresponden a tercer trimestre. Cabe señalar que Valve había planeado empezar a enviar las primeras unidades de Steam Deck en diciembre de 2021. Sin embargo, debido a los problemas de la cadena de suministro, la compañía cambió la fecha de lanzamiento a febrero de este año. Desde febrero se han estado enviando consolas, pero a un ritmo por debajo de lo esperado. Ahora, la compañía parece haber podido superar algunos de los obstáculos que le impedían conseguir los componentes necesarios para aumentar la producción de su consola portátil. Una vez que la Steam Deck es reservada en la página de Valve, los interesados son incluidos en una lista de espera basada en el orden del pedido. Una vez haya stock disponible, recibirán un correo electrónico que les permitirá avanzar con el proceso. El aumento en la producción podría significar más correos electrónicos. Una vez que alguien ha recibido uno, tiene 72 horas para realizar la compra. Recordemos que la Steam Deck se ofrece en tres ediciones con distintos extras: 64 GB (419 euros), 256 GB (549 euros) y 512 GB (679 euros).",
            image:"https://i.blogs.es/8e6855/steam-deck-1/1366_2000.jpeg",
        },
        {
            name:"El nuevo PlayStation Plus llega a España: comparativa de suscripciones, precios y todos los juegos disponibles",
            contents:"Pues ya está aquí. Tras ser anunciado hace algunos meses y haber llegado paulatinamente a varias regiones, el nuevo PlayStation Plus ya está disponible en España para todos. Como ya sabíamos, el nuevo PlayStation Plus combina la suscripción PS Plus y PS Now y ofrece tres niveles de suscripción, a cada cual con más ventajas. A continuación vamos a repasar todas las opciones disponibles, qué precio tiene cada una, sus diferencias, qué pasa si ya tienes una suscripción activa y, por supuesto, el catálogo de juegos disponibles de lanzamiento. Sin más dilación, comenzamos. Si ya tienes una suscripción activa de PS Plus, automáticamente pasarás a tener PS Plus Essential. Si además de PS Plus estabas pagando por PS Now, tu suscripción cambiará a PS Plus Premium, el nivel más alto. Aquí cabe destacar que habrá una nueva fecha de pago única en función de la suscripción que termine más tarde.",
            image:"https://i.blogs.es/af90f5/1366_2000/1366_2000.jpeg",
        },
    ]


    try {
        const newArticle= await Article.bulkCreate(articles)
        //return newArticle
    } catch (error) {
        console.log("error", error)
    }
    
    

    
  }

 



module.exports = {genres ,esrb, addArticle}