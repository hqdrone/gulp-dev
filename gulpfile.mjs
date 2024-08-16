"use strict";

const gulp = await import("gulp").then((module) => module.default);
const stylus = await import("gulp-stylus").then((module) => module.default);
const pug = await import("gulp-pug").then((module) => module.default);
const autoprefixer = await import("gulp-autoprefixer").then(
    (module) => module.default
);
const browsersync = await import("browser-sync").then(
    (module) => module.default
);

gulp.task("stylus", function () {
    return gulp
        .src("app/styl/**/main.styl")
        .pipe(stylus())
        .pipe(
            autoprefixer({
                cascade: false,
            })
        )
        .pipe(gulp.dest("dist/css"));
});

gulp.task("pug", function () {
    return gulp
        .src("app/pug/*.pug")
        .pipe(
            pug({
                pretty: true,
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("build", gulp.series(gulp.parallel("pug", "stylus")));

gulp.task("watch", function () {
    gulp.watch("app/styl/**/*.*", gulp.series("stylus"));
    gulp.watch("app/pug/**/*.*", gulp.series("pug"));
});

gulp.task("serve", function () {
    browsersync.init({
        server: "dist",
    });

    browsersync.watch("dist/**/*.*").on("change", browsersync.reload);
});

gulp.task("tree", function () {
    return gulp
        .src("*.*", { read: false })
        .pipe(gulp.dest("./app"))
        .pipe(gulp.dest("./app/styl"))
        .pipe(gulp.dest("./app/pug"))
        .pipe(gulp.dest("./dist"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(gulp.dest("./dist/fonts"))
        .pipe(gulp.dest("./dist/img"))
        .pipe(gulp.dest("./src"));
});

gulp.task("dev", gulp.series("tree", "build", gulp.parallel("watch", "serve")));
