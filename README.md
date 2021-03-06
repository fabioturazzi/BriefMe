# BriefMe
## A Web Application for news articles scraping and summarization

## Overview:

[BriefMe](https://briefmenews.herokuapp.com/) full project consists of:
- [BriefMeDbLoader repo](https://github.com/fabioturazzi/BriefMeDbLoader) - a PyCharm program responsible for scraping articles from the web, summarizing them, and loading a MongoDB database, and 
- [BriefMe repo](https://github.com/fabioturazzi/BriefMe) - Node.js web application, reponsible for pulling article contents from the database and displaying it on the website, as well as supporting additional functions to help filtering and listening to news.  

**Features:** Topic filtering, Keyword filtering, Source filtering, Text to speech
 
**Tools:** 
- Backend: [Node.js](https://nodejs.org/en/about/)/ [Express](https://expressjs.com/), [Mongoose](https://www.mongoose.com/)
- Frontend: [pug](https://pugjs.org/api/getting-started.html), [JQuery](https://jquery.com/)
- Text to speech: [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)


## Project Motivations:
This is an academic project developed by Fabio Turazzi and Do Man Uyen Nguyen, proposing a solution for those who wish to keep themselves up to date on the latest news. Considering the growth in use of social media to access news and the growing threat of fake news in those media, our goal was to develop a platform that offers consolidated information from credible sources, while maintaining the practicality sought-after in social media.

This application applies Web Scraping techniques to consolidate articles from sources such as BBC, CNBC, CNN, among others. Additionally, it differentiates itself from other news compilers by applying Natural Language Processing techniques to summarize those articles, offering quick briefings for users. Combining these two factors, we believe that we offer a better way for users to efficiently browse articles, while providing links to the full articles for those who wish to obtain more detailed information.

**Disclaimer: This application was developed for study purposes and is not intended for commercial use.**

## Functionality
This application is responsible for accessing information from Mongoose cluster, displaying them on the web application. Provides an UI for interaction with the app, containing filtering options and text-to-speech functionality.

## Directory
```
|- CSIS4495_BriefMe
| -- models
|   --- article.js                         File containing Mongoose model for articles
|   --- index.js                           Support file for model integration
| -- routes
|   --- router.js                          Router file used to handle Express requests
| -- views
|   --- layout.pug                         Base view containing layout specifications and navigation bar
|   --- index.pug                          View used to render articles in the webpage
|   --- about.pug                          View used to render about page with development information
| -- public
|   --- css                                Folder containing css files for site and Bootstrap layouts
|   --- img                                Folder containing static images rendered on the website
|   --- js                              
|     ---- bootstrap, jquery, masonry.js   Imports for used libraries
|     ---- scripts.js                      Front-end scripts for page behavior
|     ---- speech.js                       Scripts for text-to-speech generation
| -- project_report
|   --- BriefMe - Project Report.pdf       Complete report describing project development process
| -- node_modules                          Node.js setup files
| -- data.json                             Application static data
| -- package-lock, package.json            Server package configuration
| -- server.js                             Main application file for server execution
```

## Challenges:
The main challenges we found throughout development were related to maintaining responsiveness of the Web Application given the large amounts of processing necessary to scrape and summarize articles. As explained before, we have mitigated this issue by modularizing the application, separating the complete database loading process into a separate Python program.

Moreover, implementing an effective UI to deliver content with the desired simplicity was also a central consideration for the web application. The final solution we proposed uses a masonry layout with filter options, maintaining an intuitiveness-focused interface.

Some of the more technically complex challenges we faced are attributed to the database loader section of the application, with the most notable ones being limited processing and summary quality. A more detailed breakdown of these two aspects can be found in the [BriefMeDbLoader repo](https://github.com/fabioturazzi/BriefMeDbLoader) or in the project report contained in this repo.
