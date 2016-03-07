#Gulp Template

###Install & Run
```
npm install
gulp
```
http://localhost:3000/

- Sass
- Autoprefixer
- Browsersync

###Build
```
gulp build
```
- Move all html files to dist folder
- Minify, combine, and move js files to dist folder
- Move assets to dist folder (does not include scss directory, only css directory as scss files are not needed for prod.)

###Packages
- browser-sync
- gulp
- gulp-autoprefixer
- gulp-if
- gulp-plumber
- gulp-sass
- gulp-uglify
- gulp-useref
- run-sequence

####TODO
- Add image compression package
