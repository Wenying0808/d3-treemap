let movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";

let vedioGameURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json";

let kickstarterURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json";

let dataset;

let dataSelect = d3.select('#dataSelect');
dataSelect.select('input[value="movies"]').property('checked', true);
let selectedData;

let titleText = "Movie Sales";
let title = d3.select('#title').text(titleText);

let descriptionText = "Top 100 Highest Grossing Movies Grouped By Genre";
let description = d3.select('#description').text(descriptionText);

let canvasAndLegend = d3.select("#canvas-legend");
let canvas = d3.select('#canvas');
let legend = d3.select('#legend');

const movieCategoryColorData = [
    { category: 'Action', color: '#FFA500' },     // Orange
    { category: 'Drama', color: '#32CD32' },      // Lime Green
    { category: 'Adventure', color: '#FF1493' },  // Deep Pink
    { category: 'Family', color: '#4169E1' },     // Royal Blue
    { category: 'Animation', color: '#FF69B4' },  // Hot Pink
    { category: 'Comedy', color: '#FFD700' },     // Gold
    { category: 'Biography', color: '#8B4513' }   // Saddle Brown
];

const videogameCategoryColorData = [
    { category: 'Wii', color: '#FFCC80' },   // Light Orange
    { category: 'DS', color: '#9ACD32' },    // Yellow Green
    { category: 'X360', color: '#FFC0CB' },  // Pink
    { category: 'GB', color: '#87CEEB' },    // Sky Blue
    { category: 'PS3', color: '#FFB6C1' },   // Light Pink
    { category: 'NES', color: '#FFD700' },   // Gold
    { category: 'PS2', color: '#D2B48C' },   // Tan
    { category: '3DS', color: '#DDA0DD' },   // Plum
    { category: 'PS4', color: '#FFA07A' },   // Light Salmon
    { category: 'SNES', color: '#00FFFF' },  // Cyan
    { category: 'PS', color: '#D3D3D3' },    // Light Gray
    { category: 'N64', color: '#CD853F' },   // Peru
    { category: 'GBA', color: '#AFEEEE' },   // Pale Turquoise
    { category: 'XB', color: '#FFC0CB' },    // Pink
    { category: 'PC', color: '#98FB98' },    // Pale Green
    { category: '2600', color: '#D2B48C' },  // Tan
    { category: 'PSP', color: '#E6E6FA' },   // Lavender
    { category: 'XOne', color: '#AFEEEE' }   // Pale Turquoise
];

const kickstarterCategoryColorData = [
    { category: 'Product Design', color: '#FFA07A' },    // Light Salmon
    { category: 'Tabletop Games', color: '#98FB98' },    // Pale Green
    { category: 'Video Games', color: '#87CEEB' },       // Sky Blue
    { category: 'Technology', color: '#FFD700' },        // Gold
    { category: 'Hardware', color: '#FF69B4' },          // Hot Pink
    { category: 'Sound', color: '#BA55D3' },             // Medium Orchid
    { category: 'Gaming Hardware', color: '#AB82FF' },   // Medium Purple
    { category: 'Narrative Film', color: '#D2B48C' },    // Tan
    { category: '3D Printing', color: '#B0C4DE' },       // Light Steel Blue
    { category: 'Television', color: '#FFA500' },        // Orange
    { category: 'Web', color: '#20B2AA' },               // Light Sea Green
    { category: 'Wearables', color: '#FF7F50' },         // Coral
    { category: 'Food', color: '#ADFF2F' },              // Green Yellow
    { category: 'Games', color: '#87CEFA' },             // Light Sky Blue
    { category: 'Sculpture', color: '#F0E68C' },         // Khaki
    { category: 'Apparel', color: '#FFD700' },           // Gold
    { category: 'Art', color: '#A9A9A9' },               // Dark Gray
    { category: 'Gadgets', color: '#FFB6C1' }            // Light Pink
];

//event listener
dataSelect.on("change", function(){
    selectedData = dataSelect.selectAll('input[name="dataset"]:checked').node().value;;
    console.log("selectedData", selectedData);

    //clear canvas and legend before redraw
    canvas.selectAll("*").remove();
    legend.selectAll("*").remove();

    //fetch data based on the selection
    fetchData(selectedData, function(dataset){

        if (selectedData === "movies") {

            titleText = "Movie Sales";
            title = d3.select('#title').text(titleText);
            descriptionText = "Top 100 Highest Grossing Movies Grouped By Genre";
            description = d3.select('#description').text(descriptionText);

            drawMovieTreeMap(dataset);
            drawMovieLegend();

        } else if (selectedData === "videogames") {
            titleText = "Video Game Sales";
            title = d3.select('#title').text(titleText);
            descriptionText = "Top 100 Most Sold Video Games Grouped by Platform";
            description = d3.select('#description').text(descriptionText);

            drawVideogameTreeMap(dataset);
            drawVideogameLegend();

        } else if (selectedData === "kickstarter") {
            titleText = "Kickstarter Pledges";
            title = d3.select('#title').text(titleText);
            descriptionText = "Top 100 Most Pledged Kickstarter Campaigns Grouped By Category";
            description = d3.select('#description').text(descriptionText);

            drawKickstarterTreeMap(dataset);
            drawKickstarterLegend();
            
        }
        
    })
    
})

//fetch data based on the selection
function fetchData (selectedData, callback){
    if (selectedData === "movies") {
        d3.json(movieURL).then(
            (data, error) => {
                if (error) {
                    console.log("fetch movie data", error);
                }else{
                    dataset = data;
                    console.log("movieData", dataset);
                    callback(dataset);
                }
            }
        );
    } else if (selectedData === "videogames") {
        d3.json(vedioGameURL).then(
            (data, error) => {
                if (error) {
                    console.log("fetch videogames data", error);
                }else{
                    dataset = data;
                    console.log("videogamesData", dataset);
                    callback(dataset);
                }
            }
        );
    } else if (selectedData === "kickstarter") {
        d3.json(kickstarterURL).then(
            (data, error) => {
                if (error) {
                    console.log("fetch kickstarter data", error);
                }else{
                    dataset = data;
                    console.log("videogamesData", dataset);
                    callback(dataset);
                }
            }
        );
    }

};


function drawMovieTreeMap (data) {
    let root = d3.hierarchy(data);
    console.log('root', root);

    let hierarchy = d3.hierarchy(data, (node) => {
        return node['children'];
    }).sum((node) => {
        return node['value']; //access the value of each node
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']; //descending the nodes
    })

    let tiles = hierarchy.leaves(); //leaves() accesses the value of each node
    console.log('hierarchy', hierarchy); 
    console.log('tiles', tiles); 

    let createTreeMap = d3.treemap()          // obtain x0, x1, y0, y1
                            .size([1000, 600])
    createTreeMap(hierarchy); 

    let block = canvas.selectAll('g')
                        .data(tiles)
                        .enter()
                        .append('g')
                        .attr('transform', (item) => {
                            return 'translate(' + item['x0'] + ',' + item['y0'] + ')'
                        })
    
    
    block.append('rect')
            .attr('class', 'title')
            .attr('fill', (item) => {
                let category = item['data']['category'];
                let foundCategory = movieCategoryColorData.find(cat => cat.category === category);
                return foundCategory ? foundCategory.color : "gray";
            })
            .attr('data-name', (item) => {
                return item['data']['name'];
            })
            .attr('data-category', (item) => {
                return item['data']['category'];
            })
            .attr('data-value', (item) => {
                return item['data']['value'];
            })
            .attr('width', (item) => {
                return item['x1'] - item['x0'];
            })
            .attr('height', (item) => {
                return item['y1'] - item['y0'];
            })

    block.append('text')
    .text((item) => {
        return item['data']['name']
    })
    .attr('x', 8)
    .attr('y', 20)
    .style('font-size', '11px');
    
};

let drawMovieLegend = () => {

    let legendWidth = 24;
    let legendHeight = 24;
    let legendPadding = 24;
    let legendGap = 12;

    legend.attr("width", 150 )
            .attr("height", legendHeight * movieCategoryColorData.length + legendPadding * 2 + legendGap *(movieCategoryColorData.length-1) )

    let legendGroup = legend.selectAll('g')
                            .data(movieCategoryColorData)
                            .enter()
                            .append('g')
                            .attr('transform', (d,i) => `translate(${legendPadding}, ${legendPadding + i * (legendHeight + legendGap)})`)
  
    legendGroup
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width',legendWidth)
            .attr('height',legendHeight)
            .attr('fill', (d) => {
                return d.color
            })

    legendGroup
            .append('text')
            .text((d) => {
                return d['category']
            })
            .attr('x', 48)
            .attr('y', 18)
            .style('fill', "white")
};


function drawVideogameTreeMap (data) {
    let root = d3.hierarchy(data);
    console.log('root', root);

    let hierarchy = d3.hierarchy(data, (node) => {
        return node['children'];
    }).sum((node) => {
        return node['value']; //access the value of each node
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']; //descending the nodes
    })

    let tiles = hierarchy.leaves(); //leaves() accesses the value of each node
    console.log('hierarchy', hierarchy); 
    console.log('tiles', tiles); 

    let createTreeMap = d3.treemap()          // obtain x0, x1, y0, y1
                            .size([1000, 600])
    createTreeMap(hierarchy); 

    let block = canvas.selectAll('g')
                        .data(tiles)
                        .enter()
                        .append('g')
                        .attr('transform', (item) => {
                            return 'translate(' + item['x0'] + ',' + item['y0'] + ')'
                        })
    
    
    block.append('rect')
            .attr('class', 'title')
            .attr('fill', (item) => {
                let category = item['data']['category'];
                let foundCategory = videogameCategoryColorData.find(cat => cat.category === category);
                return foundCategory ? foundCategory.color : "gray";
            })
            .attr('data-name', (item) => {
                return item['data']['name'];
            })
            .attr('data-category', (item) => {
                return item['data']['category'];
            })
            .attr('data-value', (item) => {
                return item['data']['value'];
            })
            .attr('width', (item) => {
                return item['x1'] - item['x0'];
            })
            .attr('height', (item) => {
                return item['y1'] - item['y0'];
            })

    block.append('text')
    .text((item) => {
        return item['data']['name']
    })
    .attr('x', 8)
    .attr('y', 20)
    .style('font-size', '11px');
    
};

let drawVideogameLegend = () => {

    let legendWidth = 24;
    let legendHeight = 24;
    let legendPadding = 24;
    let legendGap = 12;

    legend.attr("width", 150 )
            .attr("height", legendHeight * videogameCategoryColorData.length + legendPadding * 2 + legendGap *(videogameCategoryColorData.length-1) )

    let legendGroup = legend.selectAll('g')
                            .data(videogameCategoryColorData)
                            .enter()
                            .append('g')
                            .attr('transform', (d,i) => `translate(${legendPadding}, ${legendPadding + i * (legendHeight + legendGap)})`)
  
    legendGroup
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width',legendWidth)
            .attr('height',legendHeight)
            .attr('fill', (d) => {
                return d.color;
            })

    legendGroup
            .append('text')
            .text((d) => {
                return d['category']
            })
            .attr('x', 48)
            .attr('y', 18)
            .style('fill', "white")
};


function drawKickstarterTreeMap (data) {
    let root = d3.hierarchy(data);
    console.log('root', root);

    let hierarchy = d3.hierarchy(data, (node) => {
        return node['children'];
    }).sum((node) => {
        return node['value']; //access the value of each node
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']; //descending the nodes
    })

    let tiles = hierarchy.leaves(); //leaves() accesses the value of each node
    console.log('hierarchy', hierarchy); 
    console.log('tiles', tiles); 

    let createTreeMap = d3.treemap()          // obtain x0, x1, y0, y1
                            .size([1000, 600])
    createTreeMap(hierarchy); 

    let block = canvas.selectAll('g')
                        .data(tiles)
                        .enter()
                        .append('g')
                        .attr('transform', (item) => {
                            return 'translate(' + item['x0'] + ',' + item['y0'] + ')'
                        })
    
    
    block.append('rect')
            .attr('class', 'title')
            .attr('fill', (item) => {
                let category = item['data']['category'];
                let foundCategory = kickstarterCategoryColorData.find(cat => cat.category === category);
                return foundCategory ? foundCategory.color : "gray";
            })
            .attr('data-name', (item) => {
                return item['data']['name'];
            })
            .attr('data-category', (item) => {
                return item['data']['category'];
            })
            .attr('data-value', (item) => {
                return item['data']['value'];
            })
            .attr('width', (item) => {
                return item['x1'] - item['x0'];
            })
            .attr('height', (item) => {
                return item['y1'] - item['y0'];
            })

    block.append('text')
    .text((item) => {
        return item['data']['name']
    })
    .attr('x', 8)
    .attr('y', 20)
    .style('font-size', '11px');
    
};

let drawKickstarterLegend = () => {

    let legendWidth = 24;
    let legendHeight = 24;
    let legendPadding = 24;
    let legendGap = 12;

    legend.attr("width", 210 )
            .attr("height", legendHeight * kickstarterCategoryColorData.length + legendPadding * 2 + legendGap *(kickstarterCategoryColorData.length-1) )

    let legendGroup = legend.selectAll('g')
                            .data(kickstarterCategoryColorData)
                            .enter()
                            .append('g')
                            .attr('transform', (d,i) => `translate(${legendPadding}, ${legendPadding + i * (legendHeight + legendGap)})`)
  
    legendGroup
            .append('rect')
            .attr('x', 0)
            .attr('y', 0)
            .attr('width',legendWidth)
            .attr('height',legendHeight)
            .attr('fill', (d) => {
                return d.color;
            })

    legendGroup
            .append('text')
            .text((d) => {
                return d['category']
            })
            .attr('x', 48)
            .attr('y', 18)
            .style('fill', "white")
};