/**
 * Created by Administrator on 2018/2/24.
 */
var gulp = require('gulp'), //本地安装gulp所用到的地方
    connect =require('gulp-connect');//自动刷新

//定义html任务
gulp.task('html', function () {
    gulp.src('demo.html')//指定被刷新的html路径
        .pipe(connect.reload());
});

//定义livereload任务
gulp.task('connect', function () {
    connect.server({
        livereload: true
    });
});

//定义看守任务
gulp.task('watch', function () {
    gulp.watch('*.html', ['html']);  //监听html目录下所有文件
    gulp.watch('css/*.css', ['html']);
});

gulp.task('default',['watch','html','connect']);