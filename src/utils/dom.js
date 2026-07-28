const DOM = {

    create(tag, props = {}) {

        const el = document.createElement(tag);

        Object.assign(el, props);

        return el;

    },

    remove(id) {

        document.getElementById(id)?.remove();

    },

    exists(id) {

        return !!document.getElementById(id);

    },

    append(parent, child) {

        parent.appendChild(child);

    },

    qs(selector, root = document) {

        return root.querySelector(selector);

    },

    qsa(selector, root = document) {

        return [...root.querySelectorAll(selector)];

    }

};