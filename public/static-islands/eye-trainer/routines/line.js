/**
 * 
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
export default (svgElement) => {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "5%");
    line.setAttribute("y1", "50%");
    line.setAttribute("x2", "95%");
    line.setAttribute("y2", "50%");

    svgElement.appendChild(line);

    return line;
}