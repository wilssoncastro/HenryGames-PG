import React from 'react'

export default function Paginado({videogamesPerPage, allVideogames, paginado}) {
    const pageNumbers = [];

        for (let i = 0; i < Math.ceil(allVideogames / videogamesPerPage); i++) {
            pageNumbers.push(i + 1);
        }

    return (
        <div>
            <ul className='paginado'>
                {
                pageNumbers?.map(number => (
                    <li className='number'>
                        <a onClick={ () => paginado(number)}>{number}</a>
                    </li>
                ))
                }
            </ul>
        </div>
    )
}
