let movieURL = "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json";
let movieData;

let canvas = d3.select('#canvas');
let legend = d3.select('#legend');

let drawTreeMap = () => {
    let root = d3.hierarchy(movieData);
    console.log('root', root);

    let hierarchy = d3.hierarchy(movieData, (node) => {
        return node['children'];
    }).sum((node) => {
        return node['value']; //access the value of each node
    }).sort((node1, node2) => {
        return node2['value'] - node1['value']; //descending the nodes
    })

    let movieTiles = hierarchy.leaves(); //leaves() accesses the value of each node
    console.log('hierarchy', hierarchy); 
    console.log('movieTiles', movieTiles); 

    let createTreeMap = d3.treemap()          // obtain x0, x1, y0, y1
                            .size([1000, 600])
    createTreeMap(hierarchy); 

    let block = canvas.selectAll('g')
                        .data(movieTiles)
                        .enter()
                        .append('g')
                        .attr('transform', (movieItem) => {
                            return 'translate(' + movieItem['x0'] + ',' + movieItem['y0'] + ')'
                        })
    
    
    block.append('rect')
            .attr('class', 'title')
            .attr('fill', (movieItem) => {
                let category = movieItem['data']['category'];

                if(category === 'Action'){
                    return 'orange'
                }else if(category === 'Drama'){
                    return 'lightgreen'
                }else if(category === 'Adventure'){
                    return 'coral'
                }else if(category === 'Family'){
                    return 'lightblue'
                }else if(category === 'Animation'){
                    return 'pink'
                }else if(category === 'Comedy'){
                    return 'khaki'
                }else if(category === 'Biography'){
                    return 'tan'
                }
            })
            .attr('data-name', (movieItem) => {
                return movieItem['data']['name'];
            })
            .attr('data-category', (movieItem) => {
                return movieItem['data']['category'];
            })
            .attr('data-value', (movieItem) => {
                return movieItem['data']['value'];
            })
            .attr('width', (movieItem) => {
                return movieItem['x1'] - movieItem['x0'];
            })
            .attr('height', (movieItem) => {
                return movieItem['y1'] - movieItem['y0'];
            })

    block.append('text')
    .text((movieItem) => {
        return movieItem['data']['name']
    })
    .attr('x', 8)
    .attr('y', 20)
    .style('font-size', '11px');
    
};

let drawLegend = () => {

    const legendData = [
        { category: 'Action', color: 'orange' },
        { category: 'Drama', color: 'lightgreen' },
        { category: 'Adventure', color: 'coral' },
        { category: 'Family', color: 'lightblue' },
        { category: 'Animation', color: 'pink' },
        { category: 'Comedy', color: 'khaki' },
        { category: 'Biography', color: 'tan' }
    ];

    let legendWidth = 24;
    let legendHeight = 24;
    let legendPadding = 24;
    let legendGap = 12;

    legend.attr("width", 150 )
            .attr("height", legendHeight * legendData.length + legendPadding * 2 + legendGap *(legendData.length-1) )

    let legendGroup = legend.selectAll('g')
                            .data(legendData)
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
                return d['color']
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

d3.json(movieURL).then(
    (data, error) => {
        if (error) {
            console.log("fetch data", error);
        }else{
            movieData = data;
            console.log("movieData", movieData);
            drawTreeMap();
            drawLegend();
        }
    }
);