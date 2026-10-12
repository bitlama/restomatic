(function () {
    var KEY = 'restomatic-theme';
    var root = document.documentElement;
    var btn = document.querySelector('.theme-toggle');
    if (!btn) return;

    function systemTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function current() {
        return root.dataset.theme || systemTheme();
    }

    function store(theme) {
        try {
            localStorage.setItem(KEY, theme);
        } catch (e) { /* storage unavailable */ }
    }

    function update() {
        var dark = current() === 'dark';
        btn.classList.toggle('is-dark', dark);
        btn.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    }

    btn.addEventListener('click', function () {
        var next = current() === 'dark' ? 'light' : 'dark';
        root.dataset.theme = next;
        store(next);
        update();
    });

    update();
})();
