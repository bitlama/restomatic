document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const captionText = document.getElementById('lightbox-caption');
    const closeBtn = document.querySelector('.lightbox-close');
    const triggers = document.querySelectorAll('.screenshot-trigger');

    if (!modal || !modalImg || !captionText || !closeBtn) {
        return;
    }

    let lastFocused = null;

    triggers.forEach(function(trigger) {
        trigger.addEventListener('click', function() {
            const img = trigger.querySelector('img');
            if (!img) {
                return;
            }

            lastFocused = trigger;
            modalImg.src = img.src;
            modalImg.alt = img.alt;
            captionText.textContent = trigger.dataset.caption || img.alt;
            modal.classList.add('show');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            closeBtn.focus();
        });
    });

    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('show')) {
            return;
        }

        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'Tab') {
            // Only the close button is focusable inside the dialog.
            e.preventDefault();
            closeBtn.focus();
        }
    });

    function closeModal() {
        modal.classList.remove('show');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (lastFocused) {
            lastFocused.focus();
            lastFocused = null;
        }
    }
});
