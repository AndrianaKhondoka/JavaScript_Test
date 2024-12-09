// Отримання елементів input для введення пар <name> = <value> та div, де буде додаватись список цих пар.
const pairInput = document.getElementById('pair');
const list = document.getElementById('list');

// Створення ul
const ul = document.createElement('ul');


// Отримання button "Add"
const buttonAdd = document.getElementsByTagName('button')[0];


// Додавання обробника подій при натисканні на кнопку "Add"
buttonAdd.addEventListener('click', function (e) {
    e.preventDefault();
    const pair = pairInput.value;

    // Перевірка введеного тексту на відповідність вимогам (пара значень <name> = <value> може містити
    // тільки літери та цифри,знак рівності для розмежування пари, пробіли до та/або після знака рівності)
    if (pair.match(/^\s*([A-Za-z0-9]+)\s*=\s*([A-Za-z0-9]+)\s*$/g)) {

        // ігнорування пробілів за умовою ТЗ
        let pairUpdate = pair.replaceAll(' ', '');
        // отримання масиву значень введеної пари
        let pairSplit = pairUpdate.split('=');
        // <name> - назва пари, <value> - значення пари
        let name = pairSplit[0];
        let value = pairSplit[1];

        // створення елементу li та наповнення його текстом
        let pairItem = document.createElement('li');
        pairItem.innerText = `${name}=${value}`;
        // перемикач класу при кліці
        pairItem.onclick = function () {
            pairItem.classList.toggle('selected');
        }
        // додавання елементів li до списку
        ul.appendChild(pairItem);
        list.appendChild(ul);
        // очищення вмісту input
        pairInput.value = "";
    }
    // при недотриманні вимог при введені пари <name> = <value> спливаюче вікно з попередженням
    else {
        alert('Incorrect way of input! Names and Values can contain only alpha-numeric characters!');
    }
});


// Функція для отримання інформації з елементів списку
function listForSort() {

    let arrForSort = [];
    let pairList= ul.getElementsByTagName('li');

    // ітерація отриманого об'єкту
    for (const item of pairList) {
        // отримання текстового вмісту кожного елемента об'єкту
        let itemStr = item.textContent;
        let name = itemStr.split('=')[0];
        let value = itemStr.split('=')[1];

        // створення об'єкту зі значеннями name та value
        let arrObj = {name, value};
        console.log(arrObj);
        // пушимо кожен об'єкт до масиву
        arrForSort.push(arrObj);

    }
    // повернення масиву для подальшого сортування
    return arrForSort
}

//Функція створює відсортований список
function createPairSort(arraySort) {
    // очищення існуючого списку
    ul.innerHTML = "";
    // ітерація відсортованого масиву
    for (const item of arraySort) {
        // створення для кожного обє'кта відсортованого масиву елемента li та наповнення його текстом
        let pairSort = document.createElement('li');
        pairSort.innerText = `${item.name}=${item.value}`;
        // перемикач класу при кліці
        pairSort.onclick = function () {
           pairSort.classList.toggle('selected');
        }
        // додавання відсортованих елементів до списку
        ul.appendChild(pairSort);
        list.appendChild(ul);
    }
}

// Отримання button "Sort by Name"
const buttonSortName = document.getElementsByTagName('button')[1];

// Додавання обробника подій при натисканні на кнопку "Sort by Name"
buttonSortName.addEventListener('click', function (e) {
    e.preventDefault();
    // виклик функціЇ, що повертає масив для сортування
    let arrForSort = listForSort();
    // сортування об'єктів масиву за назвою (за умовою ТЗ за зростанням)
    let arraySort = arrForSort.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
    });
    // виклик функції, що створює відсортований список
    createPairSort(arraySort);
});

// Отримання button "Sort by Value"
const buttonSortValue = document.getElementsByTagName('button')[2];

// Додавання обробника подій при натисканні на кнопку "Sort by Value"
buttonSortValue.addEventListener('click', function (e) {
    e.preventDefault();
    // виклик функціЇ, що повертає масив для сортування
    let arrForSort = listForSort();
    // сортування об'єктів масиву за значенням (за умовою ТЗ за зростанням)
    let arraySort = arrForSort.sort((a, b) => {
        if (a.value < b.value) {
            return -1;
        }
    });
    // виклик функції, що створює відсортований список
    createPairSort(arraySort);
});

// Отримання button "Delete"
const buttonDelete = document.getElementsByTagName('button')[3];

// Додавання обробника подій при натисканні на кнопку "Delete"
buttonDelete.addEventListener('click', function (e) {
    e.preventDefault();
    // отримання HTML-колекції з елементів списку
    let pairList = ul.getElementsByTagName('li');
    // цикл для елементів HTML-колекції в порядку зменшення
    for (let i = pairList.length - 1; i >= 0; i--) {
        // перевірка умови на наявність класу 'selected'
        if (pairList[i].classList.contains('selected')) {
            // видалення вибраних пунктів списку
            pairList[i].remove();
        }
    }
});
