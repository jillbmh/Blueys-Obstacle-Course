# ReadMe- Project 1- Blueys Obstacle Course

# Intro
Our first project with SEI was a solo project. We were tasked with building a grid based game and had 7 days to complete it.

Blueys Obstacle course is a game of Frogger based on the children's tv show ‘Bluey’. Bluey is my youngest daughter's favourite TV show. There are different characters that Bluey must get past to get to the garden. This was my first project and first time building a game. 


You can access the application and code here, on GitHub.




# Overview of task


I had a week to build a game based on Frogger, using HTML, CSS and JavaScript. The game had the following MVP targets:


1.The game should be playable for one player.
2.The obstacles should be auto generated.

In addition to the above technologies I used Figma and Trello to plan the project.




# Planning

I planned the wire frame on figma and the pseudocode on Trello. I was able to use Trello to move around the order of each task quite easily which helped me as I planned the game. I wanted to make sure that I gave myself lots of time to write the JavaScript so planned to just use colours for the backgrounds to get me started.







# Build/Code Process

I started off by creating the HTML, basic CSS and an empty grid using JavaScript. I made a function to start the game with sound and an image.

I then moved on to creating the obstacles. When I added obstacle 1, ‘Bingo’ I got loads of errors so I removed her and did it step by step, it was a scope issue and so I was able to re add her. I then added a forEach loop to add Bingo to each cell I wanted. 

I then moved onto moving ‘Bluey’ by adding my key down function. I added conditions to stop Bluey moving off the board. This was tricky but after some research I managed to do it.



I then looked at the functionality for the lives, points and how to win. I kept looking at my trello board to keep me on track of where I was.

I found the functions for a collision quite tricky and did lots of research, I was really pleased to figure it out.





I needed to add a delay to the game restarting to allow the game over function to finish.




# Challenges

I found writing the function to move the obstacles challenging, I tried several different methods before getting it to work. It was such a win when I got it working. It was also tricky stopping Bluey being able to move off the page, fixing that took a lot of research and trial and error.

Keeping track of functions was also challenging, this caused me a number of timing related bugs, I learnt a lot about structuring my code so I think it will help for future projects. I will also write more notes on the code going forward to make it more readable.





# What I have learnt

I have generally become much better and much more confident using JavaScript functions, click events, query/ event selectors and forEach loops. I feel like I have a grasp of the basics of JavaScript. I learnt that notes definitely help reduce confusion and keep you on track in your code.




# Bugs

Not all of the obstacles disappear at the end of the game




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

