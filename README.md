# Hello World

This application demonstrates simple name registration using the Eris Decerver
and [IPFS](http://ipfs.io/).  No blockchains nor smart contracts are employed (yet).

Requirements:

* Docker
* Docker Compose

Begin by running the `test.sh` script to make sure everything's working.

The application communicates with the Decerver using the IPFS protocol.  It is expected that this will be replaced with an Eris protocol in the future.

## Development

1.  Open a shell in the `source` directory and leave it open.
1.  Run `dev.sh`.  It will start a server container and a test container.
1.  See the dapp by opening `http://localhost:5001` in a browser.
1.  Whenever you make a change to a JavaScript file (such as `HelloWorld.js`), you need to re-bundle it before you can see the change reflected in the browser.  Do this by re-running the command `npm run build` and then refresh your browser.

# Copyright

Copyright 2015 Eris Industries

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.
