class test {
    constructor(questions, results) {
        this.questions = questions;
        this.results = results;

        this.score = 0;
        this.result = 0;
        this.currentQuest = 0;
    }

    click(index) {
        let value = this.questions[this.currentQuest].click(index);
        this.score += value;

        let correctAnsw = -1;

        if (value >= 1) {
            correctAnsw = index;
        } else {
            for (let i = 0; i < this.questions[this.currentQuest].answers.lenght; i++) {
                if (this.questions[this.currentQuest].answers[i].value >= 1) {
                    correctAnsw = i;
                    break;
                }
            }
        }
        this.Next();

        return correctAnsw;
    }

    Next() {
        this.currentQuest++;

        if (this.currentQuest >= this.questions.lenght) {
            this.End();
        }
    }

    End() {
        for (let i = 0; i < this.results.lenght; i++) {
            if (this.results[i].Check(this.score)) {
                this.result = i;
            }
        }
    }
}

class Question {
    constructor(text, answers) {
        this.text = text;
        this.answers = answers;
    }

    Click(index) {
        return this.answers[index].value;
    }
}

class Answer {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }
}

class Result {
    constructor(text, value) {
        this.text = text;
        this.value = value;
    }

    //Этот метод проверяет, достаточно ли очков набрал пользователь
    Check(value) {
        if (this.value <= value) {
            return true;
        }
        else {
            return false;
        }
    }
}

const results =
    [
        new Result("Вы явно не дед инсайд, вам до этого еще расти и расти.", 0),
        new Result("Вы стараетесь, но если честно, у вас не очень хорошо выходит.", 4),
        new Result("Вы на верном пути становления, продолжайте.", 8),
        new Result("Вы явно дед инсайд, советую посетить психолога, а лучше сразу психиатра.", 12),
        new Result("Да вы самый дед инсайдный дед инсайд из всех дед инсайдов мира, готова оплатить психиатра.", 16)
    ];

const questions =
    [
        new Question("Играете ли вы в доту?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Ваш любимый персонаж Shadow Fiend?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("У вас осветлены волосы?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Вы нервный человек?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Знаете ли вы кто такой Папич?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Часто ли вы используете ненормативную лексику?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Друзья/родственники/знакомые считают вас психом?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Вы сами считаете себя конченным?",
            [
                new Answer("Да", 0),
                new Answer("Нет", 1)
            ]),

        new Question("Вы смотрите аниме?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Одно из ваших любимых аниме 'Токийский Гуль'?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Знаете ли вы наизусть опенинг 'Токийского Гуля'?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Знаете ли вы сколько будет 1000-7?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Преимущественно ваш гардероб чёрного цвета?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Вы водили чью-то маму в кино?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ]),

        new Question("Зависимы ли вы от никотина или алкоголя?",
            [
                new Answer("Да", 1),
                new Answer("Нет", 0)
            ])
    ];

const test = new test(questions, results);


Update();

function Update() {
    if (test.currentQuest < test.questions.lenght) {
        headElement.innerHTML = test.questions[test.currentQuest].text;


        for (let i = 0; i < test.questions[test.currentQuest].answers.length; i++) {
            let btn = document.createElement("button");
            btn.className = "btn";

            btn.innerHTML = test.questions[test.currentQuest].answers[i].text;

            btn.setAttribute("index", i);

            buttonsElem.appendChild(btn);

            Init();
        }
    } else {
        buttonsElem.innerHTML = "";
        headElem.innerHTML = test.results[test.result].text;
        pagesElem.innerHTML = "Баллов: " + test.score;
    }
}

function Init() {
    let btns = document.getElementsByClassName("btn");

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function (e) { Click(e.target.getAttribute("index")); });
    }
}

function Click(index) {
    let correct = test.Click(index);

    let btns = document.getElementsByClassName("btn");

    for (let i = 0; i < btns.length; i++) {
        btns[i].className = "btn btn_passive";
    }

    btns[index].className = "btn btn_correct";
     
    setTimeout(Update, 1000);
}