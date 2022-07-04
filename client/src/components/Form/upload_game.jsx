import React from 'react'

export default function Upload_Game() {
  return (
    <div>
      <h1>Post a new Videogame</h1>
      <form>
      <div>
          <p>Name: </p>
            <input type="text" name="name" placeholder='Name'/>
        </div>
        <div>
          <p>Release Date: </p>
            <input type="date" name="release_date" />
        </div>
        <div>
          <p>Image: </p>
          <input type='image' name="image" alt='' />
        </div>
        <div>
          <p>Rating: </p>
          <input type='number' name="rating" />
        </div>
        <div>
          <p>Price: </p>
          <input type='number' name="price" />
        </div>
        <div>
          <p>It is on sale? </p>
          <input type="checkbox" name="on_sale"/>
        </div>
        <div>
          <p>It is free to play? </p>
          <input type="checkbox" name="free_to_play"/>
        </div>
      </form>
    </div>
  )
}
