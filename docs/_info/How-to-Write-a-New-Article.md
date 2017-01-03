---
layout: article
title: How to Write a New Article
permalink: /info/How-to-Write-a-New-Article
comments: false
---

This guide will be a step-by-step manual on how to create an article and submit it to GitHub. If you get stuck on any step, don't hesitate to [contact us](/info/contact) and we will help you.

***

## Compose the Article
{: .center .dark .teal}

Before you start writing the article, it is recommended that you read the [article formatting guidelines](/info/Article-Formatting-Guidelines) to get familiar with the basics of how our articles are formatted.

1. ### Download the template article:
   
   - Right click on the following link and click save link as... to save it to your desktop: [ArticleTemplate.md](https://github.com/RegenCo-op/RegenCo-op/raw/master/docs/_articles/ArticleTemplate.md)

2. ### Open the file from step 1 in your favorite Markdown editor:  
   **Note:** A good online editor is [StackEdit](https://stackedit.io/editor), and from now on we will assume you are using that editor for the purposes of this guide:
   
   1. Using Stack Edit, for example, click on the "**#**" in the upper left corner.
   2. Click on "import from disk".
   3. Click "browse" and open the file from step 1.

3. ### Write the article:  
   **Note:** Do not worry about pictures for now.
   
   1. #### Fill out the top section:
      
      1. **Ignore the first line that says layout: article**
      2. Delete the text that says "Article Title Goes Here" and fill it in with your article's title.
      3. Delete the text that says "Unique-Article-Permalink-Goes-Here" and replace it with a phrase that is unique.  
        **No spaces are allowed. Only letters (a-z), numbers (0-9), and hyphens (-) are allowed**.  
        The easiest thing would be your article's title, replacing the spaces with hyphens (-). For example: using the title: `My Article Title`, one would choose a permalink: `My-Article-Title`.  
        The most important thing is that it **doesn't share a permalink with another article**.  
        **_Make a note of what you typed here, as we will use it later, as follows:_** `Your-Permalink-Here`
      4. **Most articles should leave the _comments: true_ section alone.**

   2. #### Write the content:  
      Now you can start writing your article after the last line with the three hyphens (`---`).
      
      - Make a note of where you want to put a picture, if any, but do not worry about how to insert it for now.
      - Keep in mind the [article formatting guidelines](/info/Article-Formatting-Guidelines).
      - Also remember to refer to the [Kramdown reference guide](https://kramdown.gettalong.org/quickref.html) if the text isn't formatting the way you want it to.

   3. #### Rename the article:
      
      1. Using Stack Edit, click on the text in the upper right that says `ArticleTemplate`.
      2. Using the same permalink text you used in step 3.1.3, rename the article. It will look like this:  
      `Your-Permalink-Here`

   4. #### Save the article:
     
      1. Using Stack Edit, for example, click on the "**#**" in the upper left corner.
      2. Click the "**Export to disk**" button.
      3. Click the "As markdown" button.

4. ### Using images:  
   **Note:** [Skip to the next step](#make-a-new-fork) if you _do not_ want to use any pictures.
   
   1. #### Prepare the images:
      
      1. Make sure pictures you want to use are copyright free or are your own original work.
      2. Rename the files so that they **do not contain any spaces**.
      3. Make sure the files are .jpg, .png, .gif, or .svg format (you can use this [online converter](http://image.online-convert.com/convert-to-jpg) if they are not).
      4. Put all the images you want to use in a folder on your desktop. Rename the folder the same as your permalink:  
`Your-Permalink-Here`
   
   2. #### Insert the images into the document:  
      **Note: _Images you use here won't appear in any previews_**
      
      - Using the markdown format, insert the images into the article wherever you want. The format you use will look like this: `![image description](/images/Your-Permalink-Here/Your-Image-Here.ext)`  
        
        **Note:** Make sure to replace `Your-Permalink-Here` with the same permalink text you used in step 3.1.3.  
        **Note:** Make sure to replace `Your-Image-Here.ext` with the image filename, and **don't forget to use the right filename extension**.

***

## Make a New Fork
{: .center .dark .teal}

**Note:** You only need to follow these steps one time; In the future you can [skip to the next section](#submit-your-article-to-github).

1. Either [sign into github](https://github.com/login) or [make a new account](https://github.com/join).
2. Go to the [RegenCo-op repository on GitHub](https://github.com/RegenCo-op/RegenCo-op).
3. In the upper right corner, you will see a button called "Fork". Click on it to fork the repository to your account.
4. After a few seconds, you should now have a personal copy of all the files on the website.
5. It would be wise to make a bookmark of your forked repository, as that is what you will use to submit articles. If you do not, you can find it later at:  
   `https://github.com/YOUR-GITHUB-USERNAME-HERE/RegenCo-op`

***

## Submit Your Article to GitHub
{: .center .dark .teal}

By now you should have your article written and named: `Your-Permalink-Here.md` along with your images folder named: `Your-Permalink-Here`. You should also have [forked the RegenCo-op repository](#set-up-a-new-fork) and be signed into your [Github account](https://github.com/login). You are ready to submit your article to the website to be reviewed and published by members of the co-operative.

1. ### Updating your fork:  
   As people make changes to the main repository, your fork will become out of date. Follow these steps to keep your fork updated:
   
   1. Select the following text, and copy and paste it to your browser's address bar: `https://github.com/YOUR-GITHUB-USERNAME-HERE/RegenCo-op/compare/master...RegenCo-op:master`
   2. Replace the text `YOUR-GITHUB-USERNAME-HERE` with _your_ github username.
   3. Press the `Enter` key to begin comparing the changes between the website and your forked repository.
   4. If it says "**There isn't anything to compare.**", [skip to the next step](#making-a-topic-branch); otherwise click the button that says "**Create pull request**".
   5. Give your pull request the title "**Update**" and click "**Create pull request**".
   6. Now you can click the "**Merge pull request**" button to bring your repository up to date with the master repository.

2. ### Making a topic branch:
   
   A topic branch is a short-lived branch that we will create and use for a single article or group of changes, to make it easier to see what changes were made. It is important to make a new branch whenever we want to make changes to a repository; otherwise it can be a hassle to keep our fork up-to-date with the main repository.

   1. Go to your forked repository. It can be found here:  
      `https://github.com/YOUR-GITHUB-USERNAME-HERE/RegenCo-op`
   2. Click on the button that says "Branch: **master**".
   3. In the input box, type in the permalink text: `Your-Permalink-Here`
   4. Click the "Create branch:..." button.
   5. The button should now say "Branch: **Your-Permalink-Here**".
   
3. ### Making and Pushing Changes:
   
   Now we will add our article and images folder (if you used images) to GitHub.  

   1. #### Edit the article layout:  
      
      This is where you article will be located in the navigation bar.  
      
      **_Note:_** Make sure your branch is on the one you created earlier. There should be a button that says "Branch: **Your-Permalink-Here**". If it does not say that, click it and change it.
      
      1. Open the "**docs**" folder.
      2. Open the "**_data**" folder.
      3. Click the "**article_layout.yml**" file.
      4. Click the little pencil icon in the upper right.
      5. Following the directions and the layout in that file, type `Your-Permalink-Here` in whichever category you wish. If you want to make a new category, follow the given layout.
      6. Scroll down and click the "**Commit changes**" button at the bottom.
      7. Next to the button that says "Branch: **Your-Permalink-Here**", click the text that says "**RegenCo-op**" to be taken back to the main page.

   2. #### Upload the images folder:
      
      **_Note:_** [Skip to the next step](#upload-the-article-file) if you had no images.  
      **_Note:_** Make sure your branch is on the one you created earlier. There should be a button that says "Branch: **Your-Permalink-Here**". If it does not say that, click it and change it.
      
      1. Open the "**docs**" folder.
      2. Open the "**images**" folder.
      3. Click the "**Upload files**" button in the top right.
      4. Drag and drop **_the image folder itself_** to the grey box that says "**Drag additional files here to add them to the repository**"  
         **_Note:_** It is important to **_drag and drop the image folder itself_**, rather than click the "**choose your files**" link; This is so the folder structure gets uploaded to github.
      5. The image's filenames should appear under the grey box.
      6. Scroll down and click the "**Commit changes**" button at the bottom.

   3. #### Upload the article file:  
      
      **_Note:_** Make sure your branch is on the one you created earlier. There should be a button that says "Branch: **Your-Permalink-Here**". If it does not say that, click it and change it.
      
      1. Open the "**docs**" folder.
      2. Open the "**_articles**" folder.
      3. Click the "**Upload files**" button in the top right.
      4. Drag and drop the article file to the grey box that says "**Drag additional files here to add them to the repository**"
      5. The article filename should appear under the grey box.
      6. Scroll down and click the "**Commit changes**" button at the bottom.

4. ### Making a Pull Request:  

   At last, you’re ready to propose your article to the website!

   1. You should see a banner indicating that you’ve recently pushed a new branch (the one you made earlier).
   2. Click on the "**Compare & Pull Request**" button in the upper right to send you to a discussion page, where you can enter a title and optional description. It’s important to provide as much useful information and a rationale for why you’re writing you article in the first place.
   3. Click on Create Pull Request to propose your new article.
   4. Members will review your article and provide feedback before it gets published.
