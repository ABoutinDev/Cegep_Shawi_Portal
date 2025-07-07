<script lang="ts" setup></script>

<template>
    <label for="imageInput">
        <img src="../../assets/icons/download_icon.png" alt="download_icon">
        <p>Click to import image</p>
    </label>
    <input id="imageInput" type="file">
</template>

<style scoped>
input[type="file"] {
    display: none;
}
label {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem 0;
    width: 100%;
    border: 2px dashed var(--beige1);
    border-radius: 8px;
    cursor: pointer;
    transition: transform 0.4s;
}
label * {
    margin: 0;
}
label:hover {
    background-color: var(--dark-grey2);
}
img {
    width: 40px;
}
</style>