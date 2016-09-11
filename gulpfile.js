const gulp = require("gulp");
const jshint = require("gulp-jshint");
const jscs = require("gulp-jscs");

const javascript = ["src/*.js", "test/*.js"];
gulp.task("jshint", function(){
	return gulp.src(javascript).
	pipe(jshint()).
	pipe(jshint.reporter("default"));
});

gulp.task("jscs-src", function(){
	return gulp.src("src/*.js").
	pipe(jscs({fix: true})).
	pipe(jscs.reporter());
});

gulp.task("jscs-test", function(){
	return gulp.src("test/*.js").
	pipe(jscs({fix: true})).
	pipe(jscs.reporter());
});

gulp.task("scripts", gulp.series("jshint", "jscs-src", "jscs-test"));

gulp.task("default", gulp.parallel("scripts"));