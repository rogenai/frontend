const refreshPage = () => {
    window.location.reload();
}

const redirect = (url: string) => {
    window.location.href = url;
}

export { refreshPage, redirect };