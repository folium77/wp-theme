const imagemin = require('imagemin-keep-folder');
const imageminMozjpeg = require('imagemin-mozjpeg');
const imageminPngquant = require('imagemin-pngquant');
const imageminGifsicle = require('imagemin-gifsicle');
const imageminSvgo = require('imagemin-svgo');
const imageminWebp = require('imagemin-webp');

imagemin(['src/static/assets/images/**/*.{jpg,png,gif,svg}'], {
  plugins: [
    imageminMozjpeg({ quality: 90 }),
    imageminPngquant({ quality: [0.8, 0.8] }),
    imageminGifsicle(),
    imageminSvgo(),
  ],
  replaceOutputDir: output => {
    return output.replace(/images\//, '../../../public/static/assets/images/')
  }
}).then(() => {
  console.log('Images optimized');
});

imagemin(['src/static/assets/images/**/*.{jpg,png,gif}'], {
  plugins: [
    imageminWebp({quality: 90})
  ],
  replaceOutputDir: output => {
    console.log(output);
    const filename = `${output}.webp`;
    return filename.replace(/images\//, '../../../public/static/assets/images/')
  }
}).then(() => {
  console.log('Images optimized');
});