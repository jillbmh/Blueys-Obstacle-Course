# Intro

Blueys Obstacle course is a game of Frogger based on the children's tv show ‘Bluey’.  Bluey is my daughter's favourite TV show. There are different characters that Bluey must get past to get to the garden. This was my first project and first time building a game.

The link to access:

https://jillbmh.github.io/Blueys-Obstacle-Course/

# Overview of task

I had a week to build a game based on Frogger, using HTML, CSS and JavaScript. The game had the following MVP targets:

1. The game should be playable for one player.

2. The obstacles should be auto generated.

# Getting started

*Day 1* - I planned the wire frame on figma and the pseudocode on Trello. I was able to use Trello to move around the order of each task quite easily which helped me as I planned the game. I wanted to make sure that I gave myself lots of time to write the JavaScript so planned to just use colours for the backgrounds to get me started.

!['README'](../Blueys-Obstacle-Course/images/Project%201%20wireframe.png)

*Day 2*- Created the HTML, basic CSS and an empty grid.

*Day 3*- Made a start game function.

Added a click event to my button, couldn't see the button for ages, after trying different position solutions (relative and absolute) I moved it from behind the grid and decided to come back to that later.

Added some sound and ‘Bluey' to the start function. I couldn’t see Bluey for ages but the cell was identified as the class name changed, I debugged that.

Added obstacle 1, ‘Bingo’ broke the whole lot, removed her and did it step by step, it was a scope issue, I was able to re add bingo. Added a forEach loop to add Bingo to each cell I wanted. At the moment I am naming the index of each cell so I hope to review that part of the code later to make it neater. Then added obst2, obst3, the winning cells and safety cells. I added these one by 1, I need to look at using 1 function to call them all.

Now onto moving Bluey, I added the key down function with my if statements. .

Added a classList target to remove cells.

Added conditions to stop Bluey moving off the board. This was tricky but after some research I managed to do it.

Then added query selectors for the lives and the points, then started to look at how I would update the lives and kept on reviewing and fixing bugs.

*Day 4*- I spent quite a while trying to get my timer working, I finally realised I set it to update the UI every 30 seconds so that's why i didn't see a change! 

I added the update points function, remove life, times up, losing, resetting the game and winning. It took me a while to get the clock to restart when the game started.

I wrote a function to be called when the player wins but it doesn't work so needs debugging. Tomorrow I need to make winning work and then make my obstacles move- that should meet my MPV minus the following bugs/ minor things:


* add new game timer "new game starts in 4, 3, 2, 1"
* update sounds and images
* stop the timer restarting '0, 29, 28, 27'
* stop getting points if you go down and back up
* make sure 'lives remaining' text does not disappear when lives update
* make play button so it resets the game if pressed (STRETCH)
* disable keys until game restarts
* make it so that the timer is the same background image/ colour as the div its in
* remove cell numbers
* make it so that I don't have to declare each cell index in my array.



*Day 5*- A day of bug fixing, I couldn't get collision to work so I got that working, the next function was starting so fast that you couldn't see the effects of the collision. I added an interval to delay the game restarting so you can see when there is a time up or collision.

I fixed my points but so it refreshed on a new game

Fixed my win function
‌
Neatened up my code

I added an end game function to remove all cells, I had tried to add it to the lose function but then realised I needed an end game after the win function executed too.

I spent a while trying to fix the collision function - my class isn't removing.

* when you win the game continues
* MAKE OBST MOVE
* collision function
* too many lives
* add new game starts in 4, 3, 2, 1
* update sounds and images
* stop the timer restarting at 0
* stop getting points if you go down and back up
* make sure 'lives remaining text does not disappear
* make play button so it resets the game if pressed
* disable keys until game restarts
* make it so that the timer is the same background as the div its in
* remove cell numbers
* make it so that I don't have to declare each cell index in my array.

*Day 6* - So I started today still unable to figure out why my collision function wasn't working as expected. I had become blind to it so asked for some help. I was calling the collision function in another function that then added Bluey again after; I hadn't spotted that, so needed to end that function by adding a return keyword.


Moved onto the next bug, my collision continued executing after lives went below 0. I tried different ways of writing it, but it wasn't working as expected. I left it for a bit and came back to it- I had put the closing parenthesis in the wrong place! 


Fixed my lives, the game was giving life 0 as a life,  rather than losing at 0. I added remove life to the lose function , I also neatened up the code so that the timer and points show at 0 when you have lost.


I then started to look at adding more obstacles and spent a while trying to get the obstacles to move in the opposite direction whilst wrapping on the same row. This was more difficult than I expected but I got there!

*Day 7* - I finished adding the remaining obstacles and did some work on the styling including adding more sounds. I had a lot of bugs, nearly all timing related, where I had lost track of what function was being called in what order.

*Submission Day*- It turned out I had been working in life server doing all my styling at 63% so I needed to make last minute changes to the CSS. I removed the index from the cell and resized the grid.

# Features I would like to have added

The key thing I would like to have done is go over the code again, make it neater, I could see examples where I could have used loops to reduce the code needed to execute different functions. I would love to rewrite it and see if I can simplify it.
 * Create a keydown event where the enter key starts the game
 * Have music playing in the background for the game
 * Different difficulty levels

 * Two player mode
 * Top score saved using local storage
 * Improved styling 
 * Making it work on mobile 
 * A display for when the player wins
 
# Bugs

 Not all of the obstacles disappear at the end of the game

# Key Challenges

I found writing the function to move the obstacles challenging, I tried several different methods before getting it to work. 
Keeping track of functions was challenging, this caused me a number of timing related bugs, I learnt a lot about structuring my code so I think it will help for future projects. I will also write more notes on the code going forward to make it more readable.

# What I have learnt
I have generally become much better and much more confident using JavaScript functions, click events, query/ event selectors and forEach loops. I feel like I have a grasp of the basics of JavaScript.
