On the wayback machine meetup.com's public api dates back to 2008.   
Meetup.com used to have a robust public api that was a big selling point for using the application.  

Well, I happen to be in groups that still use meetup.com. So lets try to get something working client side.

## Instructions
```bash 
git clone https://github.com/MichaelDimmitt/meetup-subscribe-extension.git;
cd meetup-subscribe-extension;
open chrome://extensions;

# ensure dev tools are enabled in the top right corner of this page  
# and click load unpacked and go to select the directory for this project
```

## Docs:
https://developer.chrome.com/extensions/getstarted

## Why a chrome extension?
Meetup discontinued the v2 and v3 rest api.  
Now there is a gql and gql2 api.  
The gql api is documented the gql2 api is not documented.

The api still posts about its implicit flow as if client applications are possible when they are not.

Free accounts can not generate new api keys since 2019.  
https://zerokspot.com/weblog/2019/10/15/meetup-changes/

None of the graphql examples on the meetup docs have an example of making the request client side after completing the implicit flow for getting an authentication key.

Lastly, all client applications fail even when using an app authorized with the implicit flow, failing with a cors error due to a misconfiguration server side.  

<!--
After more investigation on this project I think the cors error might be a bad server message. I wonder if that cors error is happening because it is using an old oauth consumer as I do not have a pro account but do have old oauth consumer keys. If your graphql request is a little off you will often get a cors error instead of a legit error around your graphql syntax.
-->

Due to these constraints, the best way I can think to add auto subscribe functionality to meetups is to make an extension that will make requests while on the meetup website to work around cors.

## Working:
- [x] rsvp yes to a meetup
- [x] rsvp no to a meetup
- [x] get upcoming meetups for a group (default 10)
- [x] (unused) get details for a single event. by id
- [x] recurse through all upcoming meetups to allow more than 10 able to cycle the entire list.
## Todo:
- [ ] housekeeping (simplify request boiler plate logic)
- [ ] get details for events that match a string title regex.
- [ ] add a button on the meetup website to trigger rsvp to group, rsvp to event by partial string, next 10 or next "all"
- [ ] I might just put together a bunch of useful api request examples that I do not use that other people would find helpful. If you want a particular request example open an issue.
