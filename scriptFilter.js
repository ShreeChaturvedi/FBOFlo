document.addEventListener('DOMContentLoaded', function() {
    generateFBOs();
    createFilterBubbles();
    displayRandomFBOs();
});

const fboAttributes = {
    names: ["JetStream Services", "Premier Aviation", "Gateway Aviation", "Summit Aero", "Pinnacle Aviation", "Executive Jet Services", "Skyway Aviation", "AeroSolutions", "Flightline FBO", "Global Gate Aviation", "Direct Flight FBOs", "AeroPark Services", "BlueSky Aviation", "Crosswind Aviation", "JetSet FBO", "First Class Aviation", "Flight Path Services", "Runway Aviation", "Elite Aero Services", "Aviation Gateway", "Terminal One Aviation", "Skyport Aviation", "Hangar Hub", "Flight Deck FBO", "Navigator Aviation", "Windward Aviation", "Clear Sky FBO", "Airfield Services", "Aviator’s Landing", "Propeller Aviation", "Skyward Base", "Horizon Hangars", "Pilot's Paradise", "Elevation Station", "Landing Lounge"],
    locations: ["Los Angeles, CA", "San Francisco, CA", "San Diego, CA", "Las Vegas, NV", "Phoenix, AZ", "Seattle, WA", "Portland, OR", "Denver, CO", "Salt Lake City, UT", "Boise, ID", "Albuquerque, NM", "Dallas, TX", "Houston, TX", "Austin, TX", "San Antonio, TX", "Oklahoma City, OK", "Kansas City, MO", "St. Louis, MO", "Minneapolis, MN", "Chicago, IL", "Detroit, MI", "Indianapolis, IN", "Columbus, OH", "Cleveland, OH", "Pittsburgh, PA", "Philadelphia, PA", "New York, NY", "Boston, MA", "Washington, DC", "Baltimore, MD", "Richmond, VA", "Raleigh, NC", "Charlotte, NC", "Atlanta, GA", "Miami, FL", "Orlando, FL", "Tampa, FL", "Jacksonville, FL", "New Orleans, LA", "Nashville, TN", "Memphis, TN", "Louisville, KY", "Cincinnati, OH", "Milwaukee, WI", "Des Moines, IA", "Omaha, NE", "Sioux Falls, SD", "Fargo, ND", "Billings, MT", "Cheyenne, WY", "Helena, MT", "Bozeman, MT", "Rapid City, SD", "Bismarck, ND", "Grand Forks, ND", "Duluth, MN", "Marquette, MI", "Sault Ste. Marie, MI", "Thunder Bay, ON"],
    // addresses should correspond to the locations above in the same order
    // addresses should be longer, including street address, city, county, state, and zip code
    addresses: [
        "1234 Sky High Blvd, Los Angeles, Los Angeles, CA 90001",
        "5678 Cloud Nine St, San Francisco, San Francisco, CA 94101",
        "9101 Ace Ave, San Diego, San Diego, CA 92101",
        "2345 Eagle's Nest Rd, Las Vegas, Clark, NV 89101",
        "6789 Horizon Dr, Phoenix, Maricopa, AZ 85001",
        "1234 Atlas Blvd, Seattle, King, WA 98101",
        "5678 Mercury St, Portland, Multnomah, OR 97201",
        "9101 Apollo Ave, Denver, Denver, CO 80201",
        "2345 Neptune Rd, Salt Lake City, Salt Lake, UT 84101",
        "6789 Jupiter Dr, Boise, Ada, ID 83701",
        "1234 Saturn Blvd, Albuquerque, Bernalillo, NM 87101",
        "5678 Orion St, Dallas, Dallas, TX 75201",
        "9101 Pegasus Ave, Houston, Harris, TX 77001",
        "2345 Andromeda Rd, Austin, Travis, TX 73301",
        "6789 Galaxy Dr, San Antonio, Bexar, TX 78201",
        "1234 Cosmos Blvd, Oklahoma City, Oklahoma, OK 73101",
        "5678 Meteor St, Kansas City, Jackson, MO 64101",
        "9101 Comet Ave, St. Louis, St. Louis, MO 63101",
        "2345 Starlight Rd, Minneapolis, Hennepin, MN 55401",
        "6789 Nova Dr, Chicago, Cook, IL 60601",
        "1234 Lunar Blvd, Detroit, Wayne, MI 48201",
        "5678 Solar St, Indianapolis, Marion, IN 46201",
        "9101 Venus Ave, Columbus, Franklin, OH 43201",
        "2345 Mars Rd, Cleveland, Cuyahoga, OH 44101",
        "6789 Vortex Dr, Pittsburgh, Allegheny, PA 15201",
        "1234 Nimbus Blvd, Philadelphia, Philadelphia, PA 19101",
        "5678 Stratos St, New York, New York, NY 10001",
        "9101 Aether Ave, Boston, Suffolk, MA 02101",
        "2345 Cirrus Rd, Washington, DC, District of Columbia 20001",
        "6789 Bolt Dr, Baltimore, Baltimore, MD 21201",
        "1234 Quasar Blvd, Richmond, Henrico, VA 23201",
        "5678 Zenith St, Raleigh, Wake, NC 27601",
        "9101 Sky High Blvd, Charlotte, Mecklenburg, NC 28201",
        "2345 Cloud Nine St, Atlanta, Fulton, GA 30301",
        "6789 Ace Ave, Miami, Miami-Dade, FL 33101",
        "1234 Eagle's Nest Rd, Orlando, Orange, FL 32801",
        "5678 Horizon Dr, Tampa, Hillsborough, FL 33601",
        "9101 Atlas Blvd, Jacksonville, Duval, FL 32201",
        "2345 Mercury St, New Orleans, Orleans Parish, LA 70101",
        "6789 Apollo Ave, Nashville, Davidson, TN 37201",
        "1234 Neptune Rd, Memphis, Shelby, TN 38101",
        "5678 Jupiter Dr, Louisville, Jefferson, KY 40201",
        "9101 Saturn Blvd, Cincinnati, Hamilton, OH 45201",
        "2345 Orion St, Milwaukee, Milwaukee, WI 53201",
        "6789 Pegasus Ave, Des Moines, Polk, IA 50301",
        "1234 Andromeda Rd, Omaha, Douglas, NE 68101",
        "5678 Galaxy Dr, Sioux Falls, Minnehaha, SD 57101",
        "9101 Cosmos Blvd, Fargo, Cass, ND 58101",
        "2345 Meteor St, Billings, Yellowstone, MT 59101",
        "6789 Comet Ave, Cheyenne, Laramie, WY 82001",
        "1234 Starlight Rd, Helena, Lewis and Clark, MT 59601",
        "5678 Nova Dr, Bozeman, Gallatin, MT 59701",
        "9101 Lunar Blvd, Rapid City, Pennington, SD 57701",
        "2345 Solar St, Bismarck, Burleigh, ND 58501",
        "6789 Vortex Dr, Grand Forks, Grand Forks, ND 58201",
        "1234 Nimbus Blvd, Duluth, St. Louis, MN 55801",
        "5678 Stratos St, Marquette, Marquette, MI 49801",
        "9101 Aether Ave, Sault Ste. Marie, Chippewa, MI 49701",
        "2345 Cirrus Rd, Thunder Bay, Thunder Bay District, ON P7A 1A1",
    ],
    fees: ["$200", "$250", "$300", "$350", "$400", "$500", "$600"],
    services: ["Maintenance", "Catering", "Shuttle", "Parking"],
    sizes: ["Small", "Medium", "Large"],
    hours: ["24/7", "0600 — 2200", "0500  — 2000"],
    distances: ["Short", "Nearby", "Far"],
    images: [
        "https://www.europair.com/storage/app/media/uploaded-files/1658395524896.jpeg",
        "https://images.squarespace-cdn.com/content/v1/5aee3c452487fd040c444dc8/1602559010311-ZYM8WJM2SSFRHRDAZTZV/FBO.jpg?format=2500w",
        "https://www.flyfxe.com/home/showpublishedimage/1872/637592715655030000",
        "https://s44876.pcdn.co/wp-content/uploads/2021/01/Standard-Aviation-50.jpg",
        "https://www.claylacy.com/wp-content/uploads/2017/11/FBO-Header.jpg",
        "https://modern-aviation.com/wp-content/uploads/2020/04/Modern-Aviation-FBO-Excellence.jpg",
        "https://www.ainonline.com/cdn-cgi/image/width=1200,format=webp,quality=95/https://backend.ainonline.com/sites/default/files/styles/fpsc_1200x630/public/2023-11/Rendering%20to%20Accompany%20Big%20Island%20Jet%20Center%20Sets%20Opening%20for%20Mid-December.jpg?h=208a028c&itok=PufRBtFG",
        "https://luisvidal.com/wp-content/uploads/FBO-ATLEXEC-14_web-scaled.jpg",
        "https://www.flynaples.com/wp-content/uploads/2020/10/NAPLES-AIRPORT-2014-1300x650.jpg"
    ],
};

let fboData = [];
let selectedFilters = new Set();

function generateFBOs() {
    // check if fbo data addresses are the same length as locations
    console.log(fboAttributes.addresses.length === fboAttributes.locations.length);
    console.log(fboAttributes.addresses.length);
    console.log(fboAttributes.locations.length);
    let n = 0;
    fboData = fboAttributes.names.map(name => ({
        name: name,
        location: fboAttributes.locations[locationID = Math.floor(Math.random() * fboAttributes.locations.length)],
        fees: fboAttributes.fees[Math.floor(Math.random() * fboAttributes.fees.length)],
        services: getRandomServices(),
        size: fboAttributes.sizes[Math.floor(Math.random() * fboAttributes.sizes.length)],
        hours: fboAttributes.hours[Math.floor(Math.random() * fboAttributes.hours.length)],
        distance: fboAttributes.distances[Math.floor(Math.random() * fboAttributes.distances.length)],
        // recycle the same 10 images in the same order (3 duplications for 30 FBOs)
        image: fboAttributes.images[n++ % 9],
        address: fboAttributes.addresses[locationID],
        priceBreakDown: ""
    }));

    /* loop over all names */
    let withFBO = document.querySelector('select.with-fbo-dropdown');
    fboData.forEach(fbo => {
        let option = document.createElement('option');
        option.value = fbo.name;
        option.textContent = fbo.name;
        withFBO.appendChild(option);
    });
}

function getRandomServices() {
    let servicesSet = new Set();
    while (servicesSet.size < 2 + Math.floor(Math.random() * 3)) {
        servicesSet.add(fboAttributes.services[Math.floor(Math.random() * fboAttributes.services.length)]);
    }
    servicesSet.add("Fuel");
    // sort the services alphabetically
    servicesSet = new Set(Array.from(servicesSet).sort());
    return Array.from(servicesSet).join(", ");
}

function displayRandomFBOs() {
    updateFBOGrid();
}

function updateFBOGrid() {
    let filteredData = fboData.filter(fbo => {
        return Array.from(selectedFilters).every(filter => {
            if (filter.category === 'Services') {
                return fbo.services.includes(filter.option);
            }
            return fbo[filter.category.toLowerCase()] === filter.option;
        });
    });

    const fboGrid = document.querySelector('.fbo-grid');
    fboGrid.innerHTML = '';
    filteredData.forEach(fbo => {
        const fboElement = document.createElement('div');
        fboElement.className = 'fbo-item';
        fboElement.style.backgroundImage = `url('${fbo.image}')`;
        fboElement.innerHTML = `
        <div class="wrapper">
            <h2 style="color: white; margin-top: 0">${fbo.name}</h2><p>
            <div class="fbo-card-info-row"><span class="material-symbols-outlined"> location_on </span> <b>Location:</b> ${fbo.location}</div>
            <div class="fbo-card-info-row"><span class="material-symbols-outlined"> credit_card </span> <b>Fees:</b> ${fbo.fees}</div>
            <div class="fbo-card-info-row"><span class="material-symbols-outlined">info</span> <b>Services:</b> <p>${fbo.services}</p></div>
            <div class="fbo-card-info-row"><span class="material-symbols-outlined">image</span> <b>Size:</b> ${fbo.size}</div>
            <div class="fbo-card-info-row"><span class="material-symbols-outlined">schedule</span> <b>Operating Hours:</b> ${fbo.hours}</div>
        </div>`;
        fboGrid.appendChild(fboElement);

        fboElement.onclick = () => displayFBODetails(fbo);
    });
}

function createFilterBubbles() {
    const filters = ['Distance', 'Price', 'Size', 'Services', 'Operating Hours'];
    const filterBar = document.querySelector('.filter-bar');
    filterBar.innerHTML = '';
    filters.forEach(filter => {
        const filterBubble = document.createElement('div');
        filterBubble.className = 'filter-bubble';
        filterBubble.textContent = filter;
        filterBubble.onclick = () => displayFilterOptions(filter);
        filterBar.appendChild(filterBubble);
    });
}

function displayFilterOptions(selectedFilter) {
    const optionsContainer = document.querySelector('.filter-options') || document.createElement('div');
    optionsContainer.className = 'filter-options';
    document.body.insertBefore(optionsContainer, document.querySelector('#comparability'));
    optionsContainer.innerHTML = '';

    const options = {
        'Distance': ['Short', 'Nearby', 'Far'],
        'Price': fboAttributes.fees,
        'Size': ['Small', 'Medium', 'Large'],
        'Services': fboAttributes.services,
        'Operating Hours': fboAttributes.hours
    };

    options[selectedFilter].forEach(option => {
        const isSelected = Array.from(selectedFilters).some(f => f.option === option && f.category === selectedFilter);
        if (!isSelected) {
            const optionBubble = document.createElement('div');
            optionBubble.className = 'option-bubble';
            optionBubble.textContent = option;
            optionBubble.onclick = () => {
                selectedFilters.add({ category: selectedFilter, option: option });
                displayFilterOptions(selectedFilter); // Refresh display
                updateFBOGrid(); // Update FBO display
            };
            optionsContainer.appendChild(optionBubble);
        }
    });

    // Display all selected filters at the start
    selectedFilters.forEach(filter => {
        if (filter.category === selectedFilter) {
            const optionBubble = document.createElement('div');
            optionBubble.className = 'option-bubble active-filter';
            optionBubble.textContent = filter.option;
            optionBubble.onclick = () => {
                selectedFilters.delete(filter);
                displayFilterOptions(selectedFilter); // Refresh display
                updateFBOGrid(); // Update FBO display
            };
            optionsContainer.insertBefore(optionBubble, optionsContainer.firstChild);
        }
    });
}

function displayFBODetails(fbo) {
    let title = document.querySelector('#fbo-details-title');
    let left = document.querySelector('.fbo-details-left');
    let location = document.querySelector('.fbo-details-location-text');
    let price = document.querySelector('.price-body');
    let services = document.querySelector('.services-body');
    let contactNumber = document.querySelector('.contact-number');
    let contactEmail = document.querySelector('.contact-email');
    let contactWebsite = document.querySelector('.contact-website');

    title.textContent = fbo.name;
    location.textContent = fbo.address;
    services.textContent = fbo.services;
    contactNumber.textContent = `+1 ${Math.floor(Math.random() * 1000000000).toString().padStart(10, '0')}`;
    contactEmail.textContent = `${fbo.name.replace(/ /g, '').toLowerCase()}@fbo.com`;
    contactWebsite.textContent = `www.${fbo.name.replace(/ /g, '').toLowerCase()}.com`;

    left.style.backgroundImage = `url('${fbo.image}')`;

    // we need a breakdown of the price by services. this will be generated dynamically
    fuelPrice = Math.floor(Math.random() * 3 + 3);
    maintenenacePrice = Math.floor(Math.random() * 100 + 100);
    shuttlePrice = Math.floor(Math.random() * 10 + 20);
    parkingPrice = Math.floor(Math.random() * 30 + 90);
    cateringPrice = Math.floor(Math.random() * 10 + 30);

    // remove the dollar sign from the fees and convert to a number
    extraFees = fbo.fees.slice(1);

    let priceBreakDown = "";
    if (fbo.services.includes("Fuel")) {
        priceBreakDown += `<p><b>Fuel:</b> $${fuelPrice} per gallon</p>`; // random price per gallon for fuel
    }
    if (fbo.services.includes("Maintenance")) {
        priceBreakDown += `<p><b>Maintenance:</b> $${maintenenacePrice} / hour</p>`; // random price per hour for maintenance
        extraFees -= maintenenacePrice; // 1 hour
    }
    if (fbo.services.includes("Catering")) {
        priceBreakDown += `<p><b>Catering:</b> $${cateringPrice} / person</p>`; // random price per person for catering
        extraFees -= cateringPrice * 4; // 4 people
    }
    if (fbo.services.includes("Shuttle")) {
        priceBreakDown += `<p><b>Shuttle:</b> $${shuttlePrice} / trip</p>`; // random price per trip for shuttle
        extraFees -= shuttlePrice * 2; // round trip
    }
    if (fbo.services.includes("Parking")) {
        priceBreakDown += `<p><b>Parking:</b> $${parkingPrice} / day</p>`; // random price per day for parking
        extraFees -= parkingPrice;
    }

    priceBreakDown += `<p><b>Extra (base) Fees:</b> $${extraFees}</p>`; // remaining fees
    price.innerHTML = priceBreakDown;

    let container = document.querySelector('.fbo-details-container');


    container.classList.toggle('hidden');
    document.querySelector('.overlay').classList.toggle('hidden');

    // play animation for the details container
    document.querySelector('.fbo-details-container').animate([
        { transform: 'scale(0.5)', opacity: 0 },
        { transform: 'scale(1)', opacity: 1 }
    ], {
        duration: 200,
        easing: 'ease-in-out'
    });
}