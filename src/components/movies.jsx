import React, { Component } from "react";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import ListGroup from "./common/listGroup";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    sortColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres: genres });
  }

  handleDelete = movie => {
    const movies = this.state.movies.filter(cur => cur._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    if (genre._id === "") genre = undefined;
    this.setState({ selectedGenre: genre });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPageData() {
    const {
      movies: totalMovies,
      currentPage,
      pageSize,
      selectedGenre,
      sortColumn
    } = this.state;
    const filtered = selectedGenre
      ? totalMovies.filter(movie => movie.genre._id === selectedGenre._id)
      : totalMovies;
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const pageMovies = (filtered.length <= pageSize) 
      ? paginate(sorted, 1, pageSize) 
      : paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: pageMovies };
  }

  render() {
    const {
      movies: totalMovies,
      currentPage,
      pageSize,
      sortColumn
    } = this.state;

    if (totalMovies.length === 0)
      return <p>There is no more movies in dictionary</p>;

    const { totalCount, data: movies } = this.getPageData();
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            listItems={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          ></ListGroup>
        </div>
        <div className="col">
          <p>Now {totalCount} movies are shown.</p>
          <MoviesTable
            movies={movies}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          ></MoviesTable>
          <Pagination
            itemCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          ></Pagination>
        </div>
      </div>
    );
  }
}

export default Movies;
