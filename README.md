# Are.na Blog

Are.na Blog is a website that renders any channel in a blog format. It supports all block types but is ideal for text based channels in general.

## Updates

I had wrote Are.na Blog as a tool that required you to clone your own version and fill in the required sections with your channel's slug name. Because I am lazy I decided to make a site that takes a slug as a URL param and renders the site with the blocks from that slug's channel.

Are.na Blog is now powered by Choo, which is an experimental front-end framework. It's really small, very simple, and a good place to start for learning to write apps with state, store, and routing. That being said it is quite experimental and I don't know how well maintained it is. For all you know, tomorrow it could be completely borked and this blog unusable. It was a fun experience to write this app with so take that as you will. 

## How to render your channel 

Here's a quick example of how to get your channel to render as a blog:

``` js
    CHANNEL URL = 'https://www.are.na/nicolas-boillot/patterns-dithering'

    SLUG = 'patterns-dithering'

    ARE.NA_BLOG_URL = 'https://unruffled-euler-9e0ed7.netlify.app/patterns-dithering'

```

There you have it! Excluding the fact that the url is fucking stupid this is should be a simple process. Maybe I will make a home page where you can paste a link and maybe I'll get a better domain. But maybe I won't... 

Or maybe I'll just go back to making this a cli tool and allow you to build your own version of this app. We'll see 

For now, feel free to try it out, file bugs, or just make suggestions. 

Cheers

A
