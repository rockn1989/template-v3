import {
	gulp,
	prettyHtml,
	rename,
	clean,
	imageMin,
	minify,
  gcmq
} from './gulp.common.js';



/**
 * Minify css
 */
export const cssMin = () => {
	return gulp
		.src("dist/css/style.css")
		.pipe(minify())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest("build/css"));
};


/**
 * Pretty css
 */
export const prettyCss = () => {
  return gulp
    .src("./dist/css/style.css")
    .pipe(gcmq())
    .pipe(gulp.dest("./build/css"));
};


/**
 * Pretty Html
 */
export const prettyHTML = () => {
	return gulp
		.src("./dist/*.html")
		.pipe(
			prettyHtml({
				indent_size: 2,
				indent_char: " ",
				unformatted: ["code", "pre", "em", "strong", "span", "i", "b", "br"],
			})
		)
		.pipe(gulp.dest("./build"));
};


/**
 * Copy Files
 */
export const copyFiles = () => {
	return gulp
		.src(
			[
				"dist/fonts/**/*.{woff,woff2}",
				"dist/img/**",
				"dist/js/**",
				"dist/css/**",
				"dist/libs/**",
			],
			{
				base: "./dist",
			}
		)
		.pipe(gulp.dest("./build"));
};


/**
 * Clean folder
 */
export const cleanFolder = () => {
	return gulp
    .src("./build", {allowEmpty: true})
    .pipe(clean({ read: false }));
};


/**
 * Minify images
 */
export const imagesMin = () => {
	return gulp
		.src("build/img/**/*.{png,jpg,gif}")
		.pipe(
			imageMin([
				imageMin.optipng({ optimizationLevel: 3 }),
				imageMin.mozjpeg({ quality: 75, progressive: true }),
			])
		)
		.pipe(gulp.dest("build/img"));
};



const build = gulp.series(
	cleanFolder,
	gulp.series(
		copyFiles,
		prettyHTML,
    prettyCss,
		cssMin,
    imagesMin
	)
);


export default build;
