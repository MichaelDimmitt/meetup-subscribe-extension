import React from 'react';
import { meetups } from '../data';
if(true) { import('../powderbluelook.css') }


const MeetupDetails = () => {
  const meetup = meetups[0];
  const {
    created, description,duration,group,
    id,link,local_date,local_time,name,status,
    time,updated, utc_offset, 
    venue, visibility, 
    waitlist_count, yes_rsvp_count 
  } = meetup;
  // const {id, venue.name, venue.lat, venue.lon, venue.repinned} = venue;
  // const { created, name, id, join_mode, lat } = group;
  return <div>
      name: {name}
      <br/>description:
      <br/><div style={{border: 'solid black 1px', display: 'inline-block', whiteSpace: 'pre-line', padding: '.5rem', margin: '.5rem'}}>{ description.replace(/<\/?[^>]+(>|$)/g, "")}</div>
      <br/>created: { created}
      <br/>duration: { duration}
      <br/>group.created: { group.created}
      <br/>group.name: { group.name}
      <br/>group.id: { group.id}
      <br/>group.join_mode: { group.join_mode}
      <br/>group.lat: { group.lat}
      <br/>id: id: { id}
      <br/>link: { link}
      <br/>local_date: { local_date}
      <br/>local_time: { local_time}
      <br/>status: { status}
      <br/>JSON.stringify(time): { JSON.stringify(time)}
      <br/>updated: { updated}
      <br/>utc_offset: { utc_offset}
      <br/>venue.id: { venue.id}
      <br/>venue.name: { venue.name}
      <br/>venue.lat: { venue.lat}
      <br/>venue.lon: { venue.lon}
      <br/>venue.repinned: { venue.repinned}
      <br/>visibility: { visibility}
      <br/>waitlist_count: { waitlist_count}
      <br/>yes_rsvp_count: { yes_rsvp_count}
  </div>
}
export const Component = MeetupDetails
export default MeetupDetails
