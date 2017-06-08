var gulp = require('gulp'),
		// gutil = require('gulp-util'),
		sass = require('gulp-sass'),
		notify = require("gulp-notify") ;

gulp.task('build-css', function(){
	return gulp.src('public/stylesheets/app.scss')
		.pipe(sass())
		.on('error', notify.onError(function(error){
			return 'Error: ' + error.message;
		}))
		.pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function(){
	gulp.watch('public/stylesheets/app.scss', ['build-css']);
});

gulp.task('default', ['watch']);