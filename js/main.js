document.addEventListener('DOMContentLoaded', () => {

    // Filter Works
    const filterBtns = document.querySelectorAll('.filter-item');
    const workItems = document.querySelectorAll('.work-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            workItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

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

    galleryItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            const img = item.querySelector('img');
            if (img) {
                modal.style.display = "flex"; // Changed from block to flex
                modalImg.src = img.src;

                // Get title from card info
                const title = item.querySelector('.card-info h3').innerText;
                const desc = item.querySelector('.card-info p').innerText;
                captionText.innerHTML = `<strong>${title}</strong><br>${desc}`;
            }
        });
    });

    if (closeBtn) {
        closeBtn.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close when clicking outside the image (Better Mobile Support)
    modal.addEventListener('click', function (event) {
        // If the clicked element is the modal container itself (not the image or caption)
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
