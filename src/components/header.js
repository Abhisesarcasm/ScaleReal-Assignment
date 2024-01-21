import "./header.css";
import BodySection from "./bodySection";
import { Box, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import { useEffect, useState } from "react";
import axios from "axios";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [searchText, setSearchText] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(0);
  const [movieData, setMovieData] = useState([]);
  const [error, setError] = useState(false);
  const captureText = (e) => {
    const movie = e.target.value;
    setSearchText(movie);
  };
  const fetchMovieData = async (text) => {
    try {
      const response = await axios.get(
        `https://swapi.dev/api/films/?format=json&search=${text}`
      );
      let result = response.data.results;
      console.log(result);
      setMovieData(result);
      console.log("text", searchText);
      setError(result.length === 0);
    } catch (error) {
      setError(true);
      console.log(error);
    }
  };
  const handleEpisodes = () => {
    const res = movieData.slice().sort((a, b) => a.episode_id - b.episode_id);
    setMovieData(res);
  };
  const handleYear = () => {
    const res = movieData.slice().sort((a, b) => {
      return new Date(a.release_date) - new Date(b.release_date);
    });
    setMovieData(res);
  };
  useEffect(() => {
    if (debounceTimer !== 0) {
      clearTimeout(debounceTimer);
    }
    const timer = setTimeout(() => {
      fetchMovieData(searchText);
    }, 600);

    setDebounceTimer(timer);
  }, [searchText]);
  return (
    <>
      <div id="header">
        <Box mt={2}>
          <Button
            variant="outlined"
            style={{ margin: "0px 8px", background: "white" }}
            onClick={handleClick}
          >
            Sort By...
          </Button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div>
              <div id="sort">
                <span>Sort by</span>
                <span id="cancel-btn" onClick={handleClose}>
                  x
                </span>
              </div>
              <div className="sortingType" onClick={handleEpisodes}>
                By Episode
              </div>
              <div className="sortingType" onClick={handleYear}>
                By Year
              </div>
            </div>
          </Popover>
          <TextField
            size="small"
            type="text"
            name="search-box"
            placeholder="Search for movies"
            id="search"
            value={searchText}
            onChange={captureText}
            sx={{
              flex: 1,
              width: "50vw",
              background: "white",
            }}
          />
        </Box>
      </div>
      <BodySection movieData={movieData} error={error} />
    </>
  );
};
export default Header;
