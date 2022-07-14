import React from 'react';
import * as BsIcons from 'react-icons/bs'
import styles from "./Footer.css";
import LinkedinIcon from '../../images/linkedin.png'
import PostgreIcon from '../../images/postgre.png'
import CSSIcon from '../../images/css-3.png'
import ReactIcon from '../../images/physics.png'
import NodeIcon from '../../images/nodejs.png'
import JavaScriptIcon from '../../images/js.png'
import SQLIcon from '../../images/sql-server.png'
import HTMLIcon from '../../images/html-5.png'
import SequelizeIcon from '../../images/sequelize-icon.png'
import ReduxIcon from '../../images/ReduxIcon.png'

const Footer = () => {

    const spanStyles = {
        color: "rgb(22, 31, 203)",
      };

    let integrantes = [
        {
            name: 'German Flores',
            path: 'https://www.linkedin.com/in/germán-flores-47a41296/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Joaquin Palacio',
            path: 'https://www.linkedin.com/in/joaqu%C3%ADn-palacio-92918a234/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Julian Gomez',
            path: 'https://www.linkedin.com/in/leandrojuliangomez/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Nicolas Gonzalez',
            path: 'https://www.linkedin.com/in/nicolás-gonzález-087875177/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Nicolas Tanoira',
            path: 'https://www.linkedin.com/in/nicotanoira/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Santiago Campos',
            path: 'https://www.linkedin.com/in/santiago-campos-snels-0919b022b/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Sebastian Garcia',
            path: 'https://www.linkedin.com/in/juan-sebastian-garcia-lopez-93a611186/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
        {
            name: 'Wilson Castro',
            path: 'https://www.linkedin.com/in/wilson-arvey-castro-39a446184/',
            icon: <BsIcons.BsLinkedin style={spanStyles}/>,
            className: 'linkedin-name',
        },
    ]


    return (
        <footer className='mainfooter'>
            <div className='container'>{/* Container de las 3 filas */}
                {/* <h2>Henry Games</h2> */}

                <div className='footer-titles'>
                    <a className='footer-titles-equipo' href='https://github.com/nicolasgonzalez98/HenryGames-PG'>
                        <img className='github-image' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf5-S3ffFPLWSu6s5ImXQU-MLPb3y4FkQbqQ&usqp=CAU' width='65px' height='65px' alt='not found' />
                    </a>
                    <h2 className='footer-titles-tecnologias'>Technologies</h2>
                </div>
                {/* Container del medio */}
                <div className='creadores-tecnologias-div'>
                    
                
                    {/* Izquierda */}
                    <ul className='creadores'>
                        
                        {integrantes.map((item, index) => {
                            return (
                                <li key={index} className={item.className}>
                                    <a href={item.path} target="_blank">
                                        
                                        <img src={LinkedinIcon} width='25px' height='25px' alt='not found'/>
                                        <span>{item.name}</span>
                                    </a>
                                </li>
                            )
                        })}
                    </ul>
                        
                    {/* Derecha */}
                    <div className='tecnologias'>
                        <img src={HTMLIcon} width='75px' height='75px' alt='not found'/>
                        <img src={CSSIcon} width='75px' height='75px' alt='not found'/>
                        <img src={JavaScriptIcon} width='75px' height='75px' alt='not found'/>
                        <img src={ReactIcon} width='75px' height='75px' alt='not found'/>
                        <img src={ReduxIcon} width='75px' height='75px' alt='not found'/>
                        <img src={NodeIcon} width='75px' height='75px' alt='not found'/>
                        <img src={SQLIcon} width='75px' height='75px' alt='not found'/>
                        <img src={PostgreIcon} width='75px' height='75px' alt='not found'/>
                        <img src={SequelizeIcon} width='75px' height='75px' alt='not found'/>
                    </div>

                </div>

                    {/* container final */}
                <div className='final-footer'> 
                    <p> Copyright &copy;{new Date().getFullYear()} HENRYGAMES | PG Henry | Group 1 FT25a</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;