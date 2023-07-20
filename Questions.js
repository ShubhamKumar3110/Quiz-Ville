//reading the URL
let param = new URLSearchParams(window.location.search);

//saving the value of parameter p from the URL
let q = param.get('p');

let currentScore = 0;

//check button click correct or wrong
function togglebutton(button){
    //if correct pressed add class for css
    // add +1 in score
    if (button.classList.contains('button_1')){
        button.classList.add('buttonCorrect');
        currentScore++;
        document.getElementById("current").innerHTML = currentScore;
        setTimeout(function(){
            //wait for 1 sec to show css
            button.classList.remove('buttonCorrect');},1000); 
    }else{//if wrong add class for css 
        button.classList.add('buttonWrong');
        setTimeout(function(){
            //wait for 1 sec to show css
            button.classList.remove('buttonWrong');},1000);
    }
    //after button is clicked show next question
    setTimeout(function(){
    question = generator.next();
        if(!question.done){
            loadQuestion(question.value);
        }
    },1000);
}

//generator function to return value from array one at a time
function* arrayGenerator(array){
    for (let i=0; i< array.length; i++){
        yield array[i];
    }
}

//shuffleing array
function shuffleArray(array){
    for( let i = array.length -1;i>0;i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

//loading json file with name given as parameter
async function loadJson(URL){
    try{
        const response = await fetch(URL);
        const data = await response.json();
        return data;
    } catch(error){
        console.error(error);
    }
}

//loading question and its options 
function loadQuestion(values){
    //loading Answer set
    loadJson(`AnswerSets/${values.ansSet}.json`) 
    .then(array => {
        //Shuffleing answer set
        shuffleArray(array);
        //removing correct answer from answer set
        finalArray = array.filter(element => element !== values.answer);
        //creating array of 4 options(correct answer + first 3 elements of array), then have second element specifying weather they are correct answer or not
        ansArray = [[values.answer,'button_1'],[finalArray[0],'button_0'],[finalArray[1],'button_0'],[finalArray[2],'button_0']];
        //shuffleing position of options
        shuffleArray(ansArray);

        //building question element and 4 buttons showing options from answer array
        //button have specifying that are worng or correct
        data = `
            <article>
                <h2>${values.question}</h2>
                <div class="options">
                    <button class=${ansArray[0][1]} onclick=togglebutton(this)>${ansArray[0][0]}</button>
                    <button class=${ansArray[1][1]} onclick=togglebutton(this)>${ansArray[1][0]}</button>
                    <button class=${ansArray[2][1]} onclick=togglebutton(this)>${ansArray[2][0]}</button>
                    <button class=${ansArray[3][1]} onclick=togglebutton(this)>${ansArray[3][0]}</button>
                </div>
            </article>
            `;
        //running the above lines as html code inside question_space section
        document.getElementById("question_space").innerHTML=data;

    })
    
}


//loading array from URL parameter
loadJson(`QuestionSets/${q}.json`)
.then(array => {
    //shuffle array
    shuffleArray(array);
    //creating generator from array
    generator = arrayGenerator(array);
    let question = generator.next();

    //if next question available load it
    if(!question.done){
        loadQuestion(question.value);
    }
})