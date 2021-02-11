# Fever Time


# Fever Time
Show off your grooves to the world by hitting the notes on beat 😎  
Named after a retro themed soundtrack in the video game Yakuza 0, the players will be awarded based the number of notes that are tapped on beat, and streaks of correct notes. This is a 7 keys games, and th

# Control
Movement: ArrowLeft and ArrowRight  
Playing keys: S, D, F, Space Bar, J, K, L

# Technologies used
- HTML5 Canvas
- SCSS
- Javascript

# The Approach Taken
Object-Oriented Programming (OOP) is the main approach to creating this game. Each single music blo
## Level Design
Each song (level) can be designed for different difficuties and pattern to reflect the characteristics of the song.

# Tha Main Challenge
### Canvas Animation stutters
As animation are called frame by frame, therefore the performance of the functions, e.g to check whether the notes are hit or missed, changing colors of keys upon tapping becomes incredibly important. Once the MVP is done, time is spent on optimizing the functions to:
    - Avoid unnecessary loops. If certain conditions are not met, the loop will not run.
    - Reduce the amount of calls the 2D context of canvas
    
### Getting the beat to sync with the music
The sync can be affected by various factors such as:
  - Speed
  - Height of canvas
  - Loading of audio files from server on browser
  
  This challenge is overcame by setting the height and speed, and prefetch the song level's audio. In the future this can be improved by ensuring the game starts only after the music is ready
 
   
# Installation 
Follow the link [here](https://pages.git.generalassemb.ly/isaacyongty/rhythm-games/) and jam away!

# Unsolved Problems
Canvas Animation stutters though lesser but remains an issue. Currently the most possible culprit is the constant redrawing the keys on canvas that also has to change colors when the keys are pressed. Possible solution is to render an overlay on the key when it's pressed, so the overlay only renders when needed, and the keys can be drawn to canvas only once.

# Future plans for the project
  - Recreate the project with Unity and C# for future expansions
  - Add more songs to the level
  - A level editor so players can create their own levels with their favorite music
  - Ability to play long notes (HOLD key for the entire length of notes)
