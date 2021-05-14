const buttonOpne = document.querySelector(".main__game_button");
const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__buttonClose");
const popupQuest = document.querySelector(".popup__question");
const popupButton = document.querySelector(".popup__button");
const popupInput = document.querySelector(".popup__answer");
const popupTitle = document.querySelector(".popup__title");

const questArr = [
                    ['Кто должен соблюдать правила дорожного движения?',
                    'Мигает зеленый сигнал светофора, что это значит',
                    'С какого возраста разрешается ездить по улицам (проезжей части) на велосипеде ?',
                    'Можно ли идти по пешеходному переходу если загорелся желтый цвет?',
                    'Можно ли играть на проежей части или около?',
                    'С какова возроста можно ездить на переднем седении автомобиля?',
                    'Разметка дороги, обозначающая пешеходный переход, это:',
                    'С какой стороны нужно обходить автобус?',
                    'Сколько сигналов имеет светофор для пешеходов?',
                    'Как называется траспорт для перевозки людей?'],
                    [
                        ['Водители','Пешеходы','И водители, и пешеходы'],
                        ['Cломался светофор','Истекает время зеленого сигнала, начинать движение нельзя','Надо торопиться и перебежать дорогу'],
                        ['с 12','с 14','с 16'],
                        ['Нет, необходимо стоять','Да, если нет машин','Можно перейти'],
                        ['Можно','Нельзя','Можно если прнять меры безоспасности'],
                        ['C 10 лет','C 11 лет','C 12 лет'],
                        ['Тигр','Зебра','Жираф'],
                        ['Автобус обходить нельзя, нужно ждать когда уедет','Впереди','Сзади'],
                        ['3','2','1'],
                        ['Личный','Общий','Общественный']
                    ]
                ];

const answerArr = ['И водители, и пешеходы',
                    'Истекает время зеленого сигнала, начинать движение нельзя',
                    'с 14',
                    'Нет, необходимо стоять',
                    'Нельзя',
                    'C 12 лет',
                    'Зебра',
                    'Сзади',
                    '1',
                    'Общественный'
                ]                


let qAnda = 0;
let point = 0;
let raund = 1;


function newGame(){
    qAnda=0;
    point=0;
    raund=1;
    popupInput.classList.remove('popup__answer_hidden');
    popupButton.disabled = false;
    popupTitle.innerHTML = raund+'/10';
    addQuest(questArr[0][qAnda]);
    for( var i=0;i<=2;i++){
        addAns(questArr[1][qAnda][i],i);
    }
}
function addQuest(que){
    popupQuest.innerHTML = que;
}
function addAns(ans,num){
    popupInput[num].textContent = ans;
}
function nextQuest(){
    raund=raund+1;
    validRaund();
    if( raund === 11){
        return
    }
    valid(answerArr[qAnda]);
    qAnda =qAnda+1;
    for( let i=0;i<=2;i++){
        addAns(questArr[1][qAnda][i],i);
    }
    addQuest(questArr[0][qAnda]);
}
function validRaund(){
    if(raund===11){
        //popupButton.style.visibility = 'hidden';
        popupButton.classList.add('popup__answer_hidden');
        popupInput.classList.add('popup__answer_hidden');
        popupButton.disabled = true;
        popupQuest.innerHTML = "Молодец ты набрал "+point;
    }
    else{
        popupTitle.innerHTML = raund+'/10';
    }
}
function valid(que){
    const answer = popupInput.value;
   if(que === answer){
       point=point+1;
   }
}
function openPopup(){
    popup.classList.add('popup__open');
    newGame();
}
function closePopup(){
    popup.classList.remove('popup__open');
}

buttonOpne.addEventListener('click',()=>{
    openPopup();
})
buttonClose.addEventListener('click',()=>{
    closePopup();
})
popupButton.addEventListener('click',()=>{
    nextQuest();
})