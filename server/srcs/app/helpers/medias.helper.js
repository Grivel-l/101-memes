const ffmpeg = require("ffmpeg");

class MediasHelper {
    convertVideo(extension, filename, filepath) {
        const toConvert = {
            mp4: {codec: "h264"},
            webm: {codec: null},
            gif: {codec: null}
        };
        return new Promise((resolve, reject) => {
            if (Object.keys(toConvert).filter(ext => ext === extension).length === 0) {
                return resolve();
            }
            Promise.all(Object.keys(toConvert).map(ext => {
                if (ext === extension) {
                    return new Promise(resolve => resolve());
                }
                return new ffmpeg(`${filepath}${filename}.${extension}`)
                    .then(video => {
                        video.setVideoFormat(ext);
                        if (toConvert[ext].codec !== null) {
                            video.setVideoCodec(toConvert[ext].codec);
                        }
                        return new Promise((resolve, reject) => {
                            video.save(`${filepath}${filename}.${ext}`, error => {
                                if (error !== null) {
                                    return reject(error);
                                }
                                return resolve();
                            });
                        });
                    });
            }))
                .then(() => resolve())
                .catch(error => reject(error));
        });
    }
}

module.exports = MediasHelper;
