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
                    $('#result').append('<li class="list-group-item link-class">' + ' ID -> ' + value.id + ' | Name -> ' + value.name + '</li>');
                } else if (value.name.toLowerCase().includes(armenianSearchInput.toLowerCase())) {
                    $('#result').append('<li class="list-group-item link-class">' + ' ID -> ' + value.id + ' | Name -> ' + value.name + '</li>');
                }
            });

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
                        if (input[i + 1].toLowerCase() === 'h') {
                            armenianString += (Math.random() > 0.5) ? 'չ' : 'ճ';
                            i++;
                        } else {
                            armenianString += 'c';
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
        const englishLetters = ['a', 'b', 'c', 'd', 'f',
            'g', 'h', 'i', 'k', 'l',
            'm', 'n', 'o', 'g', 's', 'v', 'w', 'y', 'z',
            'u', 'sh', 'ev', 'dz', 'gh'];
        const armenianLetters = ['ա', 'բ', 'ց', 'դ', 'ֆ',
            'գ', 'հ', 'ի', 'կ', 'լ',
            'մ', 'ն', 'օ', 'գ', 'ս', 'վ', 'ո', 'յ', 'զ',
            'ու', 'շ', 'և', 'ձ', 'ղ'];
        const charMap = {};
        console.log(charMap, 'chatMap')

        for (let i = 0; i < englishLetters.length; i++) {
            const englishLetter = englishLetters[i];
            charMap[englishLetter] = armenianLetters[i];
        }
        return charMap;
    }


});