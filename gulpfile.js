var 
  gulp         = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass         = require('gulp-sass'),
  changed      = require('gulp-changed'),
  babel        = require('gulp-babel'),
  path         = require('path'),
  nodemon      = require('gulp-nodemon');

gulp.task('sass', function(){
  gulp.src('app/static/dev/**/*.scss')
  .pipe(changed('app/static/dist'))
  .pipe(sass()).on('error', sass.logError)
  .pipe(autoprefixer())
  .on('end', ()=>console.log('sass files compiled'))
  .pipe(gulp.dest('app/static/dist'))
});

gulp.task('staticjs', function(){
  gulp.src('app/static/dev/**/*.js')
  .pipe(changed('app/static/dist'))
  .pipe(babel({
    presets: ['es2015']
    })).on('end', ()=> console.log('done')).on('error', (e)=> console.log(e))
  .pipe(gulp.dest('app/static/dist')).on('end', ()=> console.log('Compiled static js'))
});

gulp.task('start', ['staticjs', 'sass'], function () {
  nodemon({
    script: 'server.js',
    ext: 'js scss pug'
  })
  gulp.watch('app/static/**/*.js', ['staticjs']);
  gulp.watch('app/static/**/*.scss', ['sass']);
});

gulp.task('default', ['start']);