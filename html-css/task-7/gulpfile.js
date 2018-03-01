/**
 * Created by Administrator on 2018/2/25.
 */
var gulp        = require('gulp');
var browserSync = require('browser-Sync').create();

// Static server
gulp.task('browser-Sync', function() {
    var files = [
        './*.html',
        'css/*.css'
        // '**/*.html',
        // '**/*.css',
        // '**/*.js'
    ];
    browserSync.init(files,{
        server: {
            baseDir: "./"
        }
    });
});

// Domain server
//gulp.task('browser-sync', function() {
//    browserSync.init({
//        proxy: "yourlocal.dev"
//    });
//});
gulp.task('default',['browser-Sync']); //定义默认任务