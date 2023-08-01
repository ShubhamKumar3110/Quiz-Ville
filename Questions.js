//-----------------------------------------------------------------------------------------------------\\
document.getElementById("bg-image").style.backgroundImage = window.localStorage.getItem("bg-image");
document.body.setAttribute("data-theme", window.localStorage.getItem("bg-theme"));

//Used to find if the content is overflowing through the container
function isOverflown(element)
{
    return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

//Used to get any 3 unique indices within a given range and excluding the one with a particular value in the provided array
function index3Filter(max, filter, arre)
{
    const arr = new Array();
    while(arr.length < 3)
    {
        var candidateIndex = Math.floor(Math.random() * max);
        if((arr.indexOf(candidateIndex) === -1) && arre[candidateIndex] != filter)
        {
            arr.push(candidateIndex);
        }
    }
    return(arr);
}
//-----------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------\\
let param = new URLSearchParams(window.location.search);
let path = param.get("path");
let title = param.get("title");
let que = param.get("que");

document.querySelector("#topic h1").innerHTML = title;                  //Adding the topic name
document.getElementById("total-que").innerText = que;                   //Setting the total number of questions

let currentScore = 0;
let currentQuestion = 1;

let correctOption;                  //Keeps track of the button with the correct answer
let chosenAns = new Array();        //Keeps the record of all the options selected or skipped
let QuestionArray;                  //Keeps the record of all the questions

const choices = document.querySelectorAll(".choice");
const questionHead = document.querySelector("#question-space h2");
//-----------------------------------------------------------------------------------------------------//


//-----------------------------------------------------------------------------------------------------\\
//To show the button animation when the answer is eighter right or wrong
function ripple(e)
{
    //Getting the location of point of click
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    //Creating a span element which is then appened at the point of click
    let ripples = document.createElement("span");
    ripples.style.left = x + "px";
    ripples.style.top = y + "px";

    if (this.getAttribute("data-ans") == '1')
    {
        document.querySelector(':root').style.setProperty('--butt-col', '#22ff68a3');
        this.style.borderColor = "#22ff682e";
        this.appendChild(ripples);

        document.getElementById("current").innerHTML = ++currentScore;
        
        chosenAns.push(this.innerText);
        
    } else
    {
        let fade = document.createElement("div");

        document.querySelector(':root').style.setProperty('--butt-col', '#ff0000a3');
        this.style.borderColor = "#ff00002e";
        this.appendChild(ripples);
        correctOption.appendChild(fade);

        chosenAns.push(this.innerText);
    }

    setTimeout(() => {
        this.removeAttribute("data-ans");               //So that the transition is removed and border is changed back instantly
        this.style.borderColor = "var(--bord-col)";
    }, 750);


    choices.forEach(btn => {                        //removing listeners so that other options cannot be selected
        btn.removeEventListener("click", ripple);
    });
//-----------------------------------------------------------------------------------------------------//

    setTimeout(function()
    {
        question = generator.next();
        if(!question.done)
        {
            loadQuestion(question.value);
//-----------------------------------------------------------------------------------------------------\\
            document.getElementById("curr-que").innerHTML = ++currentQuestion;
        } else
        {
            timer = false;      //Timer stops after the last question
            Result();
        }
//-----------------------------------------------------------------------------------------------------//
    }, 750);
}

//generator function to return value from array one at a time
function* arrayGenerator(array)
{
    for (let i=0; i< array.length; i++)
    {
        yield array[i];
    }
}

//shuffleing array
function shuffleArray(array)
{
    for( let i = array.length -1;i>0;i--)
    {
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//loading json file with name given as parameter
async function loadJson(URL)
{
    try
    {
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch(error)
    {
        console.error(error);
    }
}

//loading question and its options
function loadQuestion(values)
{
    //loading Answer set
    loadJson(`AnswerSets/${values.ansSet}.json`)
    .then(array => {
        //getting 3 random unique indices of wrong answers with the correct answer filtered
        let indices = index3Filter(array.length, values.answer, array);
        //creating array of 4 options(correct answer + 3 random elements of array), then have second element specifying weather they are correct answer or not
        ansArray = [[values.answer,'1'],[array[indices[0]],'0'],[array[indices[1]],'0'],[array[indices[2]],'0']];
        //shuffling position of options
        shuffleArray(ansArray);
//-----------------------------------------------------------------------------------------------------\\
        questionHead.innerText = values.question;
        questionHead.style.fontSize = "30px";
        for(let i = 0; i < 4; i++)
        {
            choices[i].innerText = ansArray[i][0];
            choices[i].setAttribute("data-ans", ansArray[i][1]);
            if(ansArray[i][1] == '1') correctOption = choices[i];
        }
//-----------------------------------------------------------------------------------------------------//
//-----------------------------------------------------------------------------------------------------\\        
        while(isOverflown(questionHead))           //reducing the font size by 2 until the question fits
        {
            let pasreFont = parseFloat(window.getComputedStyle(questionHead, null).getPropertyValue('font-size'));            
            questionHead.style.fontSize = (pasreFont - 2) + "px";
        }

        choices.forEach(btn => {
            btn.addEventListener("click", ripple);
        });
//-----------------------------------------------------------------------------------------------------//
    })
}

//loading array from URL parameter
loadJson(path)
.then(array => {

    //shuffle array
    shuffleArray(array);
//-----------------------------------------------------------------------------------------------------\\
    QuestionArray = array;          //Taking reference of all the questions
//-----------------------------------------------------------------------------------------------------//
    //creating generator from array
    generator = arrayGenerator(array);
    let question = generator.next();

    //if next question available load it
    if(!question.done)
    {
        loadQuestion(question.value);
    }
})

//-----------------------------------------------------------------------------------------------------\\
let minute = 0;
let second = -1;
let timer = true;
function stopWatch()
{
    if(timer)
    {
        second++;
 
        if (second == 60) 
        {
            minute++;
            second = 0;
        }
 
        let minString = minute;
        let secString = second;
 
        if (minute < 10) 
        {
            minString = "0" + minString;
        }
        if (second < 10) 
        {
            secString = "0" + secString;
        }
 
        document.getElementById('min').innerHTML = minString;
        document.getElementById('sec').innerHTML = secString;
        setTimeout(stopWatch, 1000);
    }
}
stopWatch();
//-----------------------------------------------------------------------------------------------------//

//-----------------------------------------------------------------------------------------------------\\
document.querySelector("#skip button").addEventListener("click", () => {

    setTimeout(() => {
        let question = generator.next();
        if(!question.done)
        {
            loadQuestion(question.value);
            document.getElementById("curr-que").innerHTML = ++currentQuestion;
        } else
        {
            timer = false;
            Result();
        }
    }, 100);

    chosenAns.push("Skip");

});
//-----------------------------------------------------------------------------------------------------//

function Result()
{
    let rslt = "";
    for(let i = 0; i < que; i++)
    {
        let dataC = "true";             //true for : Chosen answer is wrong/skipped, false for: Chosen answer is correct
        let dataS = "false";            //true for : Question is skipped, false for: Chosen answer is correct/wrong
        if(chosenAns[i] == QuestionArray[i].answer) dataC = "false";
        if(chosenAns[i] == "Skip") dataS = "true";

        rslt += `
            <article data-s=${dataS} data-c=${dataC}>
    
                <div id="que-block">
                    <span>${QuestionArray[i].question}</span>
                </div>
        `;
        if(chosenAns[i] != QuestionArray[i].answer) 
        {
            rslt += `
                <div class="block" id="chosen-block">
                    <span>${chosenAns[i]}</span>
                </div>
            `;
        }
        rslt += `
                <div class="block" id="correct-block">
                    <span>${QuestionArray[i].answer}</spna>
                </div>
    
            </article>
        `;
    }

    document.getElementById("result-space").innerHTML = rslt;
    document.getElementById("result-space").style.height = "calc(100vh - 195px)";
    if(window.innerHeight < 760 && (window.innerHeight > window.innerWidth)) document.getElementById("result-space").style.height = "calc(100vh - 185px)";

    document.getElementById("question-space").style.display = "none";

    document.getElementById("menu-again").style.visibility = "visible";
    document.getElementById("menu").style.position = "relative";        //absolute to relative so that it occupies height
    document.getElementById("again").style.position = "relative";       //abolute to relative so that it occupies height
}

document.getElementById("menu").addEventListener("click", () => {
    window.history.back();
});

document.getElementById("again").addEventListener("click", () => {
    location.reload();
});

document.querySelector("#info-space a").addEventListener("click", () => {
    window.history.back();
});



// Working of the Script
//----------------------
//(1) Background image is loaded, topic and total no. of questions are added
//(2) Question set array is loaded, shuffled and passed onto generator array which loads a question one at a time
//(3) Each question is loaded with generator.next();
//(4) loadQuestion() :  (a) 3 wrong answers are chosen
//                      (b) answer-array with 1 correct and 3 wrong answer is created
//                      (c) answer-array is then shuffled and displayed
//                      (d) font size of the question is reduced until it fits
//(5) The stopwatch keeps track of the time till the last question is attempted
//(6) When the user choses an option, the corresponding animation is displayed
//(7) Next question is diplayed
//(8) After the last question is attempted, the result is displayed
