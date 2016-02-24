'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var config = require('./gulp/config');
var runSequence = require('run-sequence');
var tasklist = require('readdir').readSync(config.taskPath, ['**.js']);

// Require all tasks in gulp/tasks, including subfolders
tasklist.forEach(function(taskfile) {

    require(config.taskPath + taskfile)(gulp, $, config);

});

//----------- MAIN TASKS LIST -----------//

gulp.task('build', ['clean'], function() {

	return runSequence(
		['html', 'css', 'js','images', 'fonts'],
		['misc:copy']
	);

});

gulp.task('dist', ['clean'], function() {

	config.base = config.dist;

	return runSequence(
		['html', 'css', 'annotate','images', 'fonts'],
		['misc:copy'],
		'usemin',
		'minifyhtml',
		'clean:js'
	);

});

gulp.task('server', ['clean'], function() {

	return runSequence(
		['html', 'css', 'js', 'images', 'fonts'],
		['misc:copy'],
		'browser-sync',
		'watch'
	);

});
