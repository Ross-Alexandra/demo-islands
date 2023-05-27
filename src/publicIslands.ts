interface Island {
    name: string; // Must match the name of the island in /public/static-islands
    description: string;
}

export const publicIslands: Island[] = [{
    name: 'demo',
    description: 'A demo placeholder island',
}];
