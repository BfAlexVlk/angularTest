'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var less = require('gulp-less');
var base64 = require('gulp-base64');
  
var templateCache = require('gulp-angular-templatecache');
var merge = require('merge-stream');
/* BrowseSync to reload page after .css changes*/
var templateCache = require('gulp-angular-templatecache');

//var nga = ['bower_components/angular/angular.min.js'];
//var jq = ['bower_components/jquery/dist/jquery.min.js'];

var distJS = '../app/';
var distCSS = '../app/';
  
var textAngularAppJS = [
    'app/scripts/**/_*.js',
    'app/scripts/**/**/*.js',
    'app/scripts/common/**/*.js'
  
];

var textAngularAppTemplates = [
    'app/templates/*.html',
 'app/templates/**/*.html' ,
  'app/templates/common/**/*.html' 
];

var textAngularAppStyle = [
    'app/styles/style.ui.css'
];

var stylesLess = ['app/styles/index.less'];

var server;
 

gulp.task('textAngularApp',
    function () {

        var templatesStream = gulp.src(textAngularAppTemplates)
            .pipe(templateCache({ standalone: true, root: '/pages/' }));

        var appStream = gulp.src(textAngularAppJS);

        var mergedStream = merge(templatesStream, appStream)
            .pipe(concat('app.js'))
            .pipe(gulp.dest(distJS))
            .pipe(reload({
                stream: true
            }));

        return mergedStream;
    });

gulp.task('scripts',
    [
        'textAngularApp' 
    ]);


gulp.task('styles',
    function () {
        var cssStream = gulp.src(textAngularAppStyle)
            .pipe(concat('app.css'));

        var lessStream = gulp.src(stylesLess)
            .pipe(less())
            .pipe(concat('less-files.less'));

        var mergedStream = merge(lessStream, cssStream)
            .pipe(concat('app.css'))
            .pipe(gulp.dest(distCSS))
            .pipe(reload({
                stream: true
            }));

        return mergedStream;

    });

gulp.task('watch',
    function () {
     
       gulp.watch(['app/styles/*.less', 'app/styles/**/*.less'],
            function (event, cb) {
                gulp.start('styles');
            });

        gulp.watch(['app/scripts/**/*.html', 'app/index.html'],
            function (event, cb) {
                gulp.start('scripts');
            });

    });


gulp.task('build', ['scripts', 'styles']);

gulp.task('run', ['scripts', 'styles', 'watch']);