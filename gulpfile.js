// const gulp = require('gulp');
const gulp = require('gulp-param')(require('gulp'), process.argv);
const debug = require('gulp-debug');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const clean = require('gulp-clean');

// $ gulp dev --page contact-eg 
 
gulp.task('nettoyage', function () {
    gulp.src('*/index.html', {read: false})
        .pipe(clean());
    gulp.src('*/dev.html', {read: false})
        .pipe(clean());
});
function installation (page) {
    gulp.src("index.html")
        .pipe(debug())
        .pipe(gulp.dest(page));
};
gulp.task("dev", function (page) {
    console.log("page: " + page);
    installation(page);
    var chemin = page;
    // Fonction qui remplace le chemin serveur CSOD vers le chemin local
    // - chemin CSOD : /clientimg/legroupelaposte/welcome/
    // - chemin local : img/
    var reloc = function (fichier) {
        gulp.src(fichier.path)
            .pipe(debug())
            .pipe(replace(/.clientimg.legroupelaposte.welcome/g, 'img'))
            .pipe(rename("dev.html"))
            .pipe(gulp.dest(chemin))
            .pipe(browserSync.stream());
    };
    browserSync.init({
        server: {
            baseDir: "./" + chemin
        }
    });
    gulp.watch(chemin + "/**/*.html").on("change", reloc);
})

gulp.task("default", ["dev"])
