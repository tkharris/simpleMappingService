This README describes a client-server program for eliciting points on a map from a user, and displaying all users' positions on the map. I made sure to commit frequently as I worked, so you can get a good idea of how I work if you cared to dig into it. I was pretty rusty on the Node Framework, and I had never used Angular before, so I had to do a little reading as I went along.

DEPENDENDIES
------------

node, npm, mongo, a modern browser (with native websocket support), open ports at 3000 and 3001

RUNNING
-------

fire up a mongo server, and...

```sh
git clone sms.bundle
cd sms
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

For full disclosure, here are a couple resources that I used which were not just API references and the like. I found myself quite a bit rusty with Node. etc, so I dug up a couple tutorials and used them to get bootstrapped.

* https://scotch.io/tutorials/making-mean-apps-with-google-maps-part-i
* https://scotch.io/tutorials/easy-node-authentication-setup-and-local
