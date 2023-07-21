import React, { useState } from "react";
import axios from "axios";
import { Col, Container, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const FrontendPage = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  const [showDetails, setShowDetails] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movieDetails, setMovieDetails] = useState(null);

  const handleSearch = async () => {
    setLoading(true);

    try {
      const url = 'https://api.themoviedb.org/3/search/movie';
      const params = {
        query: query,
        language: "es"
      };
      const headers = {
        Authorization: ''
      };

      const response = await axios.get(url, { params, headers });
      const response_data = response.data.results


      const sortedMovies = response_data.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));

      setData(sortedMovies);
      console.log(sortedMovies);

    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const handleImageClick = async (movie) => {
    setLoading(true);
    setSelectedMovie(movie);

    try {
      setMovieDetails(movie);
      setShowDetails(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);

  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedMovie(null);
    setMovieDetails(null);
  };


  return (
    <div
      style={{
        backgroundColor: "lightblue", // Cambia el color aquí
        minHeight: "100vh",
        display: "flex",
        padding: "1em"
      }}
    >
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-9ndCyUaIbzAi2FUVXJi0CjmCapSmO7SnpJef0486qhLnuZ2cdeRhO02iuK6FUUVM" crossOrigin="anonymous"></link>

      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossOrigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js" integrity="sha384-fbbOQedDUMZZ5KreZpsbe1LCZPVmfTnH7ois6mU1QK+m14rQ1l2bGBq41eYeM/fS" crossOrigin="anonymous"></script>

      <div class="col-lg-6 col-md-2">
        <Row>
          <h1 class="fw-light">Buscador de Peliculas</h1>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="col-sm-3">
            <button className="btn btn-primary .btn-icon-split" onClick={handleSearch} disabled={loading}>
              {loading ? "Loading..." : "Search"}
            </button>
          </div>
        </Row>
        <Row>
          <Container>
            <Row>
              {data.map(result => (
                result.poster_path && (
                  <Col style={{ margin: '10px' }} sm={4} key={result.id}>
                    <div className="card" style={{ width: '18rem', cursor: 'pointer' }} onClick={() => handleImageClick(result)}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${result.poster_path}`}
                        class="card-img-top"
                        alt={result.title}
                        data-id={result.id}
                        style={{ width: '100%' }}
                      />
                      <div class="card-body">
                        <h5 class="card-title">{result.title}</h5>
                        <p class="card-text">{result.release_date}</p>
                        {/* Aquí puedes agregar más contenido para la descripción */}
                        {/* <p class="card-text">Descripción de la película</p> */}
                        {/* <a href="#" class="btn btn-primary">Ver más</a> */}
                      </div>
                    </div>
                  </Col>
                )
              ))}
            </Row>
          </Container>
        </Row>
      </div>
      <div class="col-lg-6 col-md-2">
        {showDetails && movieDetails && (
          <Container>
            <Row>
              <Col>
                <div className="card" style={{ width: '50%', marginTop: '20px' }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
                    className="card-img-top"
                    alt={movieDetails.title}
                    style={{ width: '100%' }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{movieDetails.title}</h5>
                    <p className="card-text">{movieDetails.overview}</p>
                    <button className="btn btn-primary" onClick={handleCloseDetails}>Cerrar</button>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        )}

      </div>



    </div>
  );
};

export default FrontendPage;
