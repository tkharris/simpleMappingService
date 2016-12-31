_simpleMappingService_ is a client-server program for eliciting points on a map from each user, and displaying all users' positions on the map. I was pretty rusty on the Node Framework, and I had never used Angular before. This is just an coding excercise.

DEPENDENDIES
------------

node, npm, mongo, a modern browser (with native websocket support), open ports at 3000 and 3001

RUNNING
-------

fire up a mongo server, and...

```sh
npm install
node server.js
```

navigate to http://localhost:3000

FEATURES
--------

* Allows for unrestricted account creation that becomes password-protected.
* Users are allowed to set and modify their locations and can see but not view others' locations.
* Locations are broadcast to all connected clients so that when one user changes their location, all connected users immediately see those changes.

DEVELOPER NOTES
---------------

I am using broserify, but it's not baked into any build process. Run
```
broswerify public/js/app.js -o public/js/bundle.js
```
to implement any front-end javascript changes. I checked the bundle in, so no need to do that to get it running as is.

RESOURCES
---------

* https://scotch.io/tutorials/making-mean-apps-with-google-maps-part-i
* https://scotch.io/tutorials/easy-node-authentication-setup-and-local
