const choo = require('choo');
const html = require('choo/html');

let { listItem, imageBlock, channelBlock, textBlock } = require('./components/items.js');

let app = choo({hash: true});
app.route('/:slug', mainView);



app.mount('body');
 
app.use((state, emitter) => {

    state.title = null;
    state.owner = {full_name: null};
    state.contents = [];
    state.current = null;
    state.page = 1;
    state.per = null;
    state.length = null;

    emitter.on('navigate', () => {
        console.log(`Navigated to state: ${state.route}`);

        window.fetch(`https://api.are.na/v2/channels/${state.params.slug}?page=${state.page}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            state.title = result.title;
            state.owner = result.owner;
            state.contents = result.contents;
            state.current = result.contents[0].id; 
            state.length = result.length;
            state.per = result.per;
            state.pageSize = Math.ceil(state.length/state.per);
            console.log(state);
    
            emitter.emit('render');
        });
    });

    emitter.on('DOMContentLoaded', () => {

        window.fetch(`https://api.are.na/v2/channels/${state.params.slug}?page=${state.page}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            
            state.title = result.title;
            state.owner = result.owner;
            state.contents = result.contents;
            state.current = result.contents[0].id;
            state.length = result.length;
            state.per = result.per;
            state.pageSize = Math.ceil(state.length/state.per);

            emitter.emit('render');
        });
    });

    emitter.on('click', async data => {

        let item = await state.contents.find(item => {

            return item.id == data;
        });

        state.current = item.id;

        emitter.emit('render');
    });

    emitter.on('forward', () => {
        state.page++;

        window.fetch(`https://api.are.na/v2/channels/${state.params.slug}?page=${state.page}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            
            state.title = result.title;
            state.owner = result.owner;
            state.contents = result.contents;
            state.current = result.contents[0].id;
            state.length = result.length;
            state.per = result.per;
            state.pageSize = Math.ceil(state.length/state.per);
            
            emitter.emit('render');
        });
    });

    emitter.on('back', () => {
        state.page--;

        window.fetch(`https://api.are.na/v2/channels/${state.params.slug}?page=${state.page}`)
        .then(response => {
            return response.json();
        })
        .then(result => {
            console.log(result);
            
            state.title = result.title;
            state.owner = result.owner;
            state.contents = result.contents;
            state.current = result.contents[0].id;
            state.length = result.length;
            state.per = result.per;
            state.pageSize = Math.ceil(state.length/state.per);

            emitter.emit('render');
        });
    });
});

function mainView(state, emit) {

    return html `
    <body>
        <div class="two-col">
            <div class="col">
                <div class="header">
                    <span class="title">${state.title}</span>
                    <span class="meta">${state.owner.full_name}</span>
                </div>
                
                <div class="list">
                    ${
                        state.contents.map(i => {
                            return listItem(i, emit);
                        })
                    }
                </div>

                <div class="pagination-bar">
                    <div onclick="${() => { emit('back') }}" class="pagination-button ${state.page > 1 ? 'on' : 'off'}">
                        Prev
                    </div>
                    <div class="pagination-button page">
                        Page ${state.page}
                    </div>
                    <div onclick="${() => { emit('forward') }}" class="pagination-button ${state.page < state.pageSize ? 'on' : 'off'}">
                        Next
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="view">
                    ${
                        state.contents.map(i => {
                            if(i.id == state.current) {
                                switch (i.class) {
                                    case "Image":
                                        return imageBlock(i);
                                        break;
                                    
                                    case "Media":
                                        return imageBlock(i);
                                        break;

                                    case "Link":
                                        return imageBlock(i);
                                        break;
                                    
                                    case "Attachment":
                                        return imageBlock(i);
                                        break;

                                    case "Text":
                                        return textBlock(i);
                                        break;

                                    case "Channel":
                                        return channelBlock(i);
                                        break;

                                    default:
                                        break;
                                }
                            }
                        })
                    }
                </div>
            </div>
        </div>
    </body>
    `
}