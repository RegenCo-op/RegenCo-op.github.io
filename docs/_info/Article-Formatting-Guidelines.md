---
title: Article Formatting Guidelines
permalink: /info/Article-Formatting-Guidelines
---

## The Basics
{: .center .dark .teal}

Articles are written in the Kramdown version of Markdown. Markdown is a basic text format that allows content creators to focus on the content and layout of their document, and allow the style to be unified across all articles on the website. For a good overview of why we use Markdown, please read ["What is Markdown?"](http://kirkstrobeck.github.io/whatismarkdown.com/).

Kramdown is an improved version of Markdown, and it adds additional features. For a reference guide of what is possible with Kramdown, [here is their reference guide](https://kramdown.gettalong.org/quickref.html). When you preview an article on GitHub, it **does not** use Kramdown, but the website **does** use it. 

A good, free online editor for Markdown is [StackEdit](https://stackedit.io/editor). It does not support Kramdown, and has some additional features that are not supported by Kramdown, but it provides the basics:
- Spellchecker (using your browser's spellchecker)
- Formatting options (lists, headers, horizontal rules, etc.)
- Text style (bold, italics, links, etc.)

For example, this article was written using Kramdown. To see what it looks like behind-the-scenes, [click here](https://raw.githubusercontent.com/RegenCo-op/RegenCo-op/master/docs/_info/Article-Formatting-Guidelines.md). You can see that the articles are written as plain text files, but have special formatting characters. Please use [the Kramdown reference](https://kramdown.gettalong.org/quickref.html) to know what all of these symbols do.

***

## Additional Functionality
{: .center .dark .teal}

In addition to the basics, you can add more attributes to a block of text to customize it even more. The attributes only work on the website, and not on any previews. These must be added on a new line after the block. For example, to center some text and make it blue, one would type like the following:
    
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse pretium, 
    ipsum at laoreet suscipit, urna justo vehicula massa, vel rhoncus sapien quam
    in lacus. Nunc rutrum iaculis enim...
    {: .center .blue}

These attributes can be used in any combination, as long as they don't conflict with each other (text can't be blue and brown at the same time, for example).

Here is a list of the attributes currently available:

- formatting:
  - .center
- colors:
  - .blue
  - .brown
  - .gold
  - .green
  - .teal
  - color modifiers (used with a color to change it, ex: `{: .gold .dark}`):
    - .light
    - .dark