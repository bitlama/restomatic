(function () {
    var RESET_DELAY = 1500;

    function fallbackCopy(text) {
        var previous = document.activeElement;
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.top = '-1000px';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();

        var copied = false;
        try {
            copied = document.execCommand('copy');
        } catch (e) {
            copied = false;
        }

        document.body.removeChild(textarea);
        if (previous && typeof previous.focus === 'function') {
            previous.focus();
        }
        return copied;
    }

    function copy(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(text).then(function () {
                return true;
            }, function () {
                return fallbackCopy(text);
            });
        }
        return Promise.resolve(fallbackCopy(text));
    }

    function enhance(pre, code, status) {
        var wrapper = document.createElement('div');
        wrapper.className = 'code-block';
        pre.parentNode.insertBefore(wrapper, pre);
        wrapper.appendChild(pre);

        var button = document.createElement('button');
        button.type = 'button';
        button.className = 'copy-button';
        button.textContent = 'Copy';
        wrapper.appendChild(button);

        var timer = null;
        button.addEventListener('click', function () {
            copy(code.textContent).then(function (copied) {
                button.textContent = copied ? 'Copied' : 'Copy failed';
                status.textContent = copied ? 'Copied to clipboard' : 'Copy failed';
                clearTimeout(timer);
                timer = setTimeout(function () {
                    button.textContent = 'Copy';
                }, RESET_DELAY);
            });
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        var status = document.createElement('span');
        status.className = 'visually-hidden';
        status.setAttribute('role', 'status');
        status.setAttribute('aria-live', 'polite');
        document.body.appendChild(status);

        var snippets = document.querySelectorAll('pre');
        Array.prototype.forEach.call(snippets, function (pre) {
            if (pre.parentNode && pre.parentNode.classList.contains('code-block')) {
                return;
            }
            var code = null;
            for (var child = pre.firstElementChild; child; child = child.nextElementSibling) {
                if (child.tagName === 'CODE') {
                    code = child;
                    break;
                }
            }
            if (code) {
                enhance(pre, code, status);
            }
        });
    });
})();
