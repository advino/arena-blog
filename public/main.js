const choo = require('choo');
const html = require('choo/html');

let app = choo({hash: true});
app.route('/', mainView);
app.route('#hello', secondView);
app.route('#hello/:name', secondView);



app.mount('body');
app.use((state, emitter) => {

    state.title = null;
    state.owner = {full_name: null};
    state.contents = [];
    state.current = null;

    emitter.on('navigate', () => {
        console.log(`Navigated to state: ${state.route}`);
    });

    emitter.on('DOMContentLoaded', () => {

        window.fetch('https://api.are.na/v2/channels/abstract-deities')
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            state.title = result.title;
            state.owner = result.owner;
            state.contents = result.contents;
            state.current = result.contents[0].image.square.url;
            console.log(state);

            emitter.emit('render');
        });
    });

    emitter.on('click', data => {

        console.log('Item clicked', data);
        let item = state.contents.find(item => {

            return item.id == data;
        });

        state.current = item.image.square.url;

        emitter.emit('render');
    });
});

function mainView(state, emit) {
    console.log(state.params);
    return html `
    <body>
        <div class="two-col">
            <div class="col">
                <div class="header">
                    <span>${state.title}</span>
                    <span>${state.owner.full_name}</span>
                </div>
                <div class="list">
                    ${
                        state.contents.map(i => {
                            return listItem(i, emit);
                        })
                    }
                </div>
            </div>
            <div class="col">
                <div class="view">
                    <img src="${state.current}}">
                </div>
            </div>
        </div>
    </body>
    `
}

function secondView(state) {

    console.log(state.params);
    
    return html `
    <body>
        Second View!
    </body>
    `
}

function listItem(item, emit) {
    return html `
        <div onclick="${() => { emit('click', item.id)}}">
            <span>${item.title}</span>
            <span>${item.created_at}</span>
        </div>
    `
}