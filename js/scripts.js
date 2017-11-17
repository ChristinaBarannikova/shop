const Dispatcher = document.getElementById('doc');
let selectedLi;
class PropertySelector {
    constructor(el) {
        this.el = el;
        this.el.addEventListener('click', ev => {
            const type = ev.target.dataset['type'];
            const value = ev.target.dataset['value'];
            const target = ev.target;
            this.dispatchEvent(type, value);

            if (target.tagName != 'LABEL') return;
            setBorder(target);
        });
    }

    dispatchEvent(type, value) {
        const event = new CustomEvent('property-selected', {
            detail: {
                type: type,
                value: value
            }
        });
        // Pub/Sub
        Dispatcher.dispatchEvent(event);
    }
}
Dispatcher.addEventListener('property-selected', ev => {
    const data = ev.detail;

    if (data.type === 'color') {
        changePicture(data.value);

    }
});

function setBorder(node) {
    if (selectedLi) {
        selectedLi.classList.remove('border');
    }
    selectedLi = node;
    selectedLi.classList.add('border');
}

function changePicture(color) {
    document.getElementById('productPicture').src = 'img/tshirts/tshirt_' + color + '.jpg';
}

new PropertySelector(document.getElementById('colorList'));
new PropertySelector(document.getElementById('sizeList'));
