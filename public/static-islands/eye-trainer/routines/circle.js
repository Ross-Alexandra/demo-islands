/**
 * 
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
export default (svgElement) => {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", "40%");
    circle.setAttribute("fill", "none");

    svgElement.appendChild(circle);

    return circle;
}