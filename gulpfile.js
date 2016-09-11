var 
  gulp         = require('gulp'),
  autoprefixer = require('gulp-autoprefixer'),
  sass         = require('gulp-sass'),
  changed      = require('gulp-changed'),
  babel        = require('gulp-babel'),
  uglify       = require('gulp-uglify'),
  path         = require('path'),
  uglifycss    = require('gulp-clean-css'),
  browserSync  = require('browser-sync').create();
  nodemon      = require('gulp-nodemon');

gulp.task('sass', function(){
  gulp.src('app/static/dev/css/*.scss')
  .pipe(changed('app/static/dist'))
  .pipe(sass()).on('error', sass.logError)
  .pipe(autoprefixer())
  .pipe(uglifycss())
  .on('end', ()=>console.log('\033[92mSass\033[0m files compiled'))
  .pipe(gulp.dest('app/static/dist/css'))
  .pipe(browserSync.stream());
});

gulp.task('staticjs', function(){
  gulp.src('app/static/dev/**/*.js')
  .pipe(changed('app/static/dist'))
  .pipe(babel({
    presets: ['es2015']
    }))
  .on('end', ()=> console.log('\033[92mBabel\033[0m transpiled'))
  .on('error', (e)=> console.log(e))
  .pipe(uglify())
  .pipe(gulp.dest('app/static/dist'))
  .on('end', ()=> console.log('\033[92mCompiled and saved static js\033[0m'))
  .pipe(browserSync.stream());
});

gulp.task('start', ['staticjs', 'sass'], function (cb) {
  var started = false;
  nodemon({
    script: 'server.js',
    ext: 'js pug',
    ignore: 'app/static/*'
  })
  .on("start", ()=>{
    if(!started){
      started = true;
      browserSync.init(null, {
          proxy: "http://127.0.0.1:8080",
          port: 3000
        });
      cb();
    }
    setTimeout(
      browserSync.reload,
      3000    
      )
  })
  .on("error", (err)=> console.log(err.toString()));

  gulp.watch('app/static/**/*.js', ['staticjs']);
  gulp.watch('app/static/**/*.scss', ['sass']);
});

gulp.task('default', ['start']);