const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const concat = require('gulp-concat');
const babel = require('gulp-babel');

function fnCopyIndex(){
    return gulp.src('./src/index.html')
    .pipe(gulp.dest('./dist'));
}

function fnHTML(){
    return gulp.src('./src/pages/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('./dist/pages'));
}

function fnCss(){
    return gulp.src('./src/sass/*.css')
        .pipe(cssnano())
        .pipe(rename({suffix : '.min'}))
        .pipe(gulp.dest('./dist/css'));
}

function fnJS(){
    return gulp.src('./src/js/*.js')
    .pipe(babel(
        {
            presets: ['@babel/env']
        }
    ))
    .pipe(uglify())
    .pipe(rename({'suffix' : '.min'}))
    .pipe(gulp.dest('./dist/js'));

}

function fnImg(){
    return gulp.src('./src/imgs/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
}

function fnWatch(){
    gulp.watch('./src/index.html',fnCopyIndex);
    gulp.watch('./src/pages/*.html',fnHTML);
    gulp.watch('./src/sass/*.css',fnCss);
    gulp.watch('./src/js/*.js',fnJS);
}

exports.copyIndex = fnCopyIndex;
exports.html = fnHTML;
exports.css = fnCss;
exports.js = fnJS;
exports.default = fnWatch;
exports.img = fnImg;