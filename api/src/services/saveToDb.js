const { Genre, Esrb } = require('../db')
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env
const { Sale} = require('../db.js');
const { Article} = require('../db.js');


async function genres(){
    
    console.log('Guardando generos en base de datos')
    console.log('Espera por favor...')
    //const allGenres = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`)
    let genres = [
        {
        "id": 1,
        "name": "Action"
        },
        {
        "id": 2,
        "name": "Adventure"
        },
        {
        "id": 3,
        "name": "Indie"
        },
        {
        "id": 5,
        "name": "Strategy"
        },
        {
        "id": 4,
        "name": "RPG"
        },
        {
        "id": 6,
        "name": "Shooter"
        },
        {
        "id": 7,
        "name": "Casual"
        },
        {
        "id": 8,
        "name": "Simulation"
        },
        {
        "id": 9,
        "name": "Puzzle"
        },
        {
        "id": 10,
        "name": "Arcade"
        },
        {
        "id": 11,
        "name": "Platformer"
        },
        {
        "id": 12,
        "name": "Racing"
        },
        {
        "id": 13,
        "name": "Massively Multiplayer"
        },
        {
        "id": 14,
        "name": "Sports"
        },
        {
        "id": 15,
        "name": "Fighting"
        },
        {
        "id": 16,
        "name": "Family"
        },
    ]
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
            name:"How the 1000 planets of 'Starfield' work: Bethesda reveals the secret of the game's immense universe",
            contents:"Among the most interesting revelations that Bethesda and Microsoft made about their future space exploration game 'Starfield', there was a figure that caught our attention: the game would have a whopping thousand planets to explore, each with its own physical characteristics, fauna and flora. Bethesda, a company that has franchises of the magnitude of 'The Elder Scrolls' and 'Fallout' in its portfolio, knows what it is to face huge worlds... but until now they had been restricted to a single planet. Of course, Bethesda isn't going to program each place where the 'Starfield' player can land one by one. In an interview with IGN, the game's director, Todd Howard, has explained how this spectacular feature of the title will work. The key, although it has its nuances, as many players may assume, is in the procedural generation, a procedure that he already put into practice with 'Skyrim'. However, Howard also comments that not all planets have the same amount of content, and there will be some more towns and with more missions to fulfill in them. What Todd Howard does assure is that it will be an experience only partially dominated by the procedural generation, since 'Starfield' is the game with the most hand-made content that they have embarked on so far: it has 200,000 lines of dialogue and a good part of design done in a traditional way.",
            image:"https://i.blogs.es/e70d60/starfield/1366_2000.jpeg",
        },
        {
            name: "How Shin Chan, a phenomenon thought by and for Japan, has ended up coming to Switch and PS4 in Europe",
            contents:"Publisher Neos Corporation and developer Millennium Kitchen have announced that Shin Chan's vacation video game, ostentatiously titled 'Shin-chan: Me and the Professor on Summer Vacation – The Endless Seven-Day Journey', is going to be published outside of Japan, which exceeds the initial intentions of a game that was intended solely for that market. But... how did it happen? Why, in an industry in which hundreds of video games remain unpublished in the West, precisely this one reaches Spain? Shin Chan's fame. Shin Chan's new video game will arrive not only on Nintendo Switch, where it had already been announced, but also on Playstation 4 in August. It won't be fully localized, but with translated texts and subtitles for dialogue in English, Japanese, German, Spanish, and Portuguese. That already gives us a clue as to which markets this more or less unexpected export is aimed at: for example, the product does not include texts in French. The original manga series was created in 1992 by Yoshito Usui, which has sold more than 148 million copies worldwide. When the author passed away in 2009, the series went on hiatus, but was re-published a year later by Usui's team of helpers. However, what gave the character of Shinnosuke Nohara international fame was the corrosive adaptation into a television series.",
            image:"https://i.blogs.es/e7abcf/66271-s2/1366_2000.jpeg",

        },
        {
            name:"Return to Monkey Island' confirms the great visual twist of the legendary franchise. And it's quite risky",
            contents:"In the Nintendo event dedicated to the third parties that are going to publish soon on the Switch, there has been time for everything: from franchises that have explained their mechanics for new deliveries, such as 'Mario + Rabbids - Sparks of Hope' to returns of classic icons of the video game, such as Bomberman, Pac-Man or Sonic. There has even been time for an unexpected incursion (now available!) of the 'Portal' saga on Nintendo Switch. Although without a doubt the most notable announcement has been that of 'Return to Monkey Island', which has revealed a few moving images of the return to the old days of Guybrush Threepwood sponsored by its original creator, the legendary Ron Gilbert. And it does so with an announcement: the game will be exclusive (quite possibly temporarily) on Nintendo Switch, as far as consoles are concerned. For the rest, the trailer that has been presented at the Nintendo Direct has not revealed anything about the plot beyond the fact that very familiar scenarios return for fans of the saga, and also a fearsome villain: LeChuck himself, redesigned for the occasion with the characteristic graphics of this new installment. Because what is also clear is that this installment will be visually very different. Beyond the pixel-art of the first installments and some polygonal sequels, this new installment opts for a collage-style aesthetic that has never been seen before in the series. The extreme expressiveness, almost cartoonish, that characterized the graphic adventures of LucasArts, is replaced by a rigidity that is not yet clear if it will fit one hundred percent with the spirit of the saga.",
            image:"https://i.blogs.es/b5600e/return-to-monkey-island-screen-alt1/1366_2000.jpeg",
        },
        
        {
            name:"Trailer for 'Final Fantasy VII Remake Part 2', exclusive to PS5 next year, and which already announces the third installment",
            contents:"Finally, as the closing of the brief event of the 25th anniversary of 'Final Fantasy VII', the trailer for the second part of the remake of the classic has arrived, which will finally receive the title of 'Final Fantasy VII Rebirth'. And a date has been set estimated for its release: next winter, as Square Enix succinctly concluded. It was also revealed how many episodes would make up this remake of what is possibly one of the most beloved and mythologized games in the franchise. Now that the game has progressed and Square Enix has been able to plan the rest of the story, has stated that the saga will consist of three parts, that the third chapter has already begun its development, and that due to the very nature of these episodes, in which there is a roadmap very definite, the development proceeds very fast.",
            image:"https://i.blogs.es/e4188b/02_ff7rebirth_screenshot/500_333.jpeg",
        },
        {
            name:"Xbox Cloud Gaming is already inside Samsung TVs: these are our first impressions",
            contents:"It's here. The 'Gaming Hub' video game repository announced by Samsung during the last edition of CES has just arrived on its 2022 televisions. And it has done so with a promise under its arm: to improve the user experience of these televisions that we enjoy with the video game. However, this is not all. Along with this software, various streaming game services have also arrived, so we haven't missed the opportunity to put one of them to the test: Xbox Cloud Gaming. The TV we used is Samsung's current flagship model, the Neo QLED QN900B 8K with a mini LED backlight.",
            image:"https://i.blogs.es/15ee26/xboxsamsung-ap/1366_2000.jpeg",
        },
        {
            name:"The game that I downloaded doesn't even look like the ad I saw on Instagram: it's not you, it's a common (and lucrative) practice",
            contents:"Surely between instastorie and instastorie you have seen advertisements for some mobile game. The images show 3D animations in which you have to fix a house through strategy or adventure games in which you are a pirate who conquers ships. However, once you download the game you discover that it has nothing to do with the advertisement that has lured you to try the game. You find match-3 games, in the style of Candy Crush, or 2D resource management games. It has been happening since 2019 and it is a practice that has not gone unnoticed in networks. There are dozens of videos on YouTube of comparisons of the ads with real games, receiving harsh criticism. It may seem that it is a somewhat “shabby” strategy or one with little progress, but the reality is that it has been postulated as a generalized marketing strategy in the industry. Everyone knows that it exists and everyone (or almost everyone) has practiced it at some point. Today we break it down to tell everything that is behind it. The first game with which this strategy was done was Matchington Mansion, or at least the first that has been recorded. It is a match-3 game (puzzle that tries to form combinations of three or more tiles of the same type or color) created by practically unknown developers, but who began to step on the heels of Playrix himself (the Russian company behind Gardenscapes and Homescapes). How they did it? Creating a super aggressive marketing campaign with some very flashy ads even though they didn't agree 100% with the final game. In this Deconstructor of Fun article they break it down step by step. In 2019 they reached 15 million dollars in net income (currently it is 5 million dollars), but their success was not only reflected in numbers, but Playrix herself copied their strategy with Gardenscapes and Homescapes. In fact, in 2020 ASA (Advertising Standards Authority, the agency that sets advertising standards in the United Kingdom) penalized Playrix for disseminating those same ads as 'misleading'. The strategy seems simple: show people a very attractive ad, a “fake” ad, and get downloads. However, there is much more. On the one hand, these ads always correspond to games that already have millions of base downloads; on the other, we have even been surprised that the ads are much uglier than the original game.",
            image:"https://i.blogs.es/a097c4/foto-2/1366_2000.jpg",
        },
        {
            name:"Microsoft Edge becomes gamer: adds options to enjoy more xCloud and Free-to-play games",
            contents:"Microsoft's web browser wants to be a browser for gamers. The new options in version 103 of Microsoft Edge make it easier and more direct than ever to access cloud gaming and even free games. Microsoft's bet is interesting: by opening a new tab we can access the 'Gaming' section from which news and access to simple games in Free-to-play format are displayed. And for those who play games in the cloud with Xbox Cloud Gaming (xCloud), comes Clarity Boost, which improves the visual quality of the experience. In this new 'Gaming' section, the Xbox user interface is used and news, game guides, live broadcasts, tournaments or new releases in this segment are presented. We can also access the Games menu at any time. Doing so will open a side panel with a selection of arcade and free-to-play video games including 'Microsoft Jewel', 'Mahjongg Dimensions', 'Deal or no Deal', 'Cubis', 'Battleship' and 'Surf Game'. Xbox Game Pass Ultimate subscribers who enjoy cloud gaming options also have exciting news: the arrival of the Clarity Boost option, which had been available in preview versions of the browser, and which allows streaming games to be see with more clarity and definition than in other browsers.",
            image:"https://i.blogs.es/93349d/captura-de-pantalla-2022-06-24-a-las-8.26.38/1366_2000.jpeg",
        },
        {
            name:"Atari turns 50 and launches two new cartridges for the legendary Atari 2600: they are more expensive than any current game",
            contents:"Nolan Bushnell and Ted Dabney thought that video games had a future. Now that perception seems obvious, but in 1972 he had a point of madness. They did not care: they created Atari and made it one of the legendary companies in this segment. Now they have just turned 50, and they have done so with a small but unique celebration. A troubled story. It all started with 'Pong', and the launch of his VCS console —popularly known as the Atari 2600— was one of the great triggers for the video game industry. Then there would be disasters like 'E.T.' and machine failures like the Atari Jaguar. Atari reinvents itself (or tries to). After passing through various hands and being acquired and reacquired by various companies, Atari today consists of two divisions: one that tries to develop new versions of its classic games and apparently wants to become a developer of new PC titles. The other that is dedicated to products related to the blockchain. Phew. 50 years later. The company has receded into the background in the field of first-rate video games and its role is now that of a company that essentially lives on its past. This is demonstrated by the launch of the Atari VCS retroconsole, which was slow to arrive and which also did so at a high price (400 dollars). Nostalgia was once again the main argument, as with other products in this line. On her website dedicated to that 50th anniversary, it is clear how everything is focused on her legacy as a pioneer, and not so much on her current role, much more dedicated to retrogaming. Or to the construction of a themed hotel, something surprising for a company of this type. Physical cartridges, a curious idea... The truth is that Atari has come up with a curious idea to celebrate this anniversary: ​​they have released two limited edition cartridges for the Atari 2600. They are a reissue of the mythical 'Missile Command' and 'Adventure'.",
            image:"https://i.blogs.es/aabc58/captura-de-pantalla-2022-06-29-a-las-13.40.24/1366_2000.jpeg",
        },
        {
            name:"'Teenage Mutant Ninja Turtles: Shredder's Revenge': the pixelated charm of the best brawlers of the 80s",
            contents:"Why deny it: since it showed its first videos, this new Teenage Mutant Ninja Turtles game captivated us for its enormous color and for how genuinely faithful it intended to be to the aesthetics and mechanics of the best arcades of the characters. Great games like the 1989 Konami arcade game 'Turtles in Time', 'TMNT' on Game Boy Advance and other lesser-known gems, like 'TMNT 3: The Radical Rescue' on Game Boy or 'TMNT: Hyperstone Heist' on Mega Drive, among many others. There are a total of twenty quite different games (not counting the multiple conversions, in some cases to a good handful of formats for each title), some better, others worse (almost never terrible), but always synonymous with action and fun, also very popular. often with multiplayer bumps on board. This 'Teenage Mutant Ninja Turtles: Shredder's Revenge' seems to have taken good note of what characterizes the franchise and has enhanced it. Without complicating life conceptually (no RPG elements, a few tiny touches of adventure in Story Mode, where there are parts that can very generously be considered secondary missions), 'Shredder's Revenge' gets to the point. And it does so by being extremely respectful of the graphics expected of a game inspired by the animated series of the eighties, and redesigning characters and combat mechanics. Visually, 'Shredder's Revenge' is a true delight. Without reaching the aggressiveness or radicalism of recent genre milestones, such as the masterful 'Streets of Rage 4' or 'Battletoads' (significantly, also revivals of icons of the eighties genre), the subtle redesign of the characters, bringing the pixel texture in the rounded style of the cartoon turns the game into a small aesthetic marvel. The scenarios shine in a special way, full of details, direct heirs of so many arcade brawlers and without repetitive sections: they all evolve and change as you progress through them. A real joy that finds the icing on the fantastic animations: each character not only has different speeds, power and resistance, but also has their own blows and techniques that serve to give personality to the four turtles, the rat Splinter and the two characters. humans, April and Casey.",
            image:"https://i.blogs.es/5ed5b1/tmnt-shredders-revenge-screenshot-06-en-27jan22/1366_2000.jpeg",
        },
        {
            name:"Why we're obsessed with making 'Doom' work on the most random sites",
            contents:"In 1992 id Software released 'Wolfenstein 3D' and changed the history of video games. The FPS (First-Person Shooter) genre became an absolute phenomenon, and after it came two even more legendary titles, 'Doom' and 'Quake'. The franchise has conquered millions of players and has had numerous sequels, but the curious thing is that the original 'Doom' has become a challenge for developers who wanted to be able to play it not on computers, but on almost anything governed by chips . In fact there is a question that becomes a meme when any new electronic device is launched. Can you run 'Doom'? That's how it is. For a while now, every time a new technological product is introduced, someone ends up asking if Doom will be playable on it. Before the question was oriented to computers and consoles, but over the years the power of even much more modest devices has also ended up generating that same question among some developers. Running 'Doom' on almost anything was a mix between a development challenge – the source code has been available for years – and a demonstration that by now any device can actually end up running this game. Although it is not intended for that at all. First there were the normal versions. The video game was initially launched for MS-DOS in 1993, but versions for Windows would soon appear —Bill Gates even thought of acquiring id Software—, Linux, Mac OS (1994), or consoles such as the SNES and the PlayStation (1995), the 3DO (1996), or the Sega Saturn (1997). Then the 'port' ('adapted version') would come for the Game Boy Advance (2001), the Xbox 360 (2006), iOS mobiles (2009) or the Nintendo Switch (2019). But there are more places where you can run 'Doom'. Many more. Then came the madness: 'Doom' even in a pregnancy test. We have seen how 'Doom' kept reaching more and more products related to technology directly or indirectly. The evolution has been amazing and basically shows that at this point 'Doom' can run on practically any product. We have seen it in a Porsche 911, in the C64, in the MP3 SanDisk Sansa Clip, in the Lidl food processor, in a Windows 95 PC... created in Minecraft, in an Apple Watch, in an iPod nano, on a Raspberry Pi, on a TI calculator powered by potatoes, on an ATM, on a printer, on a hyper-cheap console for children, on the TouchBar of MacBook Pros, on a piano, on a Game & Watch, on a oscilloscope (although it's 'Quake', not 'Doom'), on an old Sony mobile, and even on a pregnancy test. There's more, of course, and it's not hard to guess where to go to find new places to be amazed and where people get 'Doom' to run. It is, of course, in the r/itrunsdoom subreddit. Why do people do this? There are many reasons, but probably the most obvious is another question. Why not? 'Doom' is Open Source, it is written in C, a language that has compilers on all kinds of platforms, that code has been updated and is especially efficient and has become that 'Hello World' of video games. For many developers it is a good way to prove to themselves that they can do it. Not only that: for those developers it's also fun and challenge, and since 'Doom' is a cultural phenomenon, getting it to run on some new device can end up giving the developer some reputation. What more could you want?",
            image:"https://i.blogs.es/bfb53a/captura-de-pantalla-2022-06-22-a-las-11.02.01/1366_2000.jpeg",
        },
        {
            name:"Valve ramps up Steam Deck production and announces doubling weekly shipments",
            contents:"Good news for all those people who are waiting to buy a Steam Deck. Valve has just announced that it has ramped up production of its handheld console, translating into more than doubling of weekly shipments. In addition, through a publication on its official Twitter account, the company assures that it has finished sending the reservation emails for the second quarter, and that as of June 30 it will begin to send those corresponding to the third quarter. It should be noted that Valve had planned to start shipping the first Steam Deck units in December 2021. However, due to supply chain issues, the company changed the release date to February this year. Consoles have been shipping since February, but at a lower rate than expected. Now, the company seems to have been able to overcome some of the obstacles that prevented it from obtaining the necessary components to increase the production of its portable console. Once the Steam Deck is reserved on Valve's website, those interested are placed on a waiting list based on order of order. Once stock is available, they will receive an email that will allow them to move forward with the process. The increase in production could mean more emails. Once someone has received one, they have 72 hours to make the purchase. Recall that the Steam Deck is offered in three editions with different extras: 64 GB (419 euros), 256 GB (549 euros) and 512 GB (679 euros).",
            image:"https://i.blogs.es/8e6855/steam-deck-1/1366_2000.jpeg",
        },
        {
            name:"The new PlayStation Plus arrives in Spain: comparison of subscriptions, prices and all available games",
            contents:"Well, it's already here. After being announced a few months ago and gradually reaching various regions, the new PlayStation Plus is now available in Spain for everyone. As we already knew, the new PlayStation Plus combines the PS Plus and PS Now subscription and offers three subscription levels, each with more benefits. Next we are going to review all the available options, what price each one has, their differences, what happens if you already have an active subscription and, of course, the catalog of games available at launch. Without further delay, we begin. If you already have an active PS Plus subscription, you will automatically upgrade to PS Plus Essential. If in addition to PS Plus you were paying for PS Now, your subscription will change to PS Plus Premium, the highest level. Here it should be noted that there will be a new single payment date depending on the subscription that ends later.",
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