# Yet Another Life in JavaScript

There are lots of implementations of Conway's Game of Life in many languages. It's a great way to learn a new language since the logic is simple, so one can focus on the language details. And that's my rationale for this implementation; it's my first foray into JavaScript and p5.js. I also want to try hosting a p5.js sketch on GitHub.

But this implementation is a bit different from others I've seen. Playing with JavaScript a bit, I notice it implements sparse arrays (they don't explicitly store blank entries), so I've taken advantage of that here, and the code takes care to not populate cells in the grid that aren't needed.
