function generateBlog() {
    fetch('https://api.are.na/v2/channels/better-objects').then(response => {
        return response.json();
    }).then(res => {
        let temp = document.querySelector('template');
        let d = temp.content.querySelector('div');        
        let a;

        for(let c = res.contents.length - 1; c >= 0; c--) {
            createPost(a, d, res.contents[c]);
        }

    });
}

function createPost(template, elt, data) {

    template = document.importNode(elt, true);
    let h = createHeader(data);
    let p = createInfo(data);
    template.appendChild(h);
    template.appendChild(p);
    document.querySelector('main').appendChild(template);
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
            renderImage(data);
            break;

        case "Media":
            document.querySelector('main').innerHTML = data.embed.html;
            break;

        case "Link":    
            let frame = document.createElement('iframe');
            frame.src = data.source.url;
            document.querySelector('main').innerHTML = "";
            document.querySelector('main').appendChild(frame);
            break;

        default:
            break;
    }
   
}

function renderImage(data) {
    let img = new Image();
    img.src = data.image.display.url;
    let link = document.createElement('a');
    link.appendChild(img);
    link.href = data.image.large.url;
    document.querySelector('main').innerHTML = "";
    document.querySelector('main').appendChild(link);
}

generateBlog();