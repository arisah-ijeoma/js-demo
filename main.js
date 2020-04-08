const events = [
  {
    id: 1,
    type: "MeetUp",
    name: "MeetUp Vancouver June 2020",
    startDate: new Date("Jun 05 2020"),
    endDate: new Date("Jun 10 2020"),
    deadline: new Date("May 15 2020"),
    link: "https://ijeomarisah-vanhack-js/meetup/vancouver/2020",
    state: "Vancouver",
    stateImage: "https://lp-cms-production.imgix.net/2019-06/27860479.jpg?fit=crop&q=40&sharp=10&vib=20&auto=format&ixlib=react-8.6.4",
    country: "Canada",
    countryFlagImage: "https://www.caam.ca/images/canada-flag.gif",
    note: "Here, you’ll have the opportunity to be part of a live Recruiting Fair where you will see opportunities from companies in Vancouver looking for talents just like you.",
    isPremium: false
  },
  {
    id: 2,
    type: "Leap",
    name: "Leap Halifax April 2020",
    startDate: new Date("April 01 2020"),
    endDate: new Date("April 05 2020"),
    deadline: new Date("March 04 2020"),
    link: "https://ijeomarisah-vanhack-js/leap/halifax/2020",
    state: "Halifax County",
    stateImage: "https://assets.simpleviewinc.com/simpleview/image/upload/c_fill,h_1110,q_50,w_1920/v1/clients/vancouverbc/False_Creek_1__4bddae07-4a55-42b5-ae36-4e163399be5e.jpg",
    country: "Canada",
    countryFlagImage: "https://www.caam.ca/images/canada-flag.gif",
    note: "Leap is an amazing opportunity for tech-based companies located in any city in to hold face to face interviews with top developers from around the world.",
    isPremium: false
  },
  {
    id: 3,
    type: "Recruiting Mission",
    name: "Recruiting Calgary 2020",
    startDate: new Date("2020 06 30"),
    endDate: new Date("2020 07 04"),
    deadline: new Date("2020 06 09"),
    link: "https://ijeomarisah-vanhack-js/mission/calgary/2020",
    state: "Calgary",
    stateImage: "https://moving2canada.com/wp-content/uploads/2017/10/calgary_aerial_1100x560_sans_credit__must_credit_tourism_calgary__960.jpg",
    country: "Canada",
    countryFlagImage: "https://www.caam.ca/images/canada-flag.gif",
    note: "VanHack is bringing some of the best developers who want to relocate for a weekend-long recruiting fair.",
    isPremium: false
  },
  {
    id: 4,
    type: "VanHackathon",
    name: "VanHackathon Toronto July 2020",
    startDate: new Date("2020 07 15"),
    endDate: new Date("2020 07 20"),
    deadline: new Date("2020 06 24"),
    link: "https://ijeomarisah-vanhack-js/vanhackathon/toronto/2020",
    state: "Toronto",
    stateImage: "https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F53993784%2F142610795213%2F1%2Foriginal.20181215-080406?w=1000&auto=format%2Ccompress&q=75&sharp=10&rect=0%2C24%2C1280%2C640&s=03e05c7783687ef449bca99da8e2c1ec",
    country: "Canada",
    countryFlagImage: "https://www.caam.ca/images/canada-flag.gif",
    note: "The VanHackathon is a virtual hackathon where companies share challenges with a talent pool of developers & designers interested in relocating.",
    isPremium: false
  },
  {
    id: 5,
    type: "Premium-only Webinar",
    name: "Premium Montréal August 2020",
    startDate: new Date("2020 08 12"),
    endDate: new Date("2020 08 16"),
    deadline: new Date("2020 07 22"),
    link: "https://ijeomarisah-vanhack-js/premium-webinar/montreal/2020",
    state: "Montréal",
    stateImage: "https://315gqf1cb88e2qagu3f9xz91-wpengine.netdna-ssl.com/wp-content/uploads/2020/03/353-Montreal.jpg",
    country: "Canada",
    countryFlagImage: "https://www.caam.ca/images/canada-flag.gif",
    note: "Get the Skills, Network and Mindset needed to Get Hired Abroad.",
    isPremium: true
  },
  {
    id: 6,
    type: "Open Webinar",
    name: "Webinar Berlin September 2020",
    startDate: new Date("2020 09 01"),
    endDate: new Date("2020 09 05"),
    deadline: new Date("2020 08 10"),
    link: "https://ijeomarisah-vanhack-js/open-webinar/berlin/2020",
    state: "Berlin, Stadt",
    stateImage: "https://i.insider.com/5d10dd1ae3ecba7da40c4815?width=1100&format=jpeg&auto=webp",
    country: "Germany",
    countryFlagImage: "https://www.freeiconspng.com/uploads/line-material-property-flags-germany-14.png",
    note: "A presentation, lecture, workshop or seminar that will be transmitted over the web using video conferencing software.",
    isPremium: false
  }
].sort((a, b) => a.startDate - b.startDate);

let parsedIds = {};

const appliedEventIds = localStorage.getItem("appliedEvents");
if (appliedEventIds) {
  parsedIds = JSON.parse(appliedEventIds);
}

const formatDate = date => {
  let options = { month: "long", year: "numeric", day: "numeric" };
  return date.toLocaleString("en", options);
};

const applyToEvent = id => {
  let event = events.find(event => event.id === id);
  parsedIds[id] = true;
  localStorage.setItem("appliedEvents", JSON.stringify(parsedIds));

  updateApp(id);
  alert(`You have successfully applied for ${event.name}`);
};

const updateApp = id => {
  let action = document.querySelector(".actions");
  action.innerHTML = '<div class="view-more-btn apply-btn modal-applied">Applied</div>';

  let eventDetailBtn = document.querySelector(`.btn-${id}`);
  eventDetailBtn.innerText = "See application details";
  eventDetailBtn.className = "applied";
  eventDetailBtn.addEventListener("click", function() {
    loadMore(id, true);
  });
};

const copyLink = () => {
  let copyText = document.querySelector("#event_link");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  document.execCommand("copy");

  alert(`Copied ${copyText.value} to clipboard`);
};

const loadMore = (id, hasApplied) => {
  const modal = document.querySelector("#eventModal");
  const event = events.find(event => event.id === id);
  let element = `<button class="view-more-btn apply-btn" onclick="applyToEvent(${event.id})">Apply</button>`;
  let modalContent = "";
  let shareableLinkData = "";
  let note = `
    <p class="event-note">${event.note}</p>
    <p>The event will hold in ${event.state}, ${event.country}.</p>
    <span>It will take place from ${formatDate(event.startDate)} to ${formatDate(event.endDate)}.</span>
    <p>The deadline for this event is <strong>${formatDate(event.deadline)}.</strong></p>
  `;

  if (parsedIds[id]) {
    element =
      '<div class="view-more-btn apply-btn modal-applied">Applied</div>';
  }

  if (hasApplied) {
    note = `
      <p>Location: ${event.state}, ${event.country}</p>
      <p> Dates: ${formatDate(event.startDate)} - ${formatDate(event.endDate)}</p>
    `;
  }

  if (event.deadline > new Date()) {
    shareableLinkData = `
      <input type="text" value="${event.link}" id="event_link" readonly>
      <button onclick="copyLink(${event.id})">Share event link</button>
    `;
  }

  if (event.isPremium) {
    modalContent = `
    <span id="close">&times;</span>
    <p>This event is open to only premium users</p>
    <p>You can find out more details about our premium package <a id="premium" target="_blank" href="https://vanhack.com/premium/">here</a></p>
  `;
  } else {
    modalContent = `
    <span id="close">&times;</span>
    <h3 class="event-name">${event.name}</h3>
    <div class="event-bg-image" style="background-image: url(${event.stateImage})">
      <div class="event-bg-body">
        <div class="event-bg-name">${event.name}</div>
        <div class="event-bg-duration">${formatDate(event.startDate)} - ${formatDate(event.endDate)}</div>
        <div class="actions">${element}</div>
      </div>
    </div> 
    <div class="event-body">
      ${note}
      ${shareableLinkData}
    </div>
  `;
  }

  modal.innerHTML = `
    <div class="modal-content">
      ${modalContent}
    </div>
  `;

  let span = document.querySelector("#close");

  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  };

  window.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};

// add details on the next upcoming event
const nextEventDiv = document.querySelector("#next_event");
const nextEvent = events[0];

nextEvent.className = "next-event";
nextEventDiv.innerHTML = `
  <div class="event-country-flag" style="background-image: url(${
    nextEvent.countryFlagImage
  })"></div>
  <span class="next-event-name">${nextEvent.name}</span>
  <span class="next-event-location">${nextEvent.state} - ${nextEvent.country}</span>
  <span class="next-event-duration">${formatDate(nextEvent.startDate)} - ${formatDate(nextEvent.endDate)}</span>
  <span class="next-event-deadline">Deadline: ${formatDate(nextEvent.deadline)}</span>
`;

const heroBanner = document.querySelector("#hero");
heroBanner.src = nextEvent.stateImage;

// populate events on page
const upcomingEvents = document.querySelector("#events");

events.map(event => {
  const eventDiv = document.createElement("div");
  let button = "";
  let premiumImage = "";

  if (event.deadline > new Date() && parsedIds[event.id]) {
    button = `<button class="applied btn-${event.id}" onclick="loadMore(${event.id}, true)">See application details</button>`;
  } else if (event.deadline > new Date()) {
    button = `<button class="view-more-btn btn-${event.id}" onclick="loadMore(${event.id})">See Details</button>`;
  }

  if (event.isPremium) {
    premiumImage = `<img alt="premium" class="premium-image" src="https://www.sshcloud.net/web/image/product.template/10/image" />`;
  }

  if (
    event.type === "Leap" ||
    event.type === "Recruiting Mission" ||
    event.type === "VanHackathon"
  ) {
    eventDiv.className = "event special-event";
  } else {
    eventDiv.className = "event";
  }

  eventDiv.innerHTML = `
    <div class="event-image" style="background-image: url(${event.stateImage})">
      <div class="event-country-flag right-bottom-flag" style="
        background-image: url(${event.countryFlagImage});  
      "></div>
    </div>
    
    <div class="event-image-with-premium">
      ${premiumImage}
      <span class="event-type">${event.type} event</span> 
    </div>
    
    <p class="event-name">${event.name}</p>
    <p class="event-duration">${formatDate(event.startDate)} - ${formatDate(event.endDate)}</p>
    <p class="event-location">${event.state} - ${event.country}</p>
    <p class="event-deadline">Deadline: ${formatDate(event.deadline)}</p>
    ${button}
  `;
  upcomingEvents.appendChild(eventDiv);
});
