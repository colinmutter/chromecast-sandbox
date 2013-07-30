Chromecast Experiments
=====

The files present are currently part of a working Chrome Sender API -> Custom Receiver example on the Chromecast.

### Usage
To use these yourself, simply:

 - Paste your whitelisted AppID in the **receiver/receiver.html** and **sender/js/sender.js** files where you see "**DEV_APP_ID_HERE**";
 
 - Upload **receiver/receiver.html** (and optionally **receiver/images/loader.gif**) to the EXACT url that you got whitelisted.
   - e.g. if you whitelisted http://mysite.com/dev/ then you must serve your receiver file from that URL exactly, so do not call it receiver.html unless that's what you whitelisted.  It seems a few people have been stuck on this part.
 - Using your favorite web server (ahem, ```sudo npm install -g serve```) just type ``serve`` in the **sender/** directory, or however you'd like to serve the local files.
 - Navigate to ```http://localhost:3000/sender.html``` (or whatever port you decided to serve on) 
 
 
### Notes
The **sender** should scan for devices that are able to offer a matching receiver for your given AppID.  Again, this should show your device right away.  If not, make sure your device is on and discoverable, and that you have not disabled serial number sharing with Google.  The device should know that it's whitelisted and subsequently you should see your device listed on sender.html.

The **receiver** should be launched upon you clicking on your device in the list.  Any failures at this point could indicate that your receiver file was not properly loaded.  One easy way to verify is to check your weblogs to see if a request was made to it by your fantastically mysterious Chromecast.

The **doLaunch** function in the sender has a bunch of nonsense information, but this is where you could choose to send your receiver additional information.  You can leave this for the test, as the receiver.html does not rely on any of these values.