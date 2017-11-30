/**********************************************************
***********************************************************
**
** ENDEESE CREATIVE CUSTOM GULPFILE FOR WORDPRESS PROJECTS
** COMPILED BY NATE STEPHENS ON SEPTEMBER 6 2017
** FOR MORE INFORMATION GO TO: https://endeese.com/gulpfile
**
***********************************************************
***********************************************************

Run the following in the terminal:

npm install --save-dev gulp gulp-sass gulp-clean-css gulp-autoprefixer gulp-rename 
gulp-uglify jshint-stylish jshint gulp-jshint gulp-concat gulp-strip-debug gulp-svgmin gulp-imagemin gulp-size

npm install -g jshint

***********************************************************
*********************************************************** */
'use strict';
/*-------------------------------------------------
call and set gulp's npm package variables
-------------------------------------------------- */
const   
// stylesheet packages
gulp = require('gulp'),
sass = require('gulp-sass'),
cleanCSS = require('gulp-clean-css'),
autoprefix = require('gulp-autoprefixer'),
rename = require('gulp-rename'),

// javascript packages
uglify = require('gulp-uglify'),
jshint = require('gulp-jshint'),
concat = require('gulp-concat'), 
stripDebug = require('gulp-strip-debug'), 
stylish = require('jshint-stylish'),

// misc packages
size = require('gulp-size');
        

/*-------------------------------------------------
set absolute paths for src and dest directories
-------------------------------------------------- */
const   path = {
        styles: {
            css: {
                src: './src/css/',
                dest: './public/css/'
            },
            sass: {
                src: './src/sass/**/*.scss',
                dest: './src/css/'
            }
        },
        scripts: {
            src: ['./src/js/*.js'],
            dest: './public/js/'
        },
     
    };

/*-------------------------------------------------
stylesheet tasks
-------------------------------------------------- */
gulp.task('styles', () => {
    gulp.src(path.styles.sass.src)
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(gulp.dest(path.styles.sass.dest))
    .pipe(cleanCSS({debug: true}, function(details) {
        console.log(details.name + ': ' + details.stats.originalSize);
        console.log(details.name + ': ' + details.stats.minifiedSize);
      }))
    .pipe(gulp.dest(path.styles.css.src))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest(path.styles.css.dest))
});

/*-------------------------------------------------
script tasks
-------------------------------------------------- */
gulp.task('scripts', () => {
    gulp.src(path.scripts.src)
    .pipe(concat('script.js'))
    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(gulp.dest(path.scripts.dest));
});

/*-------------------------------------------------
misc tasks
-------------------------------------------------- */
gulp.task('stats', () => {
    gulp.src('./public/**/*')
    .pipe(size())
    .pipe(gulp.dest('./public'));
});

/*-------------------------------------------------
default and watch tasks
-------------------------------------------------- */
gulp.task('default', () => {

    // watch me getting Sassy
    gulp.watch(path.styles.sass.src, function(event){
        gulp.run('styles');
    });
    // make my JavaScript ugly
    gulp.watch(path.scripts.src, function(event){
        gulp.run('scripts');
    });
});