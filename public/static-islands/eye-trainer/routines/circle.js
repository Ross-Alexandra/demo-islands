/**
 * 
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
export default (svgElement) => {
    const width = svgElement.viewBox.baseVal.width;
    const height = svgElement.viewBox.baseVal.height;

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "50%");
    circle.setAttribute("cy", "50%");
    circle.setAttribute("r", 0.4 * Math.min(width, height));
    circle.setAttribute("fill", "none");

    svgElement.appendChild(circle);

    return circle;
}