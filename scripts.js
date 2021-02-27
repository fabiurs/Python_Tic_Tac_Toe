var board = document.getElementById("brd");
var computerScore = document.getElementById("computerScore");
var playerScore = document.getElementById("playerScore");
var computerScoreValue = 0;
var playerScoreValue = 0;
var turn = 'X';
var gameOver = 0;
var mesaj = document.getElementById("mesaj");
var nrMutari = 0;
var semne = new Array(9).fill('a');
var playText = document.getElementById("playText");
var castigator = "a";
var egalitate = 0;
var patrate = document.getElementsByClassName("patrat");
var filled = new Array(9).fill(0);

function loadData(){
    if(localStorage.computerScoreValue){
        computerScoreValue = Number(localStorage.getItem("computerScoreValue")); 
    }
    else{
        localStorage.computerScoreValue = 0; 
    }
    if(localStorage.playerScoreValue){
        playerScoreValue = Number(localStorage.getItem("playerScoreValue"));
    }
    else{
        localStorage.playerScoreValue = 0; 
    }
    playerScore.innerHTML = playerScoreValue;
    computerScore.innerHTML = computerScoreValue;
    resetGame();
}

function resetGame(){
    playGame();
}

function playGame(){
    for( var i = 0; i< patrate.length; i++){
        patrate[i].children[0].innerHTML = "";
        patrate[i].classList.remove("filled");
    }
    board.classList.remove("winner");
    board.classList.remove("looser");
    gameOver = 0;
    egalitate = 0;
    nrMutari = 0;
    semne.fill('a');
    filled.fill(0);
    mesaj.innerHTML = "";
    mesaj.classList.remove("mesaj-black");
    playerScore.innerHTML = playerScoreValue;
    computerScore.innerHTML = computerScoreValue;
    playText.innerHTML = "Play";
}

function addCharacter(nr){
    if(!gameOver){
        if(filled[nr] == 0){
            patrate[nr].children[0].innerHTML = turn;
            semne[nr] = turn;
            filled[nr] = 1;
            patrate[nr].classList.add("filled");
            nrMutari += 1;
            verificaVictorie();
            if(gameOver){
                if(egalitate == 0 )
                {
                    board.classList.add("winner");
                    castigator = "X";
                    mesaj.classList.add("mesaj-black");
                    mesaj.innerHTML = castigator + " este castigator!";
                    playerScoreValue++;
                    playerScore.innerHTML = playerScoreValue;
                    playText.innerHTML = "Play Again";
                    localStorage.playerScoreValue = Number(localStorage.playerScoreValue) + 1;
                }
            }
            else if(egalitate == 1)
            {
                console.log("egalitate");
                mesaj.classList.add("mesaj-black");
                mesaj.innerHTML = "Egalitate!";
            }
            else{
                schimbaTurn();
                alegeComputer();
                setTimeout(() => {
                    verificaVictorie();
                    if(gameOver == 1){
                        if(egalitate == 0)
                        {   
                            board.classList.add("looser");
                            castigator = "O";
                            mesaj.classList.add("mesaj-black");
                            mesaj.innerHTML = castigator + " este castigator!"; 
                            computerScoreValue++;
                            computerScore.innerHTML = computerScoreValue;
                            playText.innerHTML = "Play Again";
                            localStorage.computerScoreValue = Number(localStorage.computerScoreValue) + 1;
                        }   
                    }
                }, 1001);
            }
            if(egalitate == 1)
            {
                mesaj.classList.add("mesaj-black");
                mesaj.innerHTML = "Egalitate!";
            }
        }
        else{
            mesaj.classList.add("mesaj-red");
            mesaj.innerHTML = "Alege alt loc!";
            setTimeout(() => {
                mesaj.innerHTML = "";
            }, 3000);
            mesaj.classList.remove("mesaj-red");
        }
    }
}

function verificaVictorie(){
    //verific liniile
    if(
        (semne[0] === semne[1] && semne[1] === semne[2] && semne[1] != 'a') ||
        (semne[3] === semne[4] && semne[4] === semne[5] && semne[3] != 'a') ||
        (semne[6] === semne[7] && semne[7] === semne[8] && semne[6] != 'a')
    ){
        gameOver = 1;
    }
    //verific coloanele
    else if(
        (semne[0] === semne[3] && semne[3] === semne[6] && semne[0] != 'a') ||
        (semne[1] === semne[4] && semne[4] === semne[7] && semne[1] != 'a') ||
        (semne[2] === semne[5] && semne[5] === semne[8] && semne[2] != 'a')
    ){
        gameOver = 1;
    }
    //verific diagonalele
    else if(
        (semne[0] === semne[4] && semne[4] === semne[8] && semne[0] != 'a') ||
        (semne[2] === semne[4] && semne[4] === semne[6] && semne[2] != 'a')
    ){
        gameOver = 1;
    }
    else if(nrMutari == 9)
    {
        gameOver = 1;
        egalitate = 1;
    }
}

function alegeComputer(){
    var ok = 0;
    setTimeout(() => {
        do{
            var computer = Math.floor(Math.random() * 10);
            console.log(computer);
            if(filled[computer] == 0){
                patrate[computer].children[0].innerHTML = turn;
                semne[computer] = turn;
                schimbaTurn();
                filled[computer] = 1;
                patrate[computer].classList.add("filled");
                ok = 1;
                nrMutari += 1;
            }
        }while(ok == 0);
    }, 1000);
}

function schimbaTurn(){
    if(turn === 'X')
        turn = 'O';
    else
        turn = 'X';    
}
