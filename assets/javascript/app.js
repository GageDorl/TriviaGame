var timer = $('<div>').attr('id','timer');
var x;
var timedInt;
var questionNum=0;
var questions = [
    {
        "q":"Where did the tuxedo originate?",
        "a1":"Wales, England",
        "ca":"Westchester County, New York",
        "a2":"Paris, France",
        "a3":"Tokyo, Japan",
        "ff":"Pierre Lorillard IV comissioned a tailor to make a semiformal jacket without a tail to a ball at his country club, inventing the tuxedo"
    },
    {
        "q":"What is the most abuse drug in the world?",
        "ca":"Caffeine",
        "a1":"Alcohol",
        "a2":"Nicotine",
        "a3":"Opium",
        "ff":"Caffeine is found in: sodas, coffee, tea, cocoa, candy, and over the counter medicines"
    },
    {
        "q":"Where is the bagpipe originally from?",
        "a1":"Scotland",
        "a2":"England",
        "a3":"Italy",
        "ca":"Turkey",
        "ff":"The first bagpipe documented, which was made of reeds stuck into a goatskin bag, was made in the middle east several hundred years b.c.e."
    },
    {
        "q":"What does Atlas hold on his shoulders?",
        "a1":"The Earth",
        "ca":"The Sky",
        "a2":"The Clouds",
        "a3":"The Dirt",
        "ff":"The translated line states \"Upon his shoulders the great pillar that holds apart the earth and heaven, a load not easy to be borne\""
    }
]
var correct=0;
var wrong=0;
var outoftime=0;
$('#startGame').on('click', function(){
    $('body').append(timer);
    startQuestion();
    
    console.log('hi')
})
function resultOfQuestion(val){
    clearInterval(timedInt);
    if(val=='outOfTime'){
        $('#mainTitle').text('You took too long');
        $('#gameButtons').html(questions[questionNum].ff)
        outoftime++;
    }
    else if(val=='right'){
        $('#mainTitle').text('Correct');
        $('#gameButtons').html(questions[questionNum].ff)
        correct++;
    }
    else if(val=='wrong'){
        $('#mainTitle').text('Wrongo');
        $('#gameButtons').html(questions[questionNum].ff)
        wrong++;
    }
    if(questionNum<3){
    questionNum++;
    setTimeout(startQuestion, 5000);
    }
    else {
        setTimeout(function(){
        $('#mainTitle').text('That\'s it');
        $('#gameButtons').html('Correct answers: '+correct+'<br>Wrong answers: '+wrong+'<br>Unanswered questions: '+outoftime+'<br><button id=restart onclick=restartIt()>Click to go Again</button>')},5000)
    }
}
function startQuestion(){
    clearInterval(timedInt)
    x=30;
    timer.text(x);
    $('#gameButtons').html('');
    $('#mainTitle').text(questions[questionNum].q);
    for(property in questions[questionNum]){
        if(property=='ca'){
            var button = $('<button>').attr('id','ca');
            $('#gameButtons').append(button.text(questions[questionNum][property]));
        }
        else if(property!='ff'&&property!='q'){
            var button = $('<button>').attr('id','a');
            $('#gameButtons').append(button.text(questions[questionNum][property]));
        }
    }
    $('#a').on('click',function(){resultOfQuestion('wrong')});
    $('#ca').on('click',function(){resultOfQuestion('right')});
    timedInt = setInterval(function(){
        x--; 
        if(x>=0){
            console.log(x)
        timer.text(x)
        }
        else{
            resultOfQuestion('outOfTime');
        }
    },1000);
}
function restartIt(){
    questionNum=0;
    correct=0;
    wrong=0;
    outoftime=0;
    startQuestion();
}