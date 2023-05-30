/**
 * Set up the routine objects and the functions which
 * will be used to create the paths.
 */

/** 
 * Creates a circle path in the provided SVG element.
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
function createCirclePath(svgElement) {
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

/**
 * Creates a line path in the provided SVG element.
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
/**
 * 
 * @type {(svgElement: SVGSVGElement) => SVGElement}
 */
function createLinePath(svgElement) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "5%");
    line.setAttribute("y1", "50%");
    line.setAttribute("x2", "95%");
    line.setAttribute("y2", "50%");

    svgElement.appendChild(line);

    return line;
}

/**
 * Setup the constants and variables which will be used
 * to control the animation.
 */

const ROUTINES = /** @type {const} */ ([
    {
        name: "circle",
        routine: createCirclePath,
        reversing: false,
        defaultRotationDuration: 3000,
    }, {
        name: "line",
        routine: createLinePath,
        reversing: true,
        defaultRotationDuration: 1500,
    }
]);

/** @type {SVGElement | undefined} */
let path;

/** @type {SVGCircleElement} */
let target;

/** @type {ROUTINES[number]} */
let currentRoutine;

/** @type {number} */
let rotationDuration = ROUTINES[0].defaultRotationDuration; // ms

/** @type {number} */
let distance = 0;

/** 
 * Resets the animation and creates a new path based on the
 * selected routine. 
 * @type {(routineName: typeof ROUTINES[number]["name"]) => SVGElement | undefined}
 */
export function onRoutineChange(routineName) {
    const svgElement = document.getElementById("backdrop");
    svgElement.innerHTML = "";

    const routine = ROUTINES.find(routine => routine.name === routineName);
    if (!routine) throw new Error("Routine not found");

    currentRoutine = routine;
    path = routine.routine(svgElement);
    target = createTarget(path);

    distance = 0;
    rotationDuration = routine.defaultRotationDuration;
}

/**
 * Creates a target circle in the provided SVG element at the
 * origin of the provided path.
 * @type {(targetPath: SVGElement | undefined) => SVGCircleElement} 
 */
export function createTarget(targetPath = path) {
    const svgElement = document.getElementById("backdrop");
    const target = document.createElementNS("http://www.w3.org/2000/svg", "circle");

    if (!targetPath) throw new Error("No path provided");

    const targetStartPoint = targetPath.getPointAtLength(0);

    target.setAttribute("cx", targetStartPoint.x);
    target.setAttribute("cy", targetStartPoint.y);

    target.setAttribute("r", "17.5");
    target.setAttribute("fill", "darkseagreen");

    svgElement.appendChild(target);

    return target;   
}

/** 
 * Moves the target circle to the provided distance along the
 * provided path.
 * @type {(target: SVGCircleElement, targetPath: SVGElement | undefined, distance: number) => void} 
 */
export function moveTarget(target, targetPath = path, distance) {
    if (!targetPath) throw new Error("No path provided");

    const targetLength = targetPath.getTotalLength();
    const targetPoint = targetPath.getPointAtLength(distance % targetLength);

    target.setAttribute("cx", targetPoint.x);
    target.setAttribute("cy", targetPoint.y);
}


/**
 * Set up the event listeners and start the animation loop.
 */
window.addEventListener("load", () => {
    const svgBox = document.getElementById("view-box");
    const {width, height} = svgBox.getBoundingClientRect();
    const svgElement = document.getElementById("backdrop");
    svgElement.setAttribute("width", width);
    svgElement.setAttribute("height", height);
    svgElement.setAttribute("viewBox", `0 0 ${width} ${height}`);

    const select = document.getElementById("routine-select");
    ROUTINES.forEach(({name}) => {
        const option = document.createElement("option");
        option.value = name;
        option.innerText = name;

        select.appendChild(option);
    });

    onRoutineChange(ROUTINES[0].name);

    let previousTimestamp = performance.now();
    function loop(timestamp) {
        setTimeout(() => {
            const totalPathLength = path.getTotalLength();
            const rotationSpeed = totalPathLength / rotationDuration; // px/ms
            const delta = timestamp - previousTimestamp;

            if (!currentRoutine) throw new Error("No routine selected");

            distance += (delta * rotationSpeed);


            if (distance >= totalPathLength * 2) {
                distance = 0;
            }

            if (currentRoutine.reversing && distance >= totalPathLength) {
                const newPosition = totalPathLength - (distance - totalPathLength);
                moveTarget(target, path, newPosition);
            } else {
                moveTarget(target, path, distance);
            }

            previousTimestamp = timestamp;
            window.requestAnimationFrame(loop);
        });
    }

    window.requestAnimationFrame(loop);
});
