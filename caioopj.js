(function () {
    'use strict';

    console.log('[UnlockCopy] Carregado');

    function unlockElement(el) {
        if (!(el instanceof HTMLElement)) return;

        // Remove handlers inline
        [
            'oncopy',
            'oncut',
            'onpaste',
            'oncontextmenu',
            'onselectstart',
            'ondragstart'
        ].forEach(attr => {
            try {
                el[attr] = null;
                el.removeAttribute(attr);
            } catch {}
        });

        // Remove bloqueios CSS
        try {
            el.style.setProperty('user-select', 'text', 'important');
            el.style.setProperty('-webkit-user-select', 'text', 'important');
            el.style.setProperty('-moz-user-select', 'text', 'important');
            el.style.setProperty('-ms-user-select', 'text', 'important');
            el.style.setProperty('-webkit-touch-callout', 'default', 'important');
        } catch {}
    }

    function unlockAll() {
        unlockElement(document.documentElement);
        unlockElement(document.body);

        document.querySelectorAll('*').forEach(unlockElement);
    }

    // Apenas remove preventDefault() para eventos relacionados à cópia.
    ['copy', 'cut', 'paste', 'contextmenu', 'selectstart'].forEach(type => {
        document.addEventListener(type, event => {
            event.stopImmediatePropagation();
        }, true);
    });

    // Reaplica quando novos elementos aparecem.
    const observer = new MutationObserver(mutations => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType !== 1) return;

                unlockElement(node);

                if (node.querySelectorAll) {
                    node.querySelectorAll('*').forEach(unlockElement);
                }
            });
        }
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });

    unlockAll();

    // Alguns sites recriam o DOM; reaplica ocasionalmente.
    setInterval(unlockAll, 3000);

    console.log('[UnlockCopy] Proteções removidas.');
})();