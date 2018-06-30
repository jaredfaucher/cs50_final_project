// Start Screen/Instructions

G.F.loadStart = function () { 
    
    // assigns new AI function to G.B.start
    this.AI = G.F.mainAI;
    
    // create menu within main G
    G.makeGob('menu', G)
     .setVar({x:50, y:70, w:500, h:80, AI:G.F.menuAI})
     .setSrc('<table>' +
                '<tr>' +
                   '<td>Lives left: ' + livesLeft + '</td>' +
                   '<td rowspan="3" id="title">Escape!</td>' +
                '</tr>' +
                '<tr>' +    
                    '<td>Timer: 00:00</td>' +
                '</tr>' +
                '<tr>' +
                    '<td>Current Level: 0/8</td>' +
                '</tr>' +
             '</table>')
     .turnOn();
     
    // create the viewport within main G
    G.makeGob('viewport', G)
     .setVar({x:50, y:150, w:500, h:500})
     .turnOn();

    // add message display to viewport
    G.makeGob('message', G.O.viewport)
     .setVar({x:20, y:100, z:100, w:460, h:300})
     .setSrc('</br><strong>Try to escape!</strong></br>' +
             '</br>Use the arrow keys to move your hero</br>' +
             '</br>Flip the switches to open the gates and activate bridges</br>' +
             '</br>Do not touch the enemies or fall into a hole or you will lose a life!</br>' +
             '</br>If you lose all three lives you lose the game!</br>' +
             '</br><strong>Click to start!</strong>')
     .turnOn();
     
}; 


// all code executed in G.F.mainAI
G.F.mainAI = function () 
{
    // load level1 file when message is clicked
    $("#message").click(function (event){
        $.ajax({
            type: "GET",
            url: "src/level1main.js",
            dataType: "script"
        });
    });
};

// This final code is what actually creates the start block using the loadStart function defined above
// The loadStart function creates all the objects and loads the mainAI function  
$(document).ready(function() {
    G.makeBlock('start', G.F.loadStart).loadBlock('start');
});
