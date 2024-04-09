$(document).ready(function () {
    function getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    }

    const id = getQueryParam('id');
    const name = getQueryParam('name');

    $('#idDisplay').text(`ID: ${id}`);
    $('#nameDisplay').text(`Name: ${name}`);

    $('#back').click(function (){
        alert('Back to search page')
        window.location.href = 'index.html'

    })
});

