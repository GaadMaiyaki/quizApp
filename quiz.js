//creating an array of questions
const qA =[
    {
        question: "what is your name",
        option: ["peter", "maiyaki", "let", "peter"],
        answer: "peter",
        status: true
    },
    {
        question: "what is your age",
        option: [12, 4, 27, 42],
        answer: 27,
        status: true
    },
    {
        question: "what is your state of origin",
        option: ["lagos", "kogi", "lokoja", "ghana"],
        answer: "lagos" ,
        status: true
    }
]
let doneArr=[];

let score=0, inc=0, start=0, endTime;
const form = document.forms['option'];

$('#btn').slideUp();
$('#qNum').slideUp();
$("#sec1Q").hide();
$("#sec2Q").hide();

let  ignitCount;
$(".table").addClass('wow fadeInLeft');

$("#submitbtn").click(function(){
    $('#btn').slideDown();
    $('#qNum').slideDown();
    $("#sec1Q").show();
    $("#sec2Q").show();
    $("#submitbtn").slideUp();
    $(".table").removeClass('wow fadeInLeft');
    letItCount();
});

$("#timeStart").html(`TIME START 00:0${start}`);
$('#timeUp').html(`TIME UP 00:30`);
$("#score").html(`Points: ${score}`);

submit=false;
clickNext=false;

letItCount=()=>{
    ignitCount = setInterval(beginCount, 1000);
}
beginCount=()=>{
    endTime=30;
    if(clickNext===true){
        endTime=30; start=0;
    }
    clickNext=false;
    start<9?$('#timeStart').html(`TIME START 00:0${start=start+1}`):$('#timeStart').html(`TIME START 00:${start=start+1}`)
    endTime<10?$('#timeUp').html(`TIME UP 00:0${Number(endTime=endTime-start)}`):$('#timeUp').html(`TIME UP 00:${Number(endTime=endTime-start)}`)
    if(start==30){
        inc++;
        incrNum();
        start=0, endTime=30;
        end();
    }
    if(submit===true){
        clearInterval(ignitCount);
        start=0;
    };
}

incrNum =()=>{
    if(inc>qA.length-1) return;
    $('#qNum').html(`<div class="wow bounceIn">Question ${(inc+1)}</div>`);
}
incrNum();

bank=()=>{
    let choose = ["A","B","C","D"];
    let ans="";
    for(let i=0; i<=qA.length; i++){
        $('#question').html(`<div class="wow bounceIn">${qA[inc].question}</div>`);
            ans+=
            `
                <tr class="wow fadeInLeft border-0">
                    <td class="border-0"></td>
                    <td class="m-2 p-2 text-right w-50 border-0"><input type=radio name="options" value="${qA[inc].option[i]}"/> ${choose[i]}</td>
                    <td class="m-2 p-2 text-left w-50 border-0">
                        ${(qA[inc].option[i])}
                    </td>
                    <td class="border-0"></td>
                </tr>
            `;
    }
    $('table').html(ans);
}
bank();

let op =form.options;

correctAnswer=()=>{
    (op.value==qA[inc].answer)?$("#score").html(`Points: ${score+=5}`):$("#score").html(`Points: ${score}`);
}

let end=()=>{
    inc==(qA.length-1)?$('#next').html('Submit'):$('#next').html('Next');
    inc>(qA.length-1)?$('#btn').hide():$('#btn').show();
    
    if(inc>(qA.length-1)){
        clickNext=false;
        clearInterval(ignitCount);
        $("#timeStart").html(`TIME START 00:00`);
        $('#timeUp').html(`TIME UP 00:00`);
        $('#btn').slideUp();
        $("#submitbtn").slideDown();
        $("#submitbtn").html("RESTART QUIZ");
        
        submit=true;
        $("#sec1Q").hide();
        let judgeCo = $("table");
        judgeCo.addClass('wow fadeInLeft');
        let judge = 
        score<=0?`You Scored: ${score}! very poor! o poor ju!.`:score==5?
        `You Scored: ${score}! oti gbiyanju.`:(score==10?`You Scored: ${score}! Oti try jare.`
        :`You Scored: ${score}! That's Excellent buddy!`)
        judgeCo.html(`
        <div class="wow pulse p-5 w-100 text-info text-center font-weight-bold" data-wow-iteration="infinite" 
        data-wow-duration="800ms" style="font-size:25px;">
            ${judge}
        </div`);

        score=0;
        endTime=30, start=0;
        $("#submitbtn").click(function(){
            submit=false;
            $("#score").html(`Points: 0`);
            inc=0;
            $('#qNum').html("Question "+(inc+1));
            $("#submitbtn").slideUp();
            bank();
        });
    };
    bank();
}


check = false;
next=()=>{

    if(!op.value){
        $("#next").addClass('disabled');
        return;
    }
    else{
        $("#next").removeClass('disabled');
        clickNext=true;
    }
    
    console.log(qA)
    console.log(inc);
    if(clickNext===true&&op.value&&op.value===qA[inc].answer){
        check=true;
        qA[inc].status=false;
    }
    
    correctAnswer();
    inc++;
    incrNum();
    end();
}
back=()=>{
    endTime=30, start=0;
    if(check===true){
        for(i in qA){
            if(i===inc){break;}
            if(qA[i].status===false) return;
        }
    }
    else{
        bank();
    }
    if(inc>0){
        inc--;
        incrNum();
        bank();
        end();
    }
   
}

