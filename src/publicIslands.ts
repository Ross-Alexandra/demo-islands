interface Island {
    name: string; // Must match the name of the island in /public/static-islands
    description: string;
}

export const publicIslands: Island[] = [{
    name: 'eye-trainer',
    description: 'A tool which can be used to practice following a moving object with your eyes. This tool was created to learn how to animate along a path in SVG.',
}, {
    name: 'example',
    description: 'An example island which can be used as a template for creating new islands.'
}];
