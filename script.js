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
