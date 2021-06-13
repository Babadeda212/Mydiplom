const buttonOpne = document.querySelector(".main__game_button");
const popup = document.querySelector(".popup");
const buttonClose = document.querySelector(".popup__buttonClose");
const popupQuest = document.querySelector(".popup__question");
const popupButton = document.querySelector(".popup__button");
const popupInput = document.querySelector(".popup__answer");
const popupTitle = document.querySelector(".popup__title");
const popupCreateOpen = document.querySelector(".main__create-button");
const popupCreateClose = document.querySelector(".popup__create_close");
const popupCreate = document.querySelector(".popup__create");
const selectTest = document.querySelector('.main__game_select');
const headerButton = document.querySelector('.header__button');


let questArr
let answerArr
let testName

if(JSON.parse(localStorage.getItem('questArr'))===null){
    questArr = [
        [
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
        ]
];
}else{
    questArr = JSON.parse(localStorage.getItem('questArr'));
}

if(JSON.parse(localStorage.getItem('answerArr'))===null){
    answerArr = [
        ['И водители, и пешеходы',
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
    ]              
}else{
    answerArr = JSON.parse(localStorage.getItem('answerArr'));
}

if(JSON.parse(localStorage.getItem('nameTest'))===null){
    testName =[
        'Викторина по ПДД'
    ]  
}else{
    testName = JSON.parse(localStorage.getItem('nameTest'));
}

let qAnda = 0;
let point = 0;
let raund = 1;


function newGame(x){
    qAnda=0;
    point=0;
    raund=1;
    popupButton.classList.remove('popup__answer_hidden');
    popupInput.classList.remove('popup__answer_hidden');
    popupButton.disabled = false;
    popupTitle.innerHTML = raund+'/10';
    addQuest(questArr[x][0][qAnda]);
    for( var i=0;i<=2;i++){
        addAns(questArr[x][1][qAnda][i],i);
    }
}
function addQuest(que){
    popupQuest.innerHTML = que;
}
function addAns(ans,num){
    popupInput[num].textContent = ans;
}
function nextQuest(x){
    valid(answerArr[x][qAnda]);
    qAnda =qAnda+1;
    raund=raund+1;
    validRaund();
    if( raund === 11){
        return
    }
    for( let i=0;i<=2;i++){
        addAns(questArr[x][1][qAnda][i],i);
    }
    addQuest(questArr[x][0][qAnda]);
}
function validRaund(){
    if(raund===11){
        popupButton.classList.add('popup__answer_hidden');
        popupInput.classList.add('popup__answer_hidden');
        popupButton.disabled = true;
        popupQuest.innerHTML = "Молодец ты набрал "+point + " баллов";
    }
    else{
        popupTitle.innerHTML = raund+'/10';
    }
}
function valid(que){
    const answer = popupInput.value;
    console.log(que===answer);
   if(que === answer){
       point=point+1;
   }
}
const popupCreateQuest = popupCreate.querySelector('.popup__question');
const popupCreateaAnsw1 = popupCreate.querySelector('.popup__answer1');
const popupCreateaAnsw2 = popupCreate.querySelector('.popup__answer2');
const popupCreateaAnsw3 = popupCreate.querySelector('.popup__answer3');
const popupCreateTitle = popupCreate.querySelector('.popup__title');
const popupCreateCheck = popupCreate.querySelectorAll('.popup__radio');
const popupNext= popupCreate.querySelector('.button');
const popupNameTest = popupCreate.querySelector('.popup__name_test');
const popupName = popupCreate.querySelector('.popup__name');
var newQuestArr = [];
var newAnswArr = [];
var newAnsArr =[];
var newArrQues = [];
var newvalidArrQuest = [];
var newArr =[];
let testQuest = 1;
function createTest(quest,answ1,answ2,answ3){
    newQuestArr.push(quest);
    newAnswArr.push(answ1,answ2,answ3);
    newAnsArr.push(newAnswArr);
    newAnswArr = [];
    validChecked(answ1,answ2,answ3);
    testQuest = testQuest+1;
    popupCreateTitle.textContent = testQuest+'/10';
    popupName.classList.add('close');
    if(testQuest===11){
        newArr.push(newQuestArr,newAnsArr);
        questArr.push(newArr);
        answerArr.push(newvalidArrQuest);
        newQuestArr=[];
        newAnswArr=[];
        newAnsArr=[];
        newvalidArrQuest=[];
        newArr=[];
        testQuest = 1;
        popupCreateTitle.textContent = testQuest+'/10';
        popupCreateQuest.value = '';
        popupCreateaAnsw1.value = '';
        popupCreateaAnsw2.value = '';
        popupCreateaAnsw3.value = '';
        testName.push(popupNameTest.value);
        nameTest(popupNameTest.value);
        saveTest();
        closePopup(popupCreate);
        return
    }
    else{
        popupCreateQuest.value = '';
        popupCreateaAnsw1.value = '';
        popupCreateaAnsw2.value = '';
        popupCreateaAnsw3.value = '';
    }
}
function saveTest(){
    localStorage.setItem('questArr', JSON.stringify(questArr));
    localStorage.setItem('answerArr', JSON.stringify(answerArr));
    localStorage.setItem('nameTest', JSON.stringify(testName));
}
function validChecked(ans1,ans2,ans3){
    if(popupCreateCheck[0].checked){
        newvalidArrQuest.push(ans1);
    } else if(popupCreateCheck[1].checked){
        newvalidArrQuest.push(ans2);
    }else if(popupCreateCheck[2].checked){
        newvalidArrQuest.push(ans3);
    }
}
function nameTest(name){
    let newOption = new Option(name, name);
    selectTest.append(newOption);
    popupName.classList.remove('close');
}

popupNext.addEventListener(('click'),()=>{
    createTest(popupCreateQuest.value,popupCreateaAnsw1.value,popupCreateaAnsw2.value,popupCreateaAnsw3.value);    
})
function selectedTest(selTest){
    for( let i=0;i<+selTest.length;i++){
        if(selTest.value === selTest[i].value){
            return i;
        }
    }
}

function openPopup(pop){
    pop.classList.add('popup__open');
}
function closePopup(pop){
    pop.classList.remove('popup__open');
}

buttonOpne.addEventListener('click',()=>{
    openPopup(popup);
    newGame(selectedTest(selectTest));
})
buttonClose.addEventListener('click',()=>{
    closePopup(popup);
})
popupButton.addEventListener('click',()=>{
    nextQuest(selectedTest(selectTest));
})
popupCreateOpen.addEventListener('click',()=>{
    openPopup(popupCreate);
    popupName.classList.remove('close');
})
popupCreateClose.addEventListener('click',()=>{
    closePopup(popupCreate);
})
headerButton.addEventListener(('click'),()=>{
    localStorage.clear();
    window.location.reload();
})

testName.forEach(element => {
    nameTest(element);
});