var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat');

var paths = {
	scripts: './app/*'
};

function handleError(err) {
	console.log(err.toString());
	this.emit('end');
}

gulp.task('js', function() {
	gulp.src(paths.scripts + '.js')
		.pipe(uglify())
		.pipe(concat('focus-element-overlay.min.js'))
		.pipe(gulp.dest('./app'));
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['js']);
});

gulp.task('default', ['watch']);