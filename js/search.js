$(document).ready(function(){
    $('#search').keyup(function(){
        $('#result').html('');
        let searchInput = $('#search').val();
        let ignoreCase = new RegExp(searchInput, "i");
        let unicode = new RegExp(searchInput, "u");

        let generateLetter = generateCharMap()


        $.getJSON('json/data.json', function(data) {
            $.each(data, function(key, value){

                let armenianSearchInput = '';
                for (let i = 0; i < searchInput.length; i++) {
                    const englishLetter = searchInput[i].toLowerCase();
                    armenianSearchInput += generateLetter[englishLetter] || searchInput[i];
                }
                if (value.name.search(ignoreCase, unicode) !== -1 || value.name.toLowerCase().includes(armenianSearchInput.toLowerCase()))
                {
                    console.log(value.name, 'name')
                    console.log(value.id, 'id')
                    console.log(key.id, 'id key')
                    $('#result').append('<li class="list-group-item link-class">'+ ' ID -> '+ value.id + ' | Name ->      ' + value.name + '</li>');

                }
            });
        });
    });
});

function generateCharMap() {
    const englishLetters = 'abcdefghijklmnopqrstuvwxyzr';
    const armenianLetters = 'աբցդեֆգհիջկլմնոպքռստւվւխյզր';
    const charMap = {};

    for (let i = 0; i < englishLetters.length; i++) {
        const englishLetter = englishLetters[i];
        const armenianLetter = armenianLetters[i];
        charMap[englishLetter] = armenianLetter;
    }

    return charMap;
}
