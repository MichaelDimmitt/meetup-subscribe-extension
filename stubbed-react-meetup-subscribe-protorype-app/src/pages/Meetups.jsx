import React from 'react';
// import moment from 'moment'
import { meetups } from '../data';
// import { rsvp, fetchMeetup, fetchSpecificGroupMeetup } from '../revamp'
import '../powderbluelook.css';

const buttonStyle = {
  borderRadius: '.5rem',
};

class Meetups extends React.Component {
  constructor(props){
    super(props);
    // this.rsvpMe = this.rsvpMe.bind(this)
    // this.rsvp = rsvp.bind(this)
    // this.fetchSpecificGroupMeetup = fetchSpecificGroupMeetup.bind(this)
    // this.fetchMeetup = fetchMeetup.bind(this)
    this.state={
      meetups,
      status:"So far no rsvp logged",
      loading: false
    }
  }

  render() {
    const Header = () => <div id="Header">Logged In as UserName</div>;

    const RsvpButtons = () => (
      <span id="RsvpButton" style={{ display: 'flex' }}>
        <span style={{ minWidth: '170px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('yes', this.props.history)} >
            Rsvp Yes All
          </button>
        </span>
        <span style={{ minWidth: '104px' }}>
          <button style={buttonStyle} onClick={() => this.rsvpMe('no', this.props.history)}>Rsvp No All</button>
        </span>
        <span style={{ width: '100%', textAlign: 'left' }}>
          {this.state.status}
        </span>
      </span>
    );

    // const SearchInput = (
    //   { label } // label
    // ) => (
    //   <div
    //     id="SearchInput"
    //     style={{ display: 'flex', padding: '3px 0px 3px 0px' }}
    //   >
    //     <span style={{ minWidth: '170px' }}>{label}</span>
    //     <span style={{ width: '100%' }}>
    //       <input
    //         style={{ width: '95%' }}
    //         type="text"
    //         name={label}
    //         placeholder="(provides all meetups results if not modified)"
    //       />
    //     </span>
    //   </div>
    // );

    const SearchGroupsUsingButtons = ( {label} ) => {
      return ( <div>
        <div style={{ display: 'flex' }}>
          <span style={{minWidth: '170px' }}>{label}</span>
          <button onClick={() => {
            fetchMeetup(this.props.session.accessToken, {}, this.props.history)
            .then(x => {this.setState({meetups: x})})
          }}>
            Display All Meetups (default behavior)
          </button>
        </div>
        <br/>
        {this.props.meetups ? this.props.meetups.map( (obj, index) => {
          return <button onClick={() => {
              fetchSpecificGroupMeetup(this.props.session.accessToken, {}, obj.name, this.props.history)
              .then(x => {this.setState({meetups: x})})
            }
          } key={index} >{obj.name}</button>
          }) : <div></div>
        }
      </div>
    )
    }

    const Results = () => {
      return (
      <div id="Results">
        <div>Results (Results Component)</div>
        <hr/>
          <div>
            {  this.state.meetups ? this.state.meetups.map( (meetup, index) => { 
              const {group, venue, time, description} = meetup 
              // group.name, group.join_mode
              // venue.name, venue.repinned
              return <div key={index}>
            {/* <div style={{textAlign:'left'}}>{moment(time).fromNow()}</div> */}
            <br/>{ group.name} at { venue.name} 
              <>
                <span style={{ minWidth: '170px', padding: '0 1rem' }}>
                  <button style={buttonStyle} onClick={() => {
                    this.fetchSpecificGroupMeetup(this.props.session.accessToken, {}, group.name, this.props.history)
                    .then(res => { return venue.name ? res.filter(meetupItem => meetupItem.venue.name === venue.name) : res })
                    .then(x => {this.setState({meetups: x})})
                  }} >
                    Filter by title
                  </button>
                </span>
              </>
            <br/><br/>Join Mode: { group.join_mode}
            <br/><br/>description: <br/>
            <div style={{border: 'solid black 1px', display: 'inline-block', whiteSpace: 'pre-line', padding: '.5rem', margin: '.5rem'}}>{ description.replace(/<\/?[^>]+(>|$)/g, "")}
            </div>
            <br/>{(venue.repinned && `repinned: ${ venue.repinned }`)}
            <hr/>
          </div>}) : <div></div> }
        </div>
      </div>
    )};

    return (<>
        {
          this.state.loading && <>
            <Overlay/>
          </>
        }
        <Header />
        <br />
        <SearchGroupsUsingButtons label="Search Group" />
        <br />
        <RsvpButtons />
        {/*
        <SearchInput label="Search Group" />
        <SearchInput label="Search Common Title" />
        */}
        {/*
        <br />
        <div className="flex">
          <button>Search</button>
        </div>
        */}
        <br />
        <Results />
      </>
    );
  }
}
const Overlay = <div className='overlay' >
    <div style={{
    position: 'absolute',left: 'calc(50% - 200px)',top: '30%',
    borderRadius: '20px',backgroundColor: 'white',width: '400px',height: '150px'
    }}>
    <h1 style={{margin: '2rem'}}>
        Loading, please be patient
    </h1>
    </div>
</div>
export const Component = Meetups;
export default Meetups;