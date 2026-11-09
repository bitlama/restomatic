(function () {
    function openLinkedAnswer() {
        var id = window.location.hash.slice(1);
        if (!id) return;
        var target = document.getElementById(id);
        if (!target || target.tagName !== 'DETAILS') return;
        if (!target.classList.contains('faq-item')) return;
        target.open = true;
    }

    openLinkedAnswer();
    window.addEventListener('hashchange', openLinkedAnswer);
})();
