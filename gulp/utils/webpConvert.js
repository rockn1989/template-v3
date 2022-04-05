import { gulp, clean, webp } from "../gulp.common.js";

/**
 * Convert img to webp
 */
const webpConvert = () => {
  return gulp
    .src("./assets/img/webp/*.{png,jpg,gif}")
    .pipe(webp())
    .pipe(gulp.dest("./assets/img/media/webp/"));
};

/**
 * Clean folder
 */
const cleanFolder = () => {
  return gulp
    .src("./assets/img/media/webp", { allowEmpty: true })
    .pipe(clean({ read: false }));
};

cleanFolder();
webpConvert();
