import React from 'react';
import styles from "./Footer.module.css";

const Footer = () => {
    return (
        <div className={styles.mainfooter}>
            <div className={styles.container}>{/* wrapper */}
                <div className={styles.row}>{/* row */}
                    {/*  colum1 */}
                    <div className={styles.col}>{/* column*/}
                        <h3>Sobre nosotros</h3>

                        <ul className={styles.list}>
                            <hr />
                            <li> Nuestro mision es facilitar el acceso a un sitio donde los gamers puedan
                                encontrar la mayor variedad de juegos de video del mercado, para distintas consolas,
                                diversos generos, juegos de antaño, ultimas tendencias, intercambios, donaciones y mas !;
                                ya que podran ver distintas propuestas por parte de los desarrolladores que usan Nuestro
                                sitio, por lo que la distancia no sera un impedimento
                            </li>

                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>Creadores</h3>
                        <ul className={styles.list}>
                            <li>Nicolas Tanoira</li>
                            <li>German Florez</li>
                            <li>Julian Gomez</li>
                            <li>Nicolas Gonzalez</li>
                            <li>Santiago Campos</li>
                            <li>Wilson Castro</li>
                            <li>Sebastian Garcia</li>
                            <li>Joaquin Hernandez</li>

                        </ul>
                    </div>
                    <div className={styles.col}>
                        <h3>Tecnologias</h3>
                        <ul className={styles.list}>
                            <li>Javascript</li>
                            <li>React</li>
                            <li>Redux</li>
                            <li>Node</li>
                            <li>Express</li>
                            <li>SQL</li>

                        </ul>
                    </div>
                </div>
                <hr />
                <div >
                    <p className={styles.copy}>
                        &copy;{new Date().getFullYear()} HENRYGAMENS | PG Henry - Grupo 1 | Todos los derechos reservados | Terminos de servicio | Privado
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer;