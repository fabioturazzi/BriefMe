# BriefMe
## A Web Application that delivers summarized news articles

## Overview:

[BriefMe](https://briefmenews.herokuapp.com/) full project consists of [BriefMeDbLoader repo](https://github.com/fabioturazzi/BriefMeDbLoader) as the database loader, responsible for obtaining data and preparing it for the web application, 
and [BriefMe repo](https://github.com/fabioturazzi/BriefMe) and the web application, reponsible for pulling contents from the database and displaying it on the website, as well as supporting additional functions to help filtering news and listening to news.

**Features:** Topic filtering, Keyword filtering, Source filtering, Text to speech

**Tools:** 
- Backend: [Node.js](https://nodejs.org/en/about/)/ [Express](https://expressjs.com/)
- Frontend: [pug](https://pugjs.org/api/getting-started.html), [JQuery](https://jquery.com/)
- Text to speech: [speechSynthesis](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)


## Project Motivations:
This is an academic project developed by Fabio Turazzi and Do Man Uyen Nguyen, proposing a solution for those who wish to keep themselves up to date on the latest news. Considering the growth in use of social media to access news and the growing threat of fake news in those media, our goal was to develop a platform that offers consolidated information from credible sources, while maintaining the practicality sought-after in social media.

This application applies Web Scraping techniques to consolidate articles from sources such as BBC, CNBC, CNN, among others. Additionally, it differentiates itself from other news compilers by applying Natural Language Processing techniques to summarize those articles, offering quick briefings for users. Combining these two factors, we believe that we offer a better way for users to efficiently browse articles, while providing links to the full articles for those who wish to obtain more detailed information.

**Disclaimer: This application was developed for study purposes and is not intended for commercial use.**

## Functionality
This application is responsible for accessing information from Mongoose cluster, displaying them on the web application, providing a UI for users to interact with the app, by providing filtering options, as well as the feature to listen to the summarized articles.

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
|       ---- bootstrap.js, jquery.js,      Imports for used libraries
masonry.js                              
|       ---- scripts.js                    Front-end scripts for page behavior
|       ---- speech.js                     Scripts for text-to-speech generation
| -- node_modules                          Node.js setup files
| -- data.json                             Application static data
| -- package-lock, package.json            Server package configuration
| -- server.js                             Main application file for server execution
```
