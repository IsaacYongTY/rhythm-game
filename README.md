# Fever Time
Show off your grooves to the world by hitting the notes on beat 😎

# Introduction 
**Fever Time** is named after a retro themed soundtrack in the video game Yakuza 0. The players will be awarded based the number of notes that are tapped on beat, and streaks of correct notes. This is a 7 keys games, and th

# Control
Movement: ArrowLeft and ArrowRight
Playing keys: S, D, F, Space Bar, J, K, L

# Technologies used
- HTML5 Canvas
- SCSS
- Javascript

# The Approach Taken

# Tha Main Challenge
- Animation stuttering issue
  - As animation are called frame by frame, the performance of the functions, e.g to check whether the notes are hit or missed, changing colors of keys upon tapping  becomes incredibly important. Therefore, once the MVP is done, time is spent on optimizing the functions to:
    - Avoid unnecessary loops. If certain conditions are not met, the loop will not run.
    - Reduce the amount of calls the 2D context of canvas
    
# Installation 
Follow the link at https://pages.git.generalassemb.ly/isaacyongty/rhythm-games/ and jam away!

# Unsolved Problems
