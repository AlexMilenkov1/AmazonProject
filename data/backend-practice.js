const xrh = new XMLHttpRequest();

xrh.addEventListener('load', () => {
    console.log(xrh.response);
})

xrh.open('GET', 'https://supersimplebackend.dev');
xrh.send();
