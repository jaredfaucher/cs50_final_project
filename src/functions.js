/* These are all the AI functions used in Escape's
    8 levels.  Most functions are used in every level but
    G.F.enemyAI, G.F.bridgeAI, G.F.bridgeSwitchAI, G.F.holeAI
    are used as new objects are introduced to the game in
    later levels.
*/

// Menu AI
/*  This is the AI for the menu.  This continuously displays the updated lives 
    left, the time elapsed in the current game, the current level and displays
    the title of the game.
*/
G.F.menuAI = function () 
{
    // declaring object as variable for easier access
    var t = this;
    
    // if menu is on
    if (t.on)
    {
        // updates the menu with the current livesLeft, timer, level and title
        t.setSrc('<table>'+
                    '<tr>'+
                        '<td>Lives left: ' + livesLeft + '</td>' +
                        '<td rowspan="3" id="title">Escape!</td>' +
                    '</tr>' +
                    '<tr>' +    
                        '<td>Timer: ' + minutes + ':' + seconds + '</td>' +
                    '</tr>'+
                    '<tr>' +
                        '<td>Current Level: ' + G.S.level + '/8</td>' +
                    '</tr>' +
                '</table>')
         .draw();
    }
    
    // return object by convention
    return t;
};

// Player AI
/*  This is the AI for the player.  This function listens to see if
    a directional key has been pressed and moves the player if a key
    is being pressed.
*/
G.F.playerAI = function () 
{    
    // declaring object as variable for easier access
    var t = this; 

    // move the player left if LEFT is pressed
    if (G.KB.keys.LEFT.isPressed) 
    {
        // only move player left if it is at least 10px from left edge
        if (t.x > 10)  
        {
            // if player is on screen move player left px
            t.setVar({x: t.x - 5});
            
            // this chunk of code animates the players walking
            // changes the img of the sprite every 2 frames
            if (t.S.leftFrame % 4 < 2)
            {             
                t.setState({leftFrame: t.S.leftFrame + 1})
                 .setVar({cx: 2, cy: 0});
            }
            else
            {
                t.setState({leftFrame: + t.S.leftFrame + 1})
                 .setVar({cx: 3, cy: 0});
            }
            // redraw the player in new position
            t.draw();
        }
    }

    // move the player right if RIGHT is pressed
    if (G.KB.keys.RIGHT.isPressed) 
    {
        // only move player right if it is at least 10px from right edge
        if (t.x + t.w < 490)  
        {
            // if player is on screen move player right 5 px
            t.setVar({x: t.x + 5});
            // this chunk of code animates the players walking
            // changes the img of the sprite every 2 frames
            if (t.S.rightFrame % 4 < 2)
            {             
                t.setState({rightFrame: t.S.rightFrame + 1})
                 .setVar({cx: 2, cy: 1});
            }
            else
            {
                t.setState({rightFrame: t.S.rightFrame + 1})
                 .setVar({cx: 3, cy: 1});
            }
            // redraw player in new position
            t.draw();
        }
    }
    
    // move the player up if UP is pressed   
    if (G.KB.keys.UP.isPressed) 
    {
        // only move player up if it is at least 10px from top edge
        if (t.y > 10)  
        {
            // if player is on screen move player up 5 px
            t.setVar({y: t.y - 5});
            // this chunk of code animates the players walking
            // changes the img of the sprite every 2 frames
            if (t.S.upFrame % 4 < 2)
            {             
                t.setState({upFrame: t.S.upFrame + 1})
                 .setVar({cx: 1, cy: 0});
            }
            else
            {
                t.setState({upFrame: t.S.upFrame + 1})
                 .setVar({cx: 1, cy: 1});
            }
            // redraw player in new position
            t.draw();
        }
    }
    
    // move the player down if DOWN is pressed
    if (G.KB.keys.DOWN.isPressed) 
    {
        // only move player down if it is at least 10px from bottom edge
        if (t.y + t.h < 490 )  
        {
            // if player is on screen move player down 5px
            t.setVar({y: t.y + 5});
            // this chunk of code animates the players walking
            // changes the img of the sprite every 2 frames    
            if (t.S.downFrame % 4 < 2)
            {             
                t.setState({downFrame: t.S.downFrame + 1})
                 .setVar({cx: 0, cy: 0});
            }
            else
            {
                t.setState({downFrame: t.S.downFrame + 1})
                 .setVar({cx: 0, cy: 1});
            }
            // redraw player in new position
            t.draw();
        }        
    }    
    
    // return parent object so that it can be chained to another function
    // standard convention
    return t;
};

// Switch AI
/*  This is the AI for the switches.  If the switch has been flipped
    in the main level function, then the switch set's it's corresponding
    gate's 'open' state to true.  This is used in conjunction with the 
    gateAI to start the animation for the gates when the switch has been pressed.
*/
G.F.switchAI = function () 
{
    // declaring objects as variables for easier access
    var t = this, id = t.S.id, gate = G.O['gate' + id];
    // checks if player moves over switch    
    if (G.O.player.checkIntersection(t))
    {
        // sets switch0's 'flipped' state to 1 and changes color
        // changing the 'flipped' state triggers gate to open
        t.setState({flipped: 1})
         .setVar({nextSrc: 'img/switchoff.png'})
         .draw();
    }
    
    
    // if the switches 'flipped' state is true
    if (t.S.flipped)
    {
        // set the correspoding gate's 'open' state to true
        gate.setState({open: true});
    }
    // return object by convention
    return t;
};
// Gate AI
/*  This is the AI for the gates.  This checks to see if the gate's state
    'open' is true and starts the opening animation if that is the case.
    Otherwise the gate does not allow the player to move through it, acting
    as a wall.
*/
G.F.gateAI= function () 
{
    // declaring objects as variables for easier access.    
    var t = this, player = G.O.player;
    // if the gate has been opened by switch
    if (t.S.open)
    {        
        // if gate is not on last animation frame
        // and if the gate is vertical (t.h > t.w)
        if (t.S.frame < 10 && t.h > t.w)
        {
            // shorten gate 12px and redraw
            t.setVar({h: t.h - 12}).draw();
            // increment animation frame
            t.S.frame++;
        }
        // if gate is not on last animation frame
        // and if the gate is horizontal
        else if(t.S.frame < 10 && t.w > t.h)
        {
            // shorten gate 12px and redraw
            t.setVar({w: t.w - 12}).draw();
            // increment animation frame
            t.S.frame++;
        }        
    }
    // if gate has not been opened by switch
    else
    {
        // if gate and player have collided
        if (t.checkCollision(player))  
        {
            // if player is above the gate
            if (player.y + player.h <= t.y)
            {
                // gate acts as a wall by redrawing the player outside
                // this prevents the player from moving past the gate
                player.setVar({y:player.y-5}).draw();
            }
            // if player is to the right of the gate
            else if (player.x >= t.x + t.w)
            {
                // gate acts as a wall
                player.setVar({x:player.x+5}).draw();
            }                
            // if player is to the left of the gate
            else if (player.x + player.w <= t.x)
            {
                // gate acts as a wall
                player.setVar({x:player.x-5}).draw();
            }
            // if player is below the gate
            else if (player.y >= t.y + t.h)
            {
                // gate acts as a wall
                player.setVar({y:player.y+5}).draw();
            }
        }    
    }
    // return object by convention
    return t;
};

// Wall AI
/*  This is the AI for the walls.  This caused the player to interact with
    the walls as if they were solid, not allowing the player to pass through
    them.
*/
G.F.wallAI = function () 
{
    // delcaring objects as variables for easier access
    var t = this, player = G.O.player;            
            
    // if player and wall have collided
    if (player.checkIntersection(t))  
    {
        // if player is above the wall
        if (player.y + player.h <= t.y)
        {
            // wall acts as a solid object by redrawing the player outside
            // this prevents the player from moving through the wall
            player.setVar({y:player.y - 5})
                  .draw();
        }
        // if player is to the right of the wall
        if (player.x >= t.x + t.w)
        {
            // wall acts as a solid object by redrawing the player outside
            // this prevents the player from moving through the wall            
            player.setVar({x:player.x + 5})
                  .draw();
        }                
        // if player is to the left of the wall
        if (player.x + player.w <= t.x)
        {
            // wall acts as a solid object by redrawing the player outside
            // this prevents the player from moving through the wall            
            player.setVar({x:player.x - 5})
                  .draw();
        }
        // if player is below the wall
        if (player.y >= t.y + t.h)
        {
            // wall acts as a solid object by redrawing the player outside
            // this prevents the player from moving through the wall            
            player.setVar({y:player.y + 5})
                  .draw();
        }
    }
    // return object by convention
    return t;
};

// Exit AI
/*  This is the AI for the exit portal.  This loads the next level when the
    player moves over the portal if the final level has not been reached.
    If the player has reached the last level of the game then the function
    displays a congratulations message and gives the user the time it took them
    to complete the game.  This allows people to replay the game and try to beat
    their previous score.
*/
G.F.exitAI = function () 
{
    // declaring objects as variables for easier access
    // 'level' taken from the global state declared at the beginning of each level
    var t = this, player = G.O.player, level= G.S.level;
    
    // if the player moves over the exit portal
    if (player.checkIntersection(t))
    {
        // increment level
        level++
        // set gameInProgress to false to stop timer
        gameInProgress = false;
        
        // if the final level has not been reached
        if (level <= 8)
        {
            // display congratulation message in message display
            G.O.message
             .setSrc('</br></br></br>You won! </br></br></br>Click here to proceed to the next level')
             .turnOn();
            
            // if message display is clicked, loads the next level file
            $("#message").click(function (event){
                $.ajax({
                    type: "GET",
                    url: "src/level" + level + "main.js",
                    dataType: "script"
                });
            });
        }
        // if final level has been reached
        else
        {            
            // display message with the time it took the use and how many lives are left
            G.O.message
             .setSrc('</br></br></br>You won the game!' +
                     '</br></br></br>Your time was ' + minutes + ':' + seconds + ' with ' + livesLeft + ' lives left!' +
                     '</br></br></br>Click here to try again')
             .turnOn();           
            
            // if display message is clicked, load the start file to replay the game
            $("#message").click(function (event){
                $.ajax({
                    type: "GET",
                    url: "src/start.js",
                    dataType: "script"
                });
                counter = 0;
                livesLeft = 3;
            });
        }
    }
    
    // return object by convention
    return t;
};

// Enemy AI
/*  This is the AI for the enemies.  It is used to move the enemies back and forth
    horizontally across the viewport.  It also checks to see if a player comes in contact
    with an enemy and reduces livesLeft and restarts player in the original position.
    If the livesLeft == 0 then the function displays a message in the message display
    allowing the user to try again.
*/
G.F.enemyAI = function () 
{
    // declaring objects as variables for easier access
    var t = this, player = G.O.player;
    
    // if enemy is on (always true when enemies are turned on at begining of level function)
    if (t.on)
    {
        // if enemy's 'movingLeft' state is true
        if (t.S.movingLeft)
        {            
            // if enemy is on screen move left 10px
            t.setVar({x: t.x - 10});
            // this chunk of code animates the enemy walking
            // changes the img of the sprite every 2 frames
            if (t.S.leftFrame % 4 < 2)
            {             
                t.setState({leftFrame: t.S.leftFrame + 1})
                 .setVar({cx: 0, cy: 0});
            }
            else
            {
                t.setState({leftFrame: + t.S.leftFrame + 1})
                 .setVar({cx: 1, cy: 0});
            }
            // redraw enemy in new position
            t.draw();            
        }
        // if enemy's 'movingLeft' state is false
        else
        {            
            // if enemy is on screen move player right 10px
            t.setVar({x: t.x + 10});
            // this chunk of code animates the enemy walking
            // changes the img of the sprite every 2 frames            
            if (t.S.rightFrame % 4 < 2)
            {             
                t.setState({rightFrame: t.S.rightFrame + 1})
                 .setVar({cx: 0, cy: 1});
            }
            else
            {
                t.setState({rightFrame: t.S.rightFrame + 1})
                 .setVar({cx: 1, cy: 1});
            }
            // redraw enemy in new position
            t.draw();            
        }
        // if enemy reachs right wall
        if (t.x + t.w >= 490)
        {
            // change enemy's 'movingLeft' state to true
            t.S.movingLeft = true;
        }
        // if enemy reaches left wall
        else if (t.x <= 10)
        {
            // change enemy's 'movingLeft' state to false
            t.S.movingLeft = false;
        }
    }
    
    // checks if player and enemy collided 
    if (player.checkCollision(t))
    {
        // move player to starting location but does not draw
        player.setVar({x:50, y:50});
        // decrements livesLeft
        --livesLeft;
        
        // if there are not lives left
        if(livesLeft == 0)
        {
            // set gameInProgress to false in order to stop the timer
            gameInProgress = false;
            
            // display message in message display
            G.O.message
               .setSrc('You have run out of lives!</br>' +
                       '</br>Click to try again!')
               .turnOn();
            
            // if the user clicks the message display the game will be reloaded   
            $("#message").click(function (event){
                $.ajax({
                    type: "GET",
                    url: "src/start.js",
                    dataType: "script"
                });
                // resets counter for timer and livesLeft
                counter = 0;
                livesLeft = 3;
            });
        }
        // if there are lives left, redraw player in new position
        else
        {
            player.draw();
        }
    }
    
    // return object by convention
    return t;
};

// Hole AI
/*  This is the AI for the holes.  This checks to see if a player has
    accidentally walked into a hole.  If the player falls into a hole
    then they lose a life and are restarted back to their original position.
    Similarly to the enemyAI function, if the player has no lives left
    then the function displays a message in the message display allowing
    the user to try again.
*/

G.F.holeAI = function () 
{
    // declaring objects as variable for easier access
    var t = this, player = G.O.player;
    // if player is not on a bridge and is touching the  
    if (!(player.S.onBridge0 || player.S.onBridge1 || player.S.onBridge2)
         && player.checkIntersection(t))
    {
        // if hole is horizontal
        if (t.S.horizontal)
        {
            // if the bottom 1/3 of the player is over the edge
            if (player.y + (2/3)*player.h >= t.y && player.y + (2/3)*player.h <= t.y + t.h)
            {
                // player is falling
                player.S.falling = true;
            }
            else
            {
                player.S.falling = false;
            }
        }
        // if hole is vertical
        else
        {
            // if more than half of the player is over the edge
            if (player.x + player.w/2 >= t.x && player.x + player.w/2 <= t.x + t.w)
            {
                // player is falling
                player.S.falling = true;
            }
            else
            {
                player.S.falling = false;
            }
        }
        // if player is falling
        if (player.S.falling)
        {
            // moves player to starting position but does not redraw
            player.setVar({x: 50, y: 50});
            // decrements livesLeft
            --livesLeft;
            // if no lives are left
            if(livesLeft == 0)
            {
                // change gameInProgress to false to stop timer
                gameInProgress = false;
            
                // display message in message display
                G.O.message
                   .setSrc('You have run out of lives!</br>' +
                           '</br>Click to try again!')
                   .turnOn();
           
                // if message display is clicked, restart game
                $("#message").click(function (event){
                    $.ajax({
                        type: "GET",
                        url: "src/start.js",
                        dataType: "script"
                    });
                    // restart counter for timer and livesLeft
                    counter = 0;
                    livesLeft = 3;
                });
            }
            // if player has lives left
            else
            {
                player.draw();
            }
        }
    }
    // else player is not falling
    else
    {
        player.S.falling = false;
    }
    // return object by convention
    return t;
};

// Bridge Switch AI
/*  This is the AI for the bridge switch, used to make it's respective
    bridge (bridge with the same id) appear when moved over.    
*/
G.F.bridgeSwitchAI = function () {
    
    // declaring objects as variables for easier access
    var t = this;  // 'this' is the bridgeSwitch
    var player = G.O.player;  // play is the player object
    var i = t.S.id; // i is the id associated with the bridgeSwitch
    var bridge = G.O['bridge' + i]; // bridge is the bridge corresponding to bridgeSwitch
    
    // checks if bridgeSwitch has been pressed by the player
    if (t.checkIntersection(player))
    {
        // turns on the bridge which makes it appear
        bridge.turnOn();
    }
    // return object by convention
    return t;

};

// Bridge AI
/*  This is the AI for the bridge.  If the player is touching
    the bridge and is in between the edges of the bridge
    (to prevent having 1px on the bridge as counting),
    then the player's corresponding onBridge state is 
    set to true.  This makes it so that the player does
    not fall into a hole while on the bridge.
*/
G.F.bridgeAI = function ()
{
    var t = this, id = t.S.id, player = G.O.player;
    // if player is touching bridge
    if (player.checkIntersection(t))
    {
        // if bridge is horizontal
        if (t.S.horizontal)
        {
            // if players feet are between edges of bridge
            if (player.y + player.h / 2 >= t.y && player.y + player.h <= t.y + t.h)
            {
                // player is on bridge
                player.S['onBridge' + id] = true;
            }
            else
            {
                // player is not on the bridge
                player.S['onBridge' + id] = false;
            }
        }
        // if bridge is vertical
        else
        {
            // if player is between edges of bridge (+/- 10 pixels on each side)
            if (player.x + 10 >= t.x && player.x + player.w - 10 <= t.x + t.w)
            {
                // player is on bridge
                player.S['onBridge' + id] = true;
            }
            else
            {
                // player is not on bridge
                player.S['onBridge' + id] = false;
            }
        }
    }
    // if player is not touching any bridge
    else
    {
        // player is not on bridge
        player.S['onBridge' + id] = false;
    }
    /* All AI functions in GMP must be returned at the end of function to be chained with
       other functions. It is a convention in this libary.
    */
    return t;
};
