// Globals & Timer

// livesLeft is for use in all level files thus global
// gameInProgress used as a trigger to start/stop timer at the beginning/end of the game
// seconds, minutes and counter for the in-game timer which does not reset between levels

var livesLeft = 3, gameInProgress = false;

var seconds = 0, minutes = 0, counter = 0;

// functions adopted from stackoverflow.com, changed to fit my program
// pad returns val with a 0 in front of it if less than 9 (1 minute and 1 second = 01:01)
function pad (val) { return val > 9 ? val : "0" + val; };

// use setInterval to increment counter every second if livesLeft > 0 and a game is in progress

setInterval( function(){
    if (livesLeft > 0 && gameInProgress == true)
    {
        // seconds is counter mod 60, 
        seconds = pad(++counter % 60);
        // minutes is counter / 60 shortened with parseInt
        minutes = pad(parseInt(counter / 60, 10));
    }
// else counter does not increment and time stopped (game is over)    
    else
    {
        seconds = pad(counter % 60);
        minutes = pad(parseInt(counter / 60, 10));
    }
}, 1000);
