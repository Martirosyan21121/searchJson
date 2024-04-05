$(document).ready(function () {
    $('#search').keyup(function () {
        $('#result').html('');
        let searchInput = $('#search').val();
        let ignoreCase = new RegExp(searchInput, "i");
        let unicode = new RegExp(searchInput, "u");

        let generateLetter = generateCharMap()
        let generateLetter2 = generateCharMap2()

        $.getJSON('json/data.json', function (data) {

            $.each(data, function (key, value) {
                let armenianSearchInput = convertToArmenian(searchInput.toLowerCase());
                let englishSearchInput = convertToEnglish(searchInput.toLowerCase())
                console.log(armenianSearchInput, 'armenianSearchInput')
                console.log(englishSearchInput, 'englishSearchInput')
                if (value.name.search(ignoreCase, unicode) !== -1 ||
                    value.name.toLowerCase().includes(armenianSearchInput.toLowerCase())
                    || value.name.toLowerCase().includes(englishSearchInput.toLowerCase())) {

                    $('#result').append('<li class="list-group-item link-class">' + ' ID -> ' + value.id + ' | Name -> ' + value.name + '</li>');
                }
            });
        });

        function convertToArmenian(input) {
            let armenianString = ''
            let i = 0;
            while (i < input.length) {
                console.log(i, 'i')
                if (i < input.length - 1 && generateLetter[input.substr(i, 2)]) {
                    armenianString += generateLetter[input.substr(i, 2)];
                    i += 2;
                } else {
                    const englishLetter = input[i].toLowerCase();
                    armenianString += generateLetter[englishLetter] || input[i];
                    console.log(armenianString, 'Armenian letter')
                    i++;
                }
            }
            return armenianString;
        }

        function convertToEnglish(input) {
            let englishString = ''
            let i = 0;
            while (i < input.length) {
                console.log(i, 'i')
                const armenianLetter = input[i].toLowerCase();
                englishString += generateLetter2[armenianLetter] || input[i];
                console.log(englishString, 'English letter')
                i++;
            }
            return englishString;
        }
    });

    function generateCharMap() {
        const englishLetters = ['a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'g', 's',
            't', 'v', 'x', 'w', 'y', 'z',
            'u', 'ch', 'sh', 'ev', 'dz', 'gh', 'r'];
        const armenianLetters = ['ա', 'բ', 'ց', 'դ', 'ե', 'ֆ',
            'գ', 'հ', 'ի', 'ջ', 'կ', 'լ',
            'մ', 'ն', 'օ', 'պ', 'գ', 'ս',
            'տ', 'վ', 'խ', 'ո', 'յ', 'զ',
            'ու', 'չ', 'շ', 'և', 'ձ', 'ղ', 'ռ'];
        const charMap = {};
        console.log(charMap, 'chatMap')

        for (let i = 0; i < englishLetters.length; i++) {
            const englishLetter = englishLetters[i];
            charMap[englishLetter] = armenianLetters[i];
        }
        return charMap;
    }

    function generateCharMap2() {
        const englishLetters = ['a', 'b', 'c', 'd', 'e', 'f',
            'g', 'h', 'i', 'j', 'k', 'l',
            'm', 'n', 'o', 'p', 'g', 's',
            't', 'v', 'x', 'w', 'y', 'z',
            'u', 'ch', 'sh', 'ev', 'dz', 'gh'];
        const armenianLetters = ['ա', 'բ', 'ց', 'դ', 'ե', 'ֆ',
            'գ', 'հ', 'ի', 'ջ', 'կ', 'լ',
            'մ', 'ն', 'օ', 'պ', 'գ', 'ս',
            'տ', 'վ', 'խ', 'ո', 'յ', 'զ',
            'ու', 'չ', 'շ', 'և', 'ձ', 'ղ'];
        const charMap = {};
        console.log(charMap, 'chatMap')

        for (let i = 0; i < armenianLetters.length; i++) {
            const armenianLetter = armenianLetters[i];
            charMap[armenianLetter] = englishLetters[i];
        }
        return charMap;
    }
});