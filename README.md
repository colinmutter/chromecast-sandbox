Chromecast Experiments
=====

The files present are currently part of a working Chrome Sender API -> Custom Receiver example on the Chromecast.

### Usage
To use these yourself, simply:

 - Paste your whitelisted AppID in the **receiver/receiver.html** and **sender/js/sender.js** files where you see "**DEV_APP_ID_HERE**";
 
 - Upload **receiver/receiver.html** (and optionally **receiver/images/loader.gif**) to the EXACT url that you got whitelisted.
 
 - Whitelist your sender domain, ```localhost``` by following the Chrome extension steps below.
   
 - Using your favorite web server (ahem, ```sudo npm install -g serve```) just type ``serve`` in the **sender/** directory, or however you'd like to serve the local files.
 - Navigate to ```http://localhost:3000/sender.html``` (or whatever port you decided to serve on) 
 

### Whitelisting 
#### sender
To whitelist the Chrome sender, you must click on the Chrome extension icon, then "Options".  Then repeatedly click on the big blue icon next to the title, "Google Cast extension options" until a new setting appears below "Fullscreen Zoom", entitled, "Developer Settings".  In this box you provide domains that should trigger the injection of the Cast API.  Here's a hint: while the extension manifest seems to accept match URLs, I couldn't seem to get them to work in this box.  It seems it only needs the domain.  This, if you're serving your file from http://localhost:3000/sender.html, simply put ```localhost``` in the box and click Add.  Do not reload the extension.

#### receiver
The url that serves your receiver must be exactly the same url that you whitelisted with Google (not bo be confused with whitelisting a sender domain). For example, if you whitelisted http://mysite.com/dev/ then you must serve your receiver file from that URL exactly, so do not call it receiver.html unless that's what you whitelisted.  It seems a few people have been stuck on this part.
At the moment receiver and device whitelisting seem to be available here: [Chromecast Developer Whitelist](https://docs.google.com/forms/d/1E-vka5QP8LkF0nbfz-omN1DjNSX1uLGyqHdbpEFh6zg/viewform)

### Notes
The **sender** should scan for devices that are able to offer a matching receiver for your given AppID.  Again, this should show your device right away.  If not, make sure your device is on and discoverable, and that you have not disabled serial number sharing with Google.  The device should know that it's whitelisted and subsequently you should see your device listed on sender.html.

The **receiver** should be launched upon you clicking on your device in the list.  Any failures at this point could indicate that your receiver file was not properly loaded.  One easy way to verify is to check your weblogs to see if a request was made to it by your fantastically mysterious Chromecast.

The **doLaunch** function in the sender has a bunch of nonsense information, but this is where you could choose to send your receiver additional information.  You can leave this for the test, as the receiver.html does not rely on any of these values.