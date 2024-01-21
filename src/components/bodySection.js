import "./bodySection.css";
import { useState } from "react";
const BodySection = ({ movieData, error }) => {
  const [display, setDisplay] = useState(false);
  const [movieInfo, setMovieInfo] = useState({});
  const handleInfo = (info) => {
    console.log(info);
    setMovieInfo(info);
    setDisplay(true);
  };
  function numToRoman(num) {
    if (num <= 0) {
      return;
    }
    const romanNumerals = [
      { value: 1000, numeral: "M" },
      { value: 900, numeral: "CM" },
      { value: 500, numeral: "D" },
      { value: 400, numeral: "CD" },
      { value: 100, numeral: "C" },
      { value: 90, numeral: "XC" },
      { value: 50, numeral: "L" },
      { value: 40, numeral: "XL" },
      { value: 10, numeral: "X" },
      { value: 9, numeral: "IX" },
      { value: 5, numeral: "V" },
      { value: 4, numeral: "IV" },
      { value: 1, numeral: "I" },
    ];

    let result = "";

    for (const pair of romanNumerals) {
      while (num >= pair.value) {
        result += pair.numeral;
        num -= pair.value;
      }
    }

    return result;
  }

  return (
    <>
      <div id="body">
        <div id="parent">
          <div className="child1">
            {movieData.map((movie) => {
              return (
                <div
                  className="movieBox"
                  key={movie.episode_id}
                  onClick={() => handleInfo(movie)}
                >
                  <span className="episode">Episode-{movie.episode_id}:</span>{" "}
                  <p className="ep-name">
                    &nbsp;Episode {numToRoman(movie.episode_id)}-{movie.title}
                  </p>
                  <span>&nbsp;{movie.release_date}</span>
                </div>
              );
            })}
          </div>
          <div className="child2">
            {!error ? (
              display ? (
                <>
                  {" "}
                  <h1>
                    Episode {numToRoman(movieInfo.episode_id)} -{" "}
                    {movieInfo.title}
                  </h1>
                  <p>{movieInfo.opening_crawl}</p>
                  <p>Directed by: {movieInfo.director}</p>
                </>
              ) : (
                <h1 style={{ textAlign: "center" }}>No Movie Selected.</h1>
              )
            ) : (
              <h1 id="errorHead">
                <em>Enter a valid Movie name.</em>
              </h1>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default BodySection;
