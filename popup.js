const headers = {
  "accept": "*/*",
  "accept-language": "en-US",
  // "apollographql-client-name": "nextjs-web",
  // "cache-control": "no-cache",
  "content-type": "application/json",
  // "pragma": "no-cache",
  // "sec-ch-ua": "\"Google Chrome\";v=\"117\", \"Not;A=Brand\";v=\"8\", \"Chromium\";v=\"117\"",
  // "sec-ch-ua-mobile": "?0",
  // "sec-ch-ua-platform": "\"macOS\"",
  // "sec-fetch-dest": "empty",
  // "sec-fetch-mode": "cors",
  // "sec-fetch-site": "same-origin",
  // "x-meetup-view-id": "ce9d9df1-ca78-40a6-9989-5c332f64cabf"
}

const corsPostToMeetup = {
  "method": "POST",
  "referrer": "https://www.meetup.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "mode": "cors",
  "credentials": "include"
}

const networkRequestTemplate = () => {
  fetch("https://www.meetup.com/gql2", {
    headers,
    "body": JSON.stringify({}),
    ...corsPostToMeetup
  })
  .then(res => console.log("Request # succeeded", res))
  .catch(err => console.log("Request # failed", err));
}

const rsvpToMeetup = (decision=true, eventId="296377189", eventUrl="jax-code-and-coffee") => {
  const action = decision ? "YES" : "NO";
  fetch("https://www.meetup.com/gql2", {
    headers,
    "body": JSON.stringify({
      "operationName": "rsvpToEvent",
      "variables":{
        "input":{
          eventId,
          "response": action,
          "proEmailShareOptin":false,
          "guestsCount":0,
          "venueId":"27483804"
        }
      },
      "extensions":{
        "persistedQuery":{
          "version":1,
          "sha256Hash":"a503eca5efa7aa3924f5397b743f53304da7b2fcf393c105ca466f8b31f6cbd3"
        }
      }
    }),
    ...corsPostToMeetup
  })
  .then(res => console.log("Request 3 succeeded", res))
  .catch(err => console.log("Request 3 failed", err));
}

const getMeetups = ( urlName = "jax-code-and-coffee", endCursor = '', count = 0) => {
  let variables;
  if (endCursor) {
    variables = { 
      urlName,
      "after": endCursor
    }
  } else {
    variables =  { 
      urlName
    }
  }
  
  fetch("https://www.meetup.com/gql2", {
    headers,
    "body": JSON.stringify({
      "operationName": "getUpcomingGroupEvents",
        variables,
        "extensions":{
          "persistedQuery":{
            "version":1,
            "sha256Hash": "68fc2b5c7f53b5a810cb732718beb15d96695a483c07579cf902aa7e607d0fe6"
          }
        }
    }),
    ...corsPostToMeetup
  })
  .then(res => res.json())
  .then(res => {
    const eventIds = res.data.groupByUrlname.events.edges.map(event => event.node.id) // urlName intentionally misspelled to match meetup api.
    const endCursor = res.data.groupByUrlname.events.pageInfo.endCursor // urlName intentionally misspelled to match meetup api.
    const len = eventIds.length;
    console.log('Request 2 succeeded', {
      eventIds,
      len,
      endCursor,
      events: res.data.groupByUrlname.events
    })
    if(len === 10 && count < 0) { // change count to intended page number to add pagination.
      getMeetups(urlName, endCursor, count+1)
    }
  })
  .catch(err => console.log("Request 2 failed", err));
  // how many events do you want to rsvp out to?
  // (default 10)
}

const getEvent = () => {
  fetch("https://api.meetup.com/gql", {
    headers,
    "body": JSON.stringify({
      query: `query($eventId: ID) {
        event(id: $eventId) {
          title
          description
          dateTime
        }
      }`,
      variables: {
        eventId: 296153162
      }
    }),
    ...corsPostToMeetup
  })
  .then(res => res.json())
  .then(res => console.log('Request 1 succeeded', res.data))
  .catch(err => console.log("Request 1 failed", err));
}
// rsvpToMeetup(false);
// getMeetups();
// getEvent();

// 1. to add a button:
// const elem1 = document.getElementsByClassName('du3dmzv')[0].children[0];
// const elem2 = document.getElementsByClassName('flex flex-row items-center space-x-10')[0];
// const test = elem1 === elem2; // should always be true.

// 2. to add a button:
// const btn = document.createElement("button").innerHTML="hi";
// btn.onClick = getMeetups("jax-code-and-coffee")
// const input = document.createElement("input");

// 3. to add a button: 
// elem2.appendChild(btn).appendChild(input)

// <button>hi</button> {/* Button needs to rsvp to the event. */}
// <input type="text"></input>  {/* Input needs to feed to a variable */}

// 1. when on an event page
// url.contains('events')
// https://www.meetup.com/RubyJax/events/257144296

// 2. when on a groups page
// https://www.meetup.com/rubyjax/events

// Or look at network request to figure out what page I am on ?
// Can a chrome extension know what network requests have been run?

// Features
// 1. show all groups for current user. gql ... self
// 2. rsvp "yes" to 10 meetups for a group.
// 3. rsvp "yes" to all meetups for a group.
// 4. rsvp "yes" to the next 10 meetups for a event description.
// 5. rsvp "no" to 10 meetups for this group.
// 6. rsvp "no" to all meetups for this group.
// 7. rsvp "no" to the next 10 meetups for this event description.

// A possible full experience:
// 1. add a slider at the top of the page of the extension is enabled.
// 2. when the slider is active the powderblue ui pops up.
// 3. add a button for all.
// 4. it shows your groups as buttons.
// 5. it shows an input text to filter by text.
// 6. it shows results of the query.
// 7. it has an rsvp yes and rsvp no button.

// This extension solves the meetup subscribe situation for desktop
// but how can we solve it for mobile?
// introducing the simple rsvp meetup-subscribe mobile app.

// meetup subscribe mobile app
// 1. make curl requests to see if they are possible when not on the meetup website.
// 2. make a simple react native app and see if possible to use the same request.
// 3. add the interface from above to a mobile app
// 4. submit to app store. 

// Reach out to Alex.
// got time to talk next week, timeboxed to 20 minutes
// let me know day/time that works for you
// I am interested in discussing the equation for selling your lunch to co-workers.
// when lunchpool was originally pitched at startup weekend this was the idea.
// just wanted to go through quick pricing strategies along with general catching up.
// I need to check if any applications have done this... (how would you find it other than app store?)
// find: commercial product... phone/web , transactions.
// Characteristics of what you are finding.

// Another packaging system...
// Wizard style.
// questions: 
// SO, I hear you want to subscribe/rsvp to meetups!
// What group? 
// (list all meetups) , dropdown, or many buttons.
// For this group would you like to rsvp to all ? 
// options: (meetups with a text pattern) or (all meetups)
// 
// what slideshow? powderblue sheek.
// get ui up via mock data.

// 

const loadPage = () => {
  
  document.getElementsByTagName('body')[0].remove()
  const html = document.getElementsByTagName('html')[0].innerHTML += '<h1>hello</h1>';
  // var xhr = typeof XMLHttpRequest != 'undefined' ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
  // xhr.open('get', 'file.html', true);
  // xhr.onreadystatechange = function() {
  //     if (xhr.readyState == 4 && xhr.status == 200) {
  //         const newDiv = document.createElement("div"); 
  //         const html = document.getElementsByTagName('html')[0].innerHTML += '<h1>hello</h1>';
  //     } 
  // }
  // xhr.send();
}
loadPage()