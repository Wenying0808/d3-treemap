let movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let movieData;

let canvas = d3.select('#canvas');
let legend = d3.select('#legend');

let drawTreeMap = () => {

};

let drawLegend = () => {

};

d3.json(movieURL).then(
    (data, error) => {
        if (error) {
            console.log("fetch data", error);
        }else{
            movieData = data;
            console.log("movieData", movieData);
            drawTreeMap();
        }
    }
);