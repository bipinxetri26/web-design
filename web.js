
    const signInBtn = document.getElementById('signInBtn');
const signinPanel = document.getElementById('signinPanel');
const authPopup = document.getElementById('authPopup');
const closeAuth = document.getElementById('closeAuth');
const signInSignUpBtn = document.querySelector('.blue-button');

// Toggle Sign-In Panel
signInBtn.addEventListener('click', () => {
  signinPanel.style.display = signinPanel.style.display === 'block' ? 'none' : 'block';
});

// Open Auth Popup
signInSignUpBtn.addEventListener('click', () => {
  authPopup.style.display = 'flex';
});

// Close Auth Popup
closeAuth.addEventListener('click', () => {
  authPopup.style.display = 'none';
});

// Close when clicking outside the popup
window.addEventListener('click', (e) => {
  if (e.target === authPopup) {
    authPopup.style.display = 'none';
  }
});
const secondaryNavbar = document.getElementById('secondaryNavbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const triggerSection = document.getElementById('popularGamesSection'); // Adjust ID as needed

    if (triggerSection && scrollY >= triggerSection.offsetTop - 70) {
      secondaryNavbar.classList.remove('hidden');
    } else {
      secondaryNavbar.classList.add('hidden');
    }
  });

   document.querySelectorAll('.offer-header').forEach(header => {
            header.addEventListener('click', () => {
                const item = header.parentElement;
                item.classList.toggle('active');
                
                // Close other open items if needed
                // document.querySelectorAll('.offer-item').forEach(otherItem => {
                //     if (otherItem !== item) {
                //         otherItem.classList.remove('active');
                //     }
                // });
            });
        });

