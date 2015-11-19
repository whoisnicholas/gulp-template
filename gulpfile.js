var gulp 				= require('gulp'),
		sass 				= require('gulp-sass'),
		browserSync = require('browser-sync'),
		useref 			= require('gulp-useref'),
		uglify 			= require('gulp-uglify'),
		gulpif 			= require('gulp-if'),
		runSequence = require('run-sequence');


gulp.task('sass', function(){
	return gulp.src('app/assets/scss/main.scss')
		.pipe(sass())
		.pipe(gulp.dest('app/assets/css'))
		.pipe(browserSync.reload({
			stream:true
		}))
})

gulp.task('browserSync', function(){
	browserSync({
		server: {
			baseDir: './app'
		},
	})
})

gulp.task('watch', ['browserSync', 'sass'], function(){
	gulp.watch('app/assets/scss/**/*.scss', [sass]);	
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


// Build Sequences
// ---------------

gulp.task('build', function (callback) {
	runSequence(['sass', 'useref', 'move'],
		callback
	)
})

gulp.task('default', function (callback) {
	runSequence(['sass', 'browserSync', 'watch'],
		callback
	)
})