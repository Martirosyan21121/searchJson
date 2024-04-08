$(document).ready(function () {
    $('#search').keyup(function () {
        $('#result').html('');
        let searchInput = $('#search').val();
        let ignoreCase = new RegExp(searchInput, "i");
        let unicode = new RegExp(searchInput, "u");

        let generateLetter = generateCharMap()

        $.getJSON('json/data.json', function (data) {
            $.each(data, function (key, value) {

                let armenianSearchInput = convertToArmenian(searchInput.toLowerCase());
                console.log(armenianSearchInput, 'armenianSearchInput')
                if (value.name.search(ignoreCase, unicode) !== -1) {
                    let $button = $('<button class="link-class">').addClass('list-group-item list-group-item-action').text('ID -> ' + value.id + ' | Name -> ' + value.name);

                    $button.data('id', value.id)
                    $button.data('name', value.name)

                    $('#result').append($button);
                } else if (value.name.toLowerCase().includes(armenianSearchInput.toLowerCase())) {
                    let $button = $('<button class="link-class">').addClass('list-group-item list-group-item-action').text('ID -> ' + value.id + ' | Name -> ' + value.name);

                    $button.data('id', value.id)
                    $button.data('name', value.name)

                    $('#result').append($button);
                }
            });
            $('.link-class').click(function () {
                let id = $(this).data('id')
                let name = $(this).data('name')
                encodeURIComponent(name)
                alert(id)
                window.location.href = 'data.html?id=' + id;
            })
        });

        function convertToArmenian(input) {
            let armenianString = '';
            for (let i = 0; i < input.length; i++) {
                switch (input[i].toLowerCase()) {
                    case 'r':
                        armenianString += Math.random() > 0.5 ? 'ր' : 'ռ'.toLowerCase();
                        break;

                    case 't':
                        armenianString += Math.random() > 0.5 ? 'տ' : 'թ'.toLowerCase();
                        break

                    case 'x':
                        armenianString += Math.random() > 0.5 ? 'խ' : 'ղ'.toLowerCase();
                        break

                    case 'p':
                        armenianString += Math.random() > 0.5 ? 'պ' : 'փ'.toLowerCase();
                        break

                    case 'j':
                        armenianString += Math.random() > 0.5 ? 'ժ' : 'ջ'.toLowerCase();
                        break

                    case 'e':
                        armenianString += Math.random() > 0.5 ? 'ե' : 'է'.toLowerCase();
                        break

                    case 'c':
                        if (input[i + 1] && input[i + 1].toLowerCase() === 'h') {
                            armenianString += (Math.random() > 0.5) ? 'չ' : 'ճ';
                            i++;
                        } else {
                            armenianString += 'ց'
                        }
                        break;
                    default:
                        const englishLetter = input[i].toLowerCase()
                        if (i < input.length - 1 && generateLetter[input.substr(i, 2)]) {
                            armenianString += generateLetter[input.substr(i, 2)];
                            i++;
                        } else {
                            armenianString += generateLetter[englishLetter] || input[i];
                        }
                        break;
                }
            }
            return armenianString;
        }
    });

    function generateCharMap() {
        const englishLetters = ['a', 'b', 'd', 'f',
            'g', 'h', 'i', 'k', 'l',
            'm', 'n', 'o', 'g', 's', 'v', 'w', 'y', 'z',
            'u', 'sh', 'ev', 'dz', 'gh'];
        const armenianLetters = ['ա', 'բ', 'դ', 'ֆ',
            'գ', 'հ', 'ի', 'կ', 'լ',
            'մ', 'ն', 'օ', 'գ', 'ս', 'վ', 'ո', 'յ', 'զ',
            'ու', 'շ', 'և', 'ձ', 'ղ'];
        const charMap = {};
        for (let i = 0; i < englishLetters.length; i++) {
            const englishLetter = englishLetters[i];
            charMap[englishLetter] = armenianLetters[i];
        }
        return charMap;
    }
});