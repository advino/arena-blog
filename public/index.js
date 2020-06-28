function generateBlog() {
    fetch('https://api.are.na/v2/channels/better-objects').then(response => {
        return response.json();
    }).then(res => {
        for(let c = res.contents.length - 1 ; c >= 0; c--) {

            createPost(res.contents[c]);
        }
    });
}

function createPost(data) {
    let p = document.createElement('div');
    let h = createHeader(data);
    let i = createInfo(data);

    p.appendChild(h);
    p.appendChild(i);
    document.querySelector('main').appendChild(p);
}

function createInfo(data) {
    let info = document.createElement('p');
    info.innerHTML = data.description_html;
    return info;
}

function createHeader(data) {
    let header = document.createElement('h3');
    header.innerHTML = data.title;
    header.addEventListener('click', e => {
        renderBlock(data);
    });
   
    return header;
}

function renderBlock(data) {
    
    switch (data.class) {
        case "Text":

            document.querySelector('main').innerHTML = data.content_html;
            break;
    
        case "Image":
            let img = new Image();
            img.src = data.image.display.url;
            let link = document.createElement('a');
            link.appendChild(img);
            link.href = data.image.display.url;
            document.querySelector('main').innerHTML = "";
            document.querySelector('main').appendChild(link);
            break;

        case "Link":
            
            break;
        default:
            break;
    }
   
}


generateBlog();