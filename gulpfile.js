var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		browserSync 	= require('browser-sync').create(),
		useref 				= require('gulp-useref'),
		uglify 				= require('gulp-uglify'),
		gulpif 				= require('gulp-if'),
		handlebars		= require('gulp-compile-handlebars'),
		rename				= require('gulp-rename'),
		runSequence 	= require('run-sequence');



gulp.task('sass', function(){
	return gulp.src('app/assets/scss/main.scss')
		.pipe(sass({
			outputStyle: 'compressed'
		}))
		.pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
		.pipe(gulp.dest('app/assets/css'))
		.pipe(browserSync.stream());
})


gulp.task('hbs', function() {
	var templateData = {
		name: gulp.src('./app/templates')
	},
	options = {
		batch: ['./app/templates/partials']
	}

	return gulp.src('./app/templates/*.hbs')
		.pipe(handlebars(templateData, options))
	  .pipe(rename({extname: '.html'}))
	  .pipe(gulp.dest('app'))
})


gulp.task('browserSync', function(){
	 browserSync.init({
        server: "./app"
    });
})

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/assets/scss/**/*.scss', ['sass']);	
	gulp.watch('app/templates/**/*.hbs', ['hbs', browserSync.reload]);
	gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/assets/js/**/*.js', browserSync.reload);
})


// Build Prep
// ---------------

gulp.task('useref', function() {

  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.js', uglify()))
    .pipe(gulp.dest('dist'))
})

gulp.task('move', function() {
  return gulp.src(['app/assets/**', '!app/assets/{js,js/**}', '!app/assets/{scss,scss/**}'])
  .pipe(gulp.dest('dist/assets'))
})


// Run Sequence
// ---------------

gulp.task('default', function (callback) {
	runSequence(['sass', 'hbs', 'browserSync', 'watch'],
		callback
	)
})


// Build Sequence
// ---------------

gulp.task('build', function (callback) {
	runSequence(['sass', 'hbs', 'useref', 'move'],
		callback
	)
})
