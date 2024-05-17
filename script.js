function showSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'flex';
    }

    function hideSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.style.display = 'none';
    }

//JS Function to control dropdown services
document.addEventListener('DOMContentLoaded', function() {
    const dropdownServices = document.querySelectorAll('.dropdown-services');
  
    dropdownServices.forEach(function(dropdown) {
        const arrowIcon = dropdown.querySelector('.arrow-icon');
  
        dropdown.addEventListener('mouseenter', function() {
            if (arrowIcon) {
                arrowIcon.classList.add('rotate-up');
            }
        });
        dropdown.addEventListener('mouseleave', function() {
            if (arrowIcon) {
                arrowIcon.classList.remove('rotate-up');
            }
        });
    });
  });

// Function to toggle the dropdown menu visibility
function toggleDropdown(id) {
    var dropdown = document.getElementById("mobile-dropdown-" + id);
    dropdown.style.display = (dropdown.style.display === "block") ? "none" : "flex";
}

// Function to toggle the visibility of sub-dropdowns
function toggleSubDropdown(parentId) {
    var subDropdown = document.querySelector('#' + parentId + ' .sub-dropdowns');
    subDropdown.style.display = (subDropdown.style.display === "block") ? "none" : "flex";
}
  
// Array of event data
const events = [
    {
        time: "7:00 PM, April 24th",
        description: "Connect with employers looking to hire students for internships and full-time positions. Bring your resume!"
    },
    {
        time: "6:30 PM, May 5th",
        description: "Join us for a networking session with industry professionals. Expand your professional network."
    },
    {
        time: "8:00 AM, June 10th",
        description: "Kickstart your day with a wellness seminar. Learn practical tips for maintaining work-life balance."
    },
    {
        time: "12:00 PM, June 20th",
        description: "Lunch and learn session on the latest trends in technology. Free pizza for attendees!"
    }
];

// Access the event slider container
const eventSlider = document.querySelector('.event-slider');

// Loop through the events array to create event content
events.forEach((event) => {
    // Create a new event content div
    const eventContent = document.createElement('div');
    eventContent.classList.add('event-content');

    // Create and set the time (h5 element)
    const timeHeading = document.createElement('h5');
    timeHeading.textContent = event.time;
    eventContent.appendChild(timeHeading);

    // Create and set the description (p element)
    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = event.description;
    eventContent.appendChild(descriptionParagraph);

    // Append the event content to the event slider
    eventSlider.appendChild(eventContent);
});


const announcements = [
    "Stay tuned for upcoming events and promotions.",
    "Career Services is hosting a resume workshop on March 20th to help you prepare for job hunting.",
    "Join our environmental club and help make our campus more sustainable.",
    "Need tutoring assistance? Visit the Student Learning Center for free tutoring services in various subjects.",
    "The campus gym will have extended hours during finals week to accommodate student schedules.",
    "The library will be closed for renovations from June 1st to June 15th."
];

const announcementContainer = document.getElementById('announcementContainer');

// Function to populate announcements
function populateAnnouncements() {
    announcementContainer.innerHTML = ''; // Clear existing content
    announcements.forEach(announcement => {
        const announcementContent = document.createElement('div');
        announcementContent.classList.add('announcement-content');

        const arrowIcon = document.createElement('div');
        arrowIcon.classList.add('announcement-content-l');
        arrowIcon.innerHTML = '<i class="fas fa-arrow-right"></i>'; // Font Awesome arrow icon
        announcementContent.appendChild(arrowIcon);

        const announcementText = document.createElement('div');
        announcementText.classList.add('announcement-content-r');
        announcementText.innerHTML = `<p>${announcement}</p>`;
        announcementContent.appendChild(announcementText);

        announcementContainer.appendChild(announcementContent);
    });
}

// Call function to populate announcements on page load
populateAnnouncements();
  
  //JS Function to show incremental animation for number of faculties,students & staffs
  document.addEventListener('DOMContentLoaded', function() {
    const studentsCountElement = document.getElementById('studentsCount');
    const facultyCountElement = document.getElementById('facultyCount');
    const staffCountElement = document.getElementById('staffCount');
    // Final values for each category
    const finalStudentsCount = 2300;
    const finalFacultyCount = 80;
    const finalStaffCount = 120;
    // Animation duration (in milliseconds)
    const animationDuration = 2000; // 2000 milliseconds (2 seconds)
    // Calculate increment step for each category
    const studentsIncrement = finalStudentsCount / animationDuration;
    const facultyIncrement = finalFacultyCount / animationDuration;
    const staffIncrement = finalStaffCount / animationDuration;
    // Function to update the count gradually with formatting
    function updateCount(element, finalValue, increment) {
        let currentValue = 0;
        const startTime = performance.now();
        function update() {
            const currentTime = performance.now();
            const elapsedTime = currentTime - startTime;
  
            if (elapsedTime >= animationDuration) {
                // Animation complete, display final value
                element.textContent = finalValue.toLocaleString() + '+';
            } else {
                // Calculate current value based on elapsed time
                currentValue = Math.min(finalValue, Math.floor(increment * elapsedTime));
                element.textContent = currentValue.toLocaleString() + '+';
  
                // Continue updating until animation duration is reached
                requestAnimationFrame(update);
            }
        }
        // Start the animation
        requestAnimationFrame(update);
    }
    // Intersection Observer to trigger animation when element comes into view
    const options = {
        threshold: 0.5 // Trigger animation when 50% of the element is in view
    };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in view, start the number animation
                updateCount(studentsCountElement, finalStudentsCount, studentsIncrement);
                updateCount(facultyCountElement, finalFacultyCount, facultyIncrement);
                updateCount(staffCountElement, finalStaffCount, staffIncrement);
  
                // Disconnect observer after triggering animation once
                observer.disconnect();
            }
        });
    }, options);
    // Observe the target element (e.g., .customer) when it comes into view
    const targetElement = document.querySelector('.customer');
    if (targetElement) {
        observer.observe(targetElement);
    }
  });
  

//JS Function to animate scrolling top recruiters logos
  function startInfiniteScroll() {
      const sliderTrack = document.querySelector('.slider-track');
      const sliderItems = document.querySelectorAll('.slider-item');
      const slideWidth = sliderItems[0].offsetWidth + parseInt(window.getComputedStyle(sliderItems[0]).marginRight);
  
      // Clone only visible items (within the viewport)
      const visibleItems = Array.from(sliderItems).slice(0, Math.ceil(window.innerWidth / slideWidth));
      const clonedItems = visibleItems.map(item => item.cloneNode(true));
  
      // Append cloned items to the end of the track
      clonedItems.forEach(clone => sliderTrack.appendChild(clone));
  
      // Set width of slider track to fit all items
      sliderTrack.style.width = `${slideWidth * (sliderItems.length + clonedItems.length)}px`;
  
      // Animation to continuously scroll the slider
      let pos = 0;
      function scroll() {
          pos -= 1; // Adjust scroll speed here
          sliderTrack.style.transform = `translateX(${pos}px)`;
  
          // Reset position to start once first set of items is off-screen
          if (pos <= -slideWidth * sliderItems.length) {
              pos = 0;
              sliderTrack.style.transition = 'none'; // Disable transition for immediate reset
              requestAnimationFrame(() => {
                  sliderTrack.style.transform = `translateX(${pos}px)`;
                  sliderTrack.style.transition = ''; // Re-enable transition
              });
          }
  
          requestAnimationFrame(scroll);
      }
      scroll(); // Start scrolling animation
  }
  // Start the infinite scrolling when the page loads
  window.addEventListener('load', () => {
      startInfiniteScroll();
  });
  
  //JS Function to show answers of FAQ question on clicking '+' icon
  const items = document.querySelectorAll('.faq button');

function togglefaq() {
  const itemToggle = this.getAttribute('aria-expanded');

  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }

  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

items.forEach((item) => item.addEventListener('click', togglefaq));




  
  //JS Function to control functionality of the progress bar
  const scrollProgress = document.getElementById('scroll-progress');
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  window.addEventListener('scroll', () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
        scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  });




  const eventTableBody = document.getElementById('eventTableBody');
  const announcementTableBody = document.getElementById('announcementTableBody');
  const captchaContainer = document.getElementById('captchaContainer');
  const captchaInput = document.getElementById('captchaInput');

  // Generate random CAPTCHA
  function generateCaptcha() {
      const captcha = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit random number
      captchaContainer.textContent = `Enter CAPTCHA: ${captcha}`;
      return captcha.toString();
  }

  // Function to populate events table
  function populateEventsTable() {
      eventTableBody.innerHTML = '';
      events.forEach((event, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${event.time}</td>
              <td>${event.description}</td>
              <td><button onclick="removeEvent(${index}, 'event')">Remove</button></td>
          `;
          eventTableBody.appendChild(row);
      });
  }

  // Function to populate announcements table
  function populateAnnouncementsTable() {
      announcementTableBody.innerHTML = '';
      announcements.forEach((announcement, index) => {
          const row = document.createElement('tr');
          row.innerHTML = `
              <td>${announcement}</td>
              <td><button onclick="removeEvent(${index}, 'announcement')">Remove</button></td>
          `;
          announcementTableBody.appendChild(row);
      });
  }

  // Function to remove event (either event or announcement) from array and update table
  function removeEvent(index, type) {
      if (type === 'event') {
          events.splice(index, 1);
          populateEventsTable();
      } else if (type === 'announcement') {
          announcements.splice(index, 1);
          populateAnnouncementsTable();
      }
  }

  // Function to add event (either event or announcement) to array and update table
  function addEvent(content, type) {
      if (type === 'event') {
          events.push(content);
          populateEventsTable();
      } else if (type === 'announcement') {
          announcements.push(content);
          populateAnnouncementsTable();
      }
  }

  // Show admin popup on button click
  document.getElementById('adminButton').addEventListener('click', function() {
      document.getElementById('adminPopup').style.display = 'flex';
      generateCaptcha(); // Generate new CAPTCHA on popup display
  });

        

  // Handle admin login and show admin actions
document.getElementById('loginButton').addEventListener('click', function() {
    const enteredPassword = document.getElementById('adminPassword').value;
    const enteredCaptcha = captchaInput.value;
    const expectedCaptcha = captchaContainer.textContent.split(':')[1].trim();
    
    if (enteredPassword === 'admin' && enteredCaptcha === expectedCaptcha) {
        // Store logged-in state in localStorage
        localStorage.setItem('isAdminLoggedIn', 'true');

        // Hide login section and show admin actions
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('adminActions').style.display = 'block';
        populateEventsTable();
        populateAnnouncementsTable();
    } else {
        alert('Incorrect password or CAPTCHA. Please try again.');
        generateCaptcha(); // Regenerate CAPTCHA on incorrect input
        captchaInput.value = ''; // Clear input fields
    }
});

// Handle logout button click to clear logged-in state
document.getElementById('logoutButton').addEventListener('click', function() {
    // Remove logged-in state from localStorage
    localStorage.removeItem('isAdminLoggedIn');

    // Show login section and hide admin actions
    document.getElementById('loginSection').style.display = 'flex';
    document.getElementById('adminActions').style.display = 'none';
    document.getElementById('adminPopup').style.display = 'none'; // Hide admin popup
    document.getElementById('adminPassword').value = ''; // Clear password input
    captchaInput.value = ''; // Clear CAPTCHA input
});

  // Handle add event button click
  document.getElementById('addEventButton').addEventListener('click', function() {
      const newEventTime = prompt('Enter event time:');
      const newEventDescription = prompt('Enter event description:');
      if (newEventTime && newEventDescription) {
          const newEvent = { time: newEventTime, description: newEventDescription };
          addEvent(newEvent, 'event');
      }
  });

  // Handle add announcement button click
  document.getElementById('addAnnouncementButton').addEventListener('click', function() {
      const newAnnouncement = prompt('Enter new announcement:');
      if (newAnnouncement) {
          addEvent(newAnnouncement, 'announcement');
      }
  });

  // Handle save events button click (if needed)
  document.getElementById('saveEventsButton').addEventListener('click', function() {
      // Implement logic to save events (if needed)
      alert('Events saved successfully!');
  });

  // Handle save announcements button click (if needed)
  document.getElementById('saveAnnouncementsButton').addEventListener('click', function() {
      // Implement logic to save announcements (if needed)
      alert('Announcements saved successfully!');
  });

//Read More Button
function toggleReadMore() {
    const readAbout = document.getElementById('read-about');
    const readMoreBtn = document.querySelector('.read-more-btn');
    
    if (readAbout.style.display === 'none' || readAbout.style.display === '') {
        readAbout.style.display = 'inline';
        readMoreBtn.textContent = 'Read Less';
    } else {
        readAbout.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
    }
}
// Typing animation logic
document.addEventListener('DOMContentLoaded', function() {
    const typingTextElement = document.getElementById('typing-text');
    const texts = ["keywords", "Quick Links", "Faculty Name", "Faculty Age"];
    let textIndex = 0;
    let charIndex = 0;
    const typingSpeed = 100;
    const erasingSpeed = 50;
    const delayBetweenTexts = 2000;

    function typeText() {
        if (charIndex < texts[textIndex].length) {
            typingTextElement.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeText, typingSpeed);
        } else {
            setTimeout(eraseText, delayBetweenTexts);
        }
    }

    function eraseText() {
        if (charIndex > 0) {
            typingTextElement.textContent = texts[textIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(eraseText, erasingSpeed);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            setTimeout(typeText, typingSpeed);
        }
    }

    setTimeout(typeText, delayBetweenTexts);
});

// Search functionality
async function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';

    if (searchInput === '') {
        searchResults.innerHTML = 'Please enter a search term.';
        return;
    }

    // Check if the input is a URL
    if (isValidURL(searchInput)) {
        window.location.href = searchInput;
        return;
    }

    try {
        const response = await fetch('facultyData.json');
        const data = await response.json();
        const results = data.filter(item => Object.values(item).some(value => value.toLowerCase().includes(searchInput.toLowerCase())));

        if (results.length > 0) {
            results.forEach(result => {
                const resultItem = document.createElement('div');
                resultItem.innerHTML = `<strong>${result.Name}</strong><br>${result.Designation}<br>${result["Highest Qualification"]}<br>${result.Experience}`;
                searchResults.appendChild(resultItem);
            });
        } else {
            searchResults.innerHTML = 'Results Not Found';
        }
    } catch (error) {
        searchResults.innerHTML = 'Error fetching data';
    }
}

function isValidURL(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

function closeSearchPopup() {
    document.getElementById('searchPopup').style.display = 'none';
}