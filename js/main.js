document.addEventListener('DOMContentLoaded', () => {

    // Filter Works code removed (Split sections implemented)

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
        });

        // Close menu when a link is clicked
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mainNav.classList.remove('active');
            });
        });
    }

    // Lightbox Modal Logic
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("modal-img");
    const captionText = document.getElementById("caption");
    const closeBtn = document.getElementsByClassName("close")[0];
    const galleryItems = document.querySelectorAll('.work-card');

    const closeModal = () => {
        modal.style.display = "none";
        document.body.classList.remove('no-scroll');
    };

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            // Do not open lightbox for Games (let the link works)
            if (item.getAttribute('data-category') === 'game') {
                return;
            }

            e.preventDefault(); // Prevent default link behavior
            const img = item.querySelector('img');
            if (img) {
                modal.style.display = "flex"; // Changed from block to flex
                document.body.classList.add('no-scroll'); // Lock scroll
                modalImg.src = img.src;

                // Get title from card info
                const title = item.querySelector('.card-info h3').innerText;
                const desc = item.querySelector('.card-info p').innerText;
                captionText.innerHTML = `<strong>${title}</strong><br>${desc}`;
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = closeModal;
    }

    // Close when clicking outside the image (Better Mobile Support)
    modal.addEventListener('click', function (event) {
        // Close if the click is NOT on the image itself
        // (Allows closing when clicking background, caption, or gap)
        if (!event.target.closest('.modal-content')) {
            closeModal();
        }
    });
});
