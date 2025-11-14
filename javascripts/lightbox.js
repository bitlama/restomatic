document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const screenshotImgs = document.querySelectorAll('.screenshot-img');

    // Open modal when clicking on a screenshot
    screenshotImgs.forEach(function(img) {
        img.addEventListener('click', function() {
            modal.classList.add('show');
            modalImg.src = this.src;
            captionText.textContent = this.alt;
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    });

    // Close modal when clicking the close button
    closeBtn.addEventListener('click', function() {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        document.body.style.overflow = ''; // Restore scrolling
    }
});

