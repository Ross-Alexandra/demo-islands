import { createCirclePath, createLinePath } from './routines/index.js';

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

/** @type {(routineName: typeof ROUTINES[number]["name"]) => SVGElement | undefined} */
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

/** @type {(targetPath: SVGElement | undefined) => SVGCircleElement} */
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

/** @type {(target: SVGCircleElement, targetPath: SVGElement | undefined, distance: number) => void} */
export function moveTarget(target, targetPath = path, distance) {
    if (!targetPath) throw new Error("No path provided");

    const targetLength = targetPath.getTotalLength();
    const targetPoint = targetPath.getPointAtLength(distance % targetLength);

    target.setAttribute("cx", targetPoint.x);
    target.setAttribute("cy", targetPoint.y);
}

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
