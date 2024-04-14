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



let scrollcontainer = document.querySelector(".slider-track-news");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollcontainer.addEventListener("wheel",(evt => {
    evt.preventDefault();
    scrollcontainer.scrollLeft += evt.deltaY;
}))

backBtn.addEventListener("click",()=>{
    scrollcontainer.style.scrollBehavior = "smooth";
    scrollcontainer.scrollLeft -= 307;
})

nextBtn.addEventListener("click",()=>{
    scrollcontainer.style.scrollBehavior = "smooth";
    scrollcontainer.scrollLeft += 307;
})



function autoScroll() {
    const container = document.querySelector('.event-slider');
    const children = container.querySelectorAll('.event-content');

    if (children.length === 0) {
        return; // No content to scroll
    }

    let currentChildIndex = 0;
    const totalChildren = children.length;
    const scrollStep = 1; // Adjust this value for scroll speed
    const intervalTime = 20; // Interval time for smooth scrolling (in milliseconds)
    const pixelsPerInterval = 1; // Number of pixels to scroll per interval

    let lastTimestamp = performance.now();
    let accumulatedTime = 0;

    function animateScroll(timestamp) {
        const delta = timestamp - lastTimestamp;
        accumulatedTime += delta;

        if (accumulatedTime >= intervalTime) {
            accumulatedTime = 0;

            const currentChild = children[currentChildIndex];
            const childHeight = currentChild.offsetHeight;
            const containerHeight = container.offsetHeight;

            container.scrollTop += pixelsPerInterval;

            if (container.scrollTop >= childHeight) {
                container.scrollTop = 0; // Reset to the top

                currentChildIndex++;
                if (currentChildIndex >= totalChildren) {
                    currentChildIndex = 0; // Reset to the first child
                }
            }
        }

        lastTimestamp = timestamp;
        requestAnimationFrame(animateScroll);
    }

    requestAnimationFrame(animateScroll);

    // Pause scrolling when hovering over the container
    container.addEventListener('mouseenter', () => {
        accumulatedTime = 0; // Reset accumulated time
    });

    // Resume scrolling when not hovering
    container.addEventListener('mouseleave', () => {
        lastTimestamp = performance.now(); // Reset last timestamp
    });
}

// Call the autoScroll function when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    autoScroll();
});



document.addEventListener("DOMContentLoaded", function () {
    const questionToggles = document.querySelectorAll(".question-toggle");

    questionToggles.forEach((toggle) => {
        toggle.addEventListener("click", () => {
            const parent = toggle.parentNode;
            const answerText = parent.querySelector(".answer-text");
            const isActive = parent.classList.contains("active");

            // Close all other questions
            closeAllQuestions();

            if (!isActive) {
                parent.classList.add("active");
                toggle.textContent = "-";
            } else {
                parent.classList.remove("active");
                toggle.textContent = "+";
            }
        });
    });

    function closeAllQuestions() {
        const allQuestions = document.querySelectorAll(".faq-question");
        allQuestions.forEach((question) => {
            question.classList.remove("active");
            const toggle = question.querySelector(".question-toggle");
            toggle.textContent = "+";
        });
    }
});
