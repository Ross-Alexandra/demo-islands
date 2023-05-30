<template>
    <div class="content">
        <nav>
            <router-link to="/">Demo Islands</router-link>
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
    color: var(--text-color);
}

a {
    font-family: 'Poppins', sans-serif;
}

.content {
    --app-background-color: rgb(47, 47, 47);
    --text-color: #fff;
    --layer-color: rgba(255, 255, 255, 0.2);
    --border-color: rgba(255, 255, 255, 0.3);

    display: grid;
    grid-template-rows: max-content 1fr max-content;

    background-image:
        linear-gradient(rgba(0, 0, 0, .85), rgba(0, 0, 0, .85)),
        url('https://source.unsplash.com/PRJWxwDmtsE');
    background-size: cover;
    background-position: center;
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

    a {
        color: var(--text-color);
        text-decoration: none;
        font-size: 2rem;
        font-weight: 700;
    }
}

.app-body {
    padding: 15px;

    position: relative;
}

footer {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 15px;

    background-color: var(--layer-color);
    border-top: 1px solid var(--border-color);

    margin-top: auto;

    font-family: 'Poppins', sans-serif;
}
</style>