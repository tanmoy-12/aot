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
  const height =
    document.documentElement.scrollHeight - document.documentElement.clientHeight;
  
  window.addEventListener('scroll', () => {
    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;
    scrollProgress.style.width = `${(scrollTop / height) * 100}%`;
  });


// Function to handle scroll event to decrease grayscale of the campus image on scrolling
function handleScroll() {
    // Calculate the scroll position relative to the viewport
    const scrollPosition = window.scrollY;
    // Get the height of the viewport
    const viewportHeight = window.innerHeight;
    // Calculate the distance from the top of the image to the bottom of the viewport
    const imageOffsetTop = document.querySelector('.campus-image').offsetTop;
    const distanceToImage = imageOffsetTop - scrollPosition;
    // Calculate the maximum grayscale value (100%)
    const maxGrayscale = 100;
    // Calculate the grayscale percentage based on the distance to the image
    let grayscalePercentage = (distanceToImage / viewportHeight) * maxGrayscale;
    grayscalePercentage = Math.min(Math.max(grayscalePercentage, 0), maxGrayscale)-20; // Clamp between 0% and 100%
    // Apply the grayscale filter to the image
    const imgElement = document.querySelector('.campus-image');
    imgElement.style.filter = `grayscale(${grayscalePercentage}%)`;
}
// Attach scroll event listener to the window
window.addEventListener('scroll', handleScroll);
// Initial call to handleScroll function to set the initial grayscale based on page load position
handleScroll();

//To scroll upcoming events infinitely
