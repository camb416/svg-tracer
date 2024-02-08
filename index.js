document.addEventListener('DOMContentLoaded', function() {
    loadSVGAndPlotDots('curves.svg');

});

function loadSVGAndPlotDots(svgFile) {
    fetch(svgFile)
        .then(response => response.text())
        .then(svgData => {
            const svgContainer = document.getElementById('svgContainer');
            svgContainer.innerHTML = svgData; // Load the SVG into the container
            //plotDotsAlongPaths(svgContainer);
            setup();
        })
        .catch(error => console.error('Error loading the SVG file:', error));
}

function plotDotsAlongPaths(svgContainer) {
    const paths = svgContainer.querySelectorAll('path');
    const numDots = 20; // Number of dots you want to plot along each path

    paths.forEach(path => {
        const pathLength = path.getTotalLength();
        for (let i = 0; i <= numDots; i++) {
            const point = path.getPointAtLength(pathLength * i / numDots);
            plotDot(svgContainer, point.x, point.y);
        }
    });
}

function plotDot(svgContainer, x, y) {
    const dot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    dot.setAttribute('cx', x);
    dot.setAttribute('cy', y);
    dot.setAttribute('r', 3); // Radius of the dot
    dot.setAttribute('fill', 'red'); // Dot color

    svgContainer.querySelector('#Layer_1').appendChild(dot);
}

function getPointAlongPathByPercentage(path, percentage) {
    const pathLength = path.getTotalLength();
    return path.getPointAtLength(pathLength * percentage);
}

var pct;
function setup(){
    let p = getPointAlongPathByPercentage(document.querySelector('path'), 0.5);
    // console.log(p)
    pct = 0;

    window.requestAnimationFrame(update)
}
function update(time){

    let dur = document.getElementById("speedslider").value;

    let div = dur*1000

    let pct = (time%div)/div

    // console.log(pct);
    // pct += 0.01;
    // if(pct > 1){
    //     pct = 0;
    // }

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawGrid(ctx, 10, 10, 65,49, 'lightgray');


    ctx.fillStyle = 'red';
    ctx.strokeStyle = null;
    let paths = document.querySelectorAll('path');
    for(let i=0;i<paths.length;i++){
        drawDotOnPath(ctx, paths[i], pct);

    }




    window.requestAnimationFrame(update)

}

function drawDotOnPath(ctx, path, pct){
    let pt = getPointAlongPathByPercentage(path, pct);
    ctx.beginPath();
    ctx.arc(pt.x,pt.y,6,0,2*Math.PI)
    ctx.fill();
}

function drawGrid(ctx, x, y, w, h, color){
    ctx.beginPath();
    ctx.strokeStyle = color;
    for(let i = 0; i < w; i++){
        ctx.moveTo(i * x, 0);
        ctx.lineTo(i * x, h * y);
    }
    for(let i = 0; i < h; i++){
        ctx.moveTo(0, i * y);
        ctx.lineTo(w * x, i * y);
    }
    ctx.stroke();
}
