# arena-blog

arena-blog is a lightweight template kit for quickly building blogs using Are.na as a CMS. 

## Setup
---
To set up arena-blog you'll need to first clone the repository. The code-base consists of the following:
```
- index.html
- public
    - index.js
    - styles.css
```

The html file contains the template for the blog, while the js file does all the work requesting the content from Are.na via their API. The stylesheet can be customized to render the blog however you choose. I've set a default style to help get you started. Eventually I'll include a branch containing all unstyled elements for those who want to go wild with it :)

### Setting an arena channel
To set an aren.a channel to create a blog from go into the index.js file an edit line 2 in the `generateBlog()` function.
```
function generateBlog() {
    fetch('https://api.are.na/v2/channels/==arena-blog==').then(response => {
        return response.json();
    }).then(res => { ...

```

Replace the highlighted section with the slug of the channel you wish to add. The slug is the name Are.na assigns a channel when it is made. In the url it appears here:
```
https://www.are.na/user-name/slug
```

Once you've replaced the slug, save the file and run the follow in your terminal to set up a local server for testing:
```
python -m SimpleHTTPServer

or

python3 -m http.server 
```

You'll need to update your channel name on the index.html file in the `<title>` and `<h2>` tags.

## Deploying
---
You can use Github Pages to host your blog once it is deployed to your own repo. 


## Future Plans
---

I made this as a quick exploration for blogging using Are.na. I'm a big fan of their text editor and think there's a lot of opportunity for thinking about how websites can help display that vast amount of information are.na channels contain. Here are some things I'm thinking about adding in.

### CLI Tooling
I'm thinking about building a cli flow for setting up blogs, so that the index.html and index.js files automatically update with the specific channel name. 

### More layouts
I've built a really basic format for a blog, but that doesn't mean there are more options. I'd love to explore more formats, some practical and some more experimental.

### Sever-side version
Once again, this was a very quick solution, although I do like the idea of keeping this as simple as possible. That being said there are definite advatanges to including a server-side (Express & Node.js) so that deploying can be easily done on a more dynamic service like Heroku or Firebase. 