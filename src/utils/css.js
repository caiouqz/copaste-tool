const CSS = {

    inject(id, css) {

        if (document.getElementById(id))
            return;

        const style = document.createElement("style");

        style.id = id;

        style.textContent = css;

        document.head.appendChild(style);

    },

    remove(id) {

        document.getElementById(id)?.remove();

    },

    exists(id) {

        return !!document.getElementById(id);

    }

};