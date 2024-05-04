const btnAnterior = document.getElementById('btnAnterior');
const btnSiguiente = document.getElementById('btnSiguiente');


let pagina = 1;

btnAnterior.addEventListener("click", ()=>{
    //evalua que sea mayor a 1
    if (pagina > 1){
        pagina -=1;
        cargarPeliculas();
    }
})

btnSiguiente.addEventListener("click", ()=>{
    //evalua que sea menor a 1000, la cantidad de peliculas que trae la api
    if (pagina < 1000){
        pagina +=1;
        cargarPeliculas();
    }
})

const cargarPeliculas = async () => {
  const options = {
    method: 'GET',
    //necesita auth, ojo
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwNTk0MWJlZjczNjY2NzFhZWRmYTc0ZTQ2MDk0OTcxYSIsInN1YiI6IjY1OTU3MDA1NTkwN2RlM2RmZDYzYmYzMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8iyafk7ITqaCDEaGUCU4bLxWF72sIZ5CQPyxNw6YCkI'
    }
  };
  
  fetch('https://api.themoviedb.org/3/authentication', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

  try {
      const respuesta = await fetch(
          `https://api.themoviedb.org/3/movie/popular?language=es-MX&page=${pagina}`,
          options
      );

      if (respuesta.status === 200) {
          const datos = await respuesta.json();
          let peliculas = "";
          datos.results.forEach(pelicula => {
              peliculas += `
                  <div class="pelicula">
                      <h3 class="titulo">${pelicula.title}</h3>
                      <p>Lenguaje original: ${pelicula.original_language}</p>
                      <p> Fecha de anzamiento: ${pelicula.release_date}</p>
                      <img class="poster" src="https://image.tmdb.org/t/p/w500${pelicula.poster_path}">
                      <p>${pelicula.overview}</p>
                      
                  </div>
              `;
          });
          document.getElementById("contenedor").innerHTML = peliculas;
      } else {
          console.log(`Error ${respuesta.status}: ${respuesta.statusText}`);
          document.getElementById("contenedor").innerHTML = "Error al cargar películas. Error " + respuesta.status;
      }
  } catch (error) {
      console.log(error.message);
      document.getElementById("contenedor").innerHTML = "Error de conexión con el servicio de películas.";
  }
};

// llamar  a la funcion
cargarPeliculas();
