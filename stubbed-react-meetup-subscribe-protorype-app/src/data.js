
const description4 = 'bye'; 
const exampleGroup = {
  name: 'code and coffee stub',
  id: '12332',
  group: {
    name: 'a group',
    join_mode: 'true'
  },
  venue: {
    name: 'a venue',
    repinned: true,
  },
  time: 10,
  description: description4, 
}

const description3 = `The OWASP Foundation came online on December 1st, 2001 it was established as a not-for-profit charitable organization in the United States on April 21, 2004, to ensure the ongoing availability and support for our work at OWASP. OWASP is an international organization and the OWASP Foundation supports OWASP efforts around the world. OWASP is an open community dedicated to enabling organizations to conceive, develop, acquire, operate, and maintain applications that can be trusted. All of the OWASP tools, documents, forums, and chapters are free and open to anyone interested in improving application security. We advocate approaching application security as a people, process, and technology problem because the most effective approaches to application security include improvements in all of these areas. We can be found at www.owasp.org.
`
const meetup = {
  created: 'true', 
  description: description3, 
  duration: 10, 
  group: {
    name: 'ruby jax stub',
    join_mode: 'true'
  },
  id: '122323', 
  link: 'http://example.com', 
  local_date: '2109383', 
  local_time: '1209373', 
  name: 'stub name', 
  status: 'pending', 
  time: new Date(),
  updated: 'false', 
  utc_offset: '+200', 
  venue: {
    name: 'availity',
    repinned: false,
  }, 
  visibility: 'public', 
  waitlist_count: '1', 
  yes_rsvp_count: '1',
}
const description1 = `Because Mondays are terrible and coffee and people make them better.

Have a conversation over coffee,
work remotely,
Or just pop in for a visit on your way to the beach/office!
`
const description2 = `ALL WELCOME - Open Source Enthusiasts, Programmers, Hackers, Hobbyists.
This meetup is language agnostic. Come hang out and work on some code.

Bring your projects, come for help or come to help; all levels welcome.

We're a friendly bunch. The water's warm! Come practice coding with us!
`

console.log(JSON.stringify(description1))
// time: moment(new Date()).subtract(50, 's').toDate()
const meetups = [
  {...meetup, group: {name: 'code and coffee'}, venue: { name: 'roundbird' }, name: 'code and coffeee', description: description1 },
  {...meetup, group: {name: 'ruby jax stub'}, venue: { name: 'hashrocket' }, name: 'ruby jax stub', description: description2},
  {...meetup, group: {name: 'owasp stub'}, name: 'owasp stub'},
  {...meetup, group: {name: '2600 stub'}, name: '2600 stub'},
]

export {meetups}