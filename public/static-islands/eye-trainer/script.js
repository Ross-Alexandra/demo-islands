import { createCirclePath } from './routines/index.js';

/** @type {SVGElement | undefined} */
let path;

/** @type {SVGCircleElement} */
let target;

export const ROUTINES = /** @type {const} */ ([
    "Circle",
]);

/** @type {(routine: typeof ) => SVGElement | undefined} */
export function onRoutineChange(routine) {
    const svgElement = document.getElementById("backdrop");
    svgElement.innerHTML = "";

    switch (routine) {
    case "Circle":
        return createCirclePath(svgElement);
    default:
        break;
    }
}

/** @type {(targetPath: SVGElement | undefined) => SVGCircleElement} */
export function createTarget(targetPath = path) {
    const svgElement = document.getElementById("backdrop");
    const target = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    if (!targetPath) throw new Error("No path provided");

    const targetStartPoint = targetPath.getPointAtLength(0);

    target.setAttribute("cx", targetStartPoint.x);
    target.setAttribute("cy", targetStartPoint.y);

    target.setAttribute("r", "25");
    target.setAttribute("fill", "white");

    svgElement.appendChild(target);

    return target;   
}

/** @type {(target: SVGCircleElement, targetPath: SVGElement | undefined, distance: number) => void} */
export function moveTarget(target, targetPath = path, distance) {
    if (!targetPath) throw new Error("No path provided");

    const targetLength = targetPath.getTotalLength();
    const targetPoint = targetPath.getPointAtLength(distance % targetLength);

    target.setAttribute("cx", targetPoint.x);
    target.setAttribute("cy", targetPoint.y);
}

window.addEventListener("load", () => {
    path = onRoutineChange(ROUTINES[0]);
    target = createTarget(path);

    const totalPathLength = path.getTotalLength();
    const rotationDuration = 3000; // ms
    const rotationSpeed = totalPathLength / rotationDuration; // px/ms

    let previousTimestamp = performance.now();
    let distance = 0;
    function loop(timestamp) {
        setTimeout(() => {
            const delta = timestamp - previousTimestamp;
            distance += (delta * rotationSpeed);
    
            moveTarget(target, path, distance);
            previousTimestamp = timestamp;

            window.requestAnimationFrame(loop);
        });
    }

    window.requestAnimationFrame(loop);
});
