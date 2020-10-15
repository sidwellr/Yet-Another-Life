# Yet Another Life in JavaScript

There are lots of implementations of Conway's Game of Life in many languages. It's a great way to learn a new language since the logic is simple, so one can focus on the language details. And that's my rationale for this implementation; it's my first foray into JavaScript and p5.js. I also want to try hosting a p5.js sketch on GitHub.

But this implementation is a bit different from others I've seen. Playing with JavaScript a bit, I notice it implements sparse arrays (they don't explicitly store blank entries), so I've taken advantage of that here, and the code takes care to not populate cells in the grid that aren't needed.

The window shows a small view of the Life Grid. Drag to see different areas, and use the scroll wheel to zoom in or out.

Active keys:
* up/down arrows: Increase or decrease the speed (same as the Speed slider).
* left/right arrows: Increase or decrease the trail length (same as the Trail length slider).
* g: Toggle display of grid lines (same as Grid checkbox).
* t: Toggle display of trails (same as Trails checkbox). Trails show recently deceased cells in white; the trail length determines how long they show.
* c: Center the window on the grid.
* r: Reset the grid to a random configuration (like when it first starts).
* 1-4: Reset the grid to one of several preset configurations.

This sketch is also available in the online p5.js editor: https://editor.p5js.org/rsidwell/sketches/3IKZhhpWY.
