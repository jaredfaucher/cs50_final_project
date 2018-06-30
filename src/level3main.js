// Level 3 Main Function

G.F.loadLevel3 = function () { 
    
    // assigns new AI function to G.B.level3.AI
    this.AI = G.F.mainAI;
    
    // tells GMP to capture input from four keybord keys
    G.KB.addKeys('LEFT', 'RIGHT', 'UP', 'DOWN');
    
    // stores custom game variables in G.S (global state object)
    // used to display current level in message and to load next level in exitAI function
    G.setState({level: 3}); 

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
     
    // adds enemy0 to viewport with switchAI
    G.makeGob('enemy0', G.O.viewport, 'IMG')
     .setVar({x:5, y:310, z:25, 
              w:38, h:44,
              tw: 76, th: 88,
              cw: 38, ch: 44,
              cx: 0, cy: 1, 
              AI:G.F.enemyAI,
              nextSrc:'img/enemy.png'})
     .setState({movingLeft: false, leftFrame: 0, rightFrame: 0})
     .turnOn();
     
    // adds switch to viewport with switchAI
    G.makeGob('switch0', G.O.viewport, 'IMG')
     .setVar({x:230, y:420,
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
     .setVar({x:365, y:139,
              w:130, h:16,
              tw: 130, th: 16,
              cw: 130, ch: 16,
              cx: 0, cy: 0,              
              AI:G.F.gateAI,
              nextSrc:'img/Hgreengate.png'})
     .setState({open: false, frame: 0})
     .turnOn();
     
    // adds exit to viewport with exitAI
    G.makeGob('exit', G.O.viewport, 'IMG')
     .setVar({x:410, y:55,
              w:40, h:40,
              tw: 40, th: 40,
              cw: 40, ch: 40,
              cx: 0, cy: 0,
              AI:G.F.exitAI,
              nextSrc:'img/ladder.png'})
     .turnOn(); 

    // adds walls to viewport with wallAI  
    G.makeGob('wall0', G.O.viewport, 'IMG')
     .setVar({x:350, y:5, 
              w:25, h:150,
              tw: 25, th: 150,
              cw: 25, ch: 150,
              cx: 0, cy: 0,
              AI:G.F.wallAI,
              nextSrc:'img/150Vwallnew.png'})
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
         
    // adds message display to viewport
    G.makeGob('message', G.O.viewport)
     .setVar({x:20, y:100, z:100, w:460, h:300});           
         
}; 


// all code executed in G.F.mainAI
G.F.mainAI = function () 
{
        // starts AI for the player
        G.O.player.AI();
        // starts AI for the menu
        G.O.menu.AI();
        // starts AI for enemy0
        G.O.enemy0.AI();
        // starts AI for wall0
        G.O.wall0.AI();
        // starts AI for switch0
        G.O.switch0.AI();        
        // starts AI for gate0
        G.O.gate0.AI();        
        // starts AI for exit ladder
        G.O.exit.AI();
};

// creates and loads level3 block which starts the level
$(document).ready(function() {
    G.makeBlock('level3', G.F.loadLevel3).loadBlock('level3');
});
