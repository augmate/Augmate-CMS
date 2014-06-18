# Augmate CMS
Codename: Green Dingo  
Until someone comes up with a better name  


* Ember for MVC and Routing  
* Grunt for build, serve, livereload  
* NPM for Node/Grunt dependencies  
* Bower of Ember/JS dependencies  
* Handlebars for HTML templates  
* SASS for css  
* Font-Awesome for icons  


## Prerequisites
You may already have some if not all of these installed on your system

* NodeJS to run Bower/Grunt  
  * Bower install third-party frontend dependencies (font-awesome, bourbon, bootstrap, etc)  
  * Grunt builds a production-server distribution ('dist' folder), watches for file-changes to auto-rebuild, and serves the website for dev-environments locally with support for livereload.  
* Ruby to run Compass  
  * Compass compiles sass/scss into css (it's hard to escape ruby's asset-building tools)  

```
npm install -g bower  
npm install -g grunt-cli
apt-get install ruby
gem install compass
```

## Setup
```
npm install  
bower install  
grunt build  
grunt serve  
```

Now you have a live server on 0.0.0.0:9000 (bound to all interfaces, not just localhost)  

## Hints
If running as root (eg: in a docker container), bower will want a --allow-root flag.  
