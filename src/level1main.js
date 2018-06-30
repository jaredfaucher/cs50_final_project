// Level 1 Main function

G.F.loadLevel1 = function () { 
    
    // assigns new AI function to G.B.level1.AI
    this.AI = G.F.mainAI;
    
    // tells GMP to capture input from four keybord keys
    G.KB.addKeys('LEFT', 'RIGHT', 'UP', 'DOWN');
    
    // stores custom game variables in G.S (global state object)
    // used to display current level in message and to load next level in exitAI function
    G.setState({level: 1}); 

    // set gameInProgress to true to start timer
    gameInProgress = true;
    
    // create menu within main G
    G.makeGob('menu', G)
     .setVar({x:50, y:70, w:500, h:80, AI:G.F.menuAI})
     // displays livesLeft, the current timer, current level and also the game Title
     .setSrc('<table>'+
                '<tr>'+
                   '<td>Lives left: ' + livesLeft + '</td>' +
                   '<td rowspan="3" id="title">Escape!</td>'+
                '</tr>'+
                '<tr>'+    
                    '<td>Timer: ' + minutes + ':' + seconds + '</td>' +
                '</tr>'+
                '<tr>' +
                    '<td>Current Level: ' + G.S.level + '/8</td>' +
                '</tr>' +
             '</table>')
     .turnOn();
         
    // create viewport within main G 
    G.makeGob('viewport', G)
     .setVar({x:50, y:150, w:500, h:500})
     .turnOn();
    
    // adds background to viewport
    G.makeGob('background', G.O.viewport, 'IMG')
     .setVar({x:0, y:0, w:500, h:500, nextSrc: 'img/BG.png'})
     .turnOn();
    
    // adds player to viewport with playerAI
    G.makeGob('player', G.O.viewport, 'IMG')
     .setVar({x:50, y:50, z:50, 
              w:40, h:45, 
              tw:160, th: 90,
              cw: 40, ch: 45,
              cx: 0, cy: 0,
              AI:G.F.playerAI,
              nextSrc:'img/player.png'})
     .setState({leftFrame: 0, rightFrame:0, upFrame: 0, downFrame: 0})
     .turnOn(); 
     
    // adds switch to viewport with switchAI
    G.makeGob('switch0', G.O.viewport, 'IMG')
     .setVar({x:245, y:245, 
              w:20, h:20, 
              tw: 20, th: 20,
              cw: 20, ch: 20,
              cx: 0, cy: 0,
              AI:G.F.switchAI,
              nextSrc:'img/greenswitch.png'})
     .setState({flipped: false, id: 0})
     .turnOn();
     
    // adds gate to viewport with gateAI
    G.makeGob('gate0', G.O.viewport, 'IMG')
     .setVar({x:95, y:365, 
              w:16, h:130, 
              tw: 16, th: 130,
              cw: 16, ch: 130,
              cx: 0, cy: 0,              
              AI:G.F.gateAI,
              nextSrc:'img/Vgreengate.png'})
     .setState({open: false, frame: 0})
     .turnOn();
     
    // adds exit to viewport with exitAI
    G.makeGob('exit', G.O.viewport, 'IMG')
     .setVar({x:435, y:415,
              w:40, h:40,
              tw: 40, th: 40,
              cw: 40, ch: 40,
              cx: 0, cy: 0,
              AI:G.F.exitAI,
              nextSrc:'img/ladder.png'})
     .turnOn();
 
    // adds walls to viewport with wallAI     
    G.makeGob('wall0', G.O.viewport, 'IMG')
     .setVar({x:5, y:150, 
              w:400, h:25,     
              tw: 400, th: 25,
              cw: 400, ch: 25,
              cx: 0, cy: 0,
              AI:G.F.wallAI,
              nextSrc:'img/400Hwall.png'})
     .turnOn(); 
    G.makeGob('wall1', G.O.viewport, 'IMG')
     .setVar({x:95, y:350, w:400, h:15,
              tw: 400, th: 25,
              cw: 400, ch: 25,
              cx: 0, cy: 0,
              AI:G.F.wallAI,
              nextSrc:'img/400Hwall.png'})
     .turnOn();
    
    // adds borders to viewport
    G.makeGob('border1', G.O.viewport)
     .setVar({x:0, y:0, w:5, h:500})
     .addClass('wall')
     .turnOn();
    G.makeGob('border2', G.O.viewport)
     .setVar({x:495, y:0, w:5, h:500})
     .addClass('wall')
     .turnOn();    
    G.makeGob('border3', G.O.viewport)
     .setVar({x:0, y:0, w:500, h:5})
     .addClass('wall')
     .turnOn();
    G.makeGob('border4', G.O.viewport)
     .setVar({x:0, y:495, w:500, h:5})
     .addClass('wall')
     .turnOn();
         
    // add message display to viewport
    G.makeGob('message', G.O.viewport)
     .setVar({x:20, y:100, z:100, w:460, h:300});            
         
};

// all code executed in G.F.mainAI
G.F.mainAI = function () 
{
    // The following code continuously runs the AI for all of the objects
    // This library loops the code over and over again in the current block
    
    // starts the AI for the player
    G.O.player.AI();
    // starts the AI for switch0
    G.O.switch0.AI();
    // starts the AI for the menu
    G.O.menu.AI();
      
    // starts AI for the walls
    for (var i = 0; i < 2; i++)
    {
        G.O['wall' + i].AI();
    }
    // starts AI for gate0   
    G.O.gate0.AI();
    // starts AI for exit ladder
    G.O.exit.AI();
};

// This final code is what actually creates the level1 block using the loadLevel1 function defined above
// The loadLevel1 function creates all the objects and loads the mainAI function  
$(document).ready(function() {
    G.makeBlock('level1', G.F.loadLevel1).loadBlock('level1');
});
