// const gulp = require('gulp');
const gulp = require('gulp-param')(require('gulp'), process.argv);
const debug = require('gulp-debug');
const gutil = require('gulp-util');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync').create();
const replace = require('gulp-replace');
const rename = require("gulp-rename");
const clean = require('gulp-clean');

// $ gulp dev --page dossier-page

gulp.task("dev", function (page) {
    console.log("page: " + page);
    var chemin = page;
    // Fonction qui remplace le chemin serveur CSOD vers le chemin local
    // - chemin CSOD : /clientimg/legroupelaposte/welcome/
    // - chemin local : img/
    var reloc = function (fichier) {
        gulp.src(fichier.path)
            .pipe(debug())
            .pipe(replace(/.clientimg.legroupelaposte.welcome/g, 'img'))
            .pipe(rename("dev.html"))
            .pipe(gulp.dest('./'))
            .pipe(browserSync.stream());
    };
    browserSync.init({
        server: {
            baseDir: ".",
            routes: {
                "/js": ".",
                "/img": "./" + chemin + "/img"
            }
        }
    });
    gulp.watch(chemin + "/**/*.html").on("change", reloc);
})

gulp.task("default", ["dev"])
