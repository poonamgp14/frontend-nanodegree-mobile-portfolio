var gulp = require('gulp'),
	critical = require('critical').stream;

gulp.task('critical',function(){
	return gulp.src('src/index.html')
		.pipe(critical({base:'.', inline:true, css: ['src/css/style.css'], minify: true}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch',function(){
	gulp.watch('src/css/*.css',['critical']);
})

gulp.task('default',['critical','watch']);