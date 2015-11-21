var gulp 					= require('gulp'),
		sass 					= require('gulp-sass'),
		autoprefixer 	= require('gulp-autoprefixer'),
		browserSync 	= require('browser-sync').create(),
		useref 				= require('gulp-useref'),
		uglify 				= require('gulp-uglify'),
		gulpif 				= require('gulp-if'),
		fileinclude		= require('gulp-file-include'),
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


gulp.task('fileinclude', function() {
  return gulp.src(['./app/templates/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: './app/templates/partials'
    }))
    .pipe(gulp.dest('./app'))
    .pipe(browserSync.stream());
});


gulp.task('browserSync', function(){
	 browserSync.init({
        server: "./app"
    });
})

gulp.task('watch', ['browserSync', 'sass', 'fileinclude'], function(){
	gulp.watch('app/assets/scss/**/*.scss', [sass]);	
	gulp.watch('app/templates/**/*.html', [fileinclude]);
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
	runSequence(['sass', 'fileinclude', 'browserSync', 'watch'],
		callback
	)
})