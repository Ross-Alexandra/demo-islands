<template>
    <div class="content" data-theme="dark">
        <nav>
            <h1>Demo Islands</h1>
            <p>A collection of my frontend snippets and tiny projects</p>
        </nav>
        <div class="app-body">
            <router-view />
        </div>
        <footer>
            <p>
                &copy; {{ new Date().getFullYear() }} Ross Alexandra
            </p>
        </footer>
    </div>
</template>

<style lang="scss">
* {
    box-sizing: border-box;
}

body {
    margin: unset;
}

h1, h2, h3, h4, h5, h6, p {
    margin: unset;
    font-family: 'Poppins', sans-serif;
    color: var(--text-color);
}

.content {
    &[data-theme="dark"] {
        --app-background-color: #202120;
        --text-color: #fff;
        --layer-color: rgba(255, 255, 255, 0.1);
        --border-color: rgba(255, 255, 255, 0.2);
    }

    &[data-theme="light"] {
        --app-background-color: #dce9dc;
        --text-color: #000;
        --layer-color: rgba(0, 0, 0, 0.1);
        --border-color: rgba(0, 0, 0, 0.2);
    }

    display: flex;
    flex-direction: column;
    
    background-color: var(--app-background-color);
    color: var(--text-color);

    overflow-x: hidden;

    width: 100vw;
    min-height: 100vh;
    min-height: 100svh;
}

nav {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: start;

    padding: 15px;

    background-color: var(--layer-color);
    border-bottom: 1px solid var(--border-color);
}

.app-body {
    padding: 15px;
}

footer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px;

    background-color: var(--layer-color);
    border-top: 1px solid var(--border-color);

    margin-top: auto;
}
</style>