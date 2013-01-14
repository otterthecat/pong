pong
====

Proof of concept sketch of the classic "Pong" game using html's Canvas tag and Javscript


Heavily based on https://github.com/llimllib/refresh-canvas


multi client
-------------

This version can be shared between 2 clients (browsers) at once.

First, ensure the main directory is accessible in a webserver.

Then, have NODE start the server by calling the file 'pong_socket.js' in the server directory.
For instance, if you are in the main directory, you can open up a terminal window and enter

	node server/pong_socket.js

The socket server will then be running on 127.0.0.1 port 4000.

You can then access the index.html file in your browsers (say, firefox and chromium).

Once each browser assigns itself a name, the app will start running.
Currently, whichever browser is active will control the left paddle (hey, this is still the early statges, remember?), however you will note that as the paddle changes the ball's (not paddle - yet) course, it will be reflected in both browsers.

Random
------

If you're looking at this, you may be interested in some other, more polished projects:

[blox.js](https://github.com/otterthecat/blox.js)

[cmdjs](https://github.com/otterthecat/cmdjs)


