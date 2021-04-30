//來源：https://www.jianshu.com/p/4135a1990a37

let maxSize = 300 * 1000;
let maxLength = 800;

export default function getUploadImgInfo(e) {
    let fileInfo = getFileInfo(e);
    if (!fileInfo) return Promise.reject();
    let { fileExtension, fileType, file } = fileInfo;
    return imgResize({ file, fileType }).then(res => {
        return convertBlob({ imgBase64: res, fileType, fileExtension });
    });
}
function imgResize({ file, fileType }) {
    let fileReader = new FileReader();
    return new Promise((resolve, reject) => {

        if (file.size > maxSize) {
            fileReader.onload = function (e) {
                let IMG = new Image();
                IMG.onload = function () {
                    let reMaxLength = maxLength;
                    let originW = this.naturalWidth;
                    let originH = this.naturalHeight;
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    let level = 1.0; // 圖片質量
                    let { resizeW, resizeH } = getImgResize(
                        originW,
                        originH,
                        maxLength
                    );

                    while (resizeH * resizeW >= maxSize) {
                        reMaxLength = reMaxLength -10;
                        let obj = getImgResize(originW, originH, reMaxLength);
                        resizeH = obj.resizeH;
                        resizeW = obj.resizeW;
                    }

                    if (window.navigator.userAgent.indexOf('iPhone') > 0) {
                        canvas.width = resizeH;
                        canvas.height = resizeW;
                        ctx.rotate((90 * Math.PI) / 180);
                        ctx.drawImage(IMG, 0, -resizeH, resizeW, resizeH);
                    } else {
                        canvas.width = resizeW;
                        canvas.height = resizeH;
                        ctx.drawImage(IMG, 0, 0, resizeW, resizeH);
                    }
                    let base64 = canvas.toDataURL('image/' + fileType, level);
                    resolve(base64);
                };

                IMG.src = e.target.result;
            };
        } else {
            fileReader.onload = function () {
                resolve(fileReader.result);
            };
        }
        fileReader.readAsDataURL(file);
    });
}
function getImgResize(originW, originH, reMaxLength = maxLength) {
    let resizeH = 0;
    let resizeW = 0;
    if (originW > reMaxLength || originH > reMaxLength) {
        let multiple = Math.max(originW / reMaxLength, originH / reMaxLength);
        resizeW = originW / multiple;
        resizeH = originH / multiple;
    } else {
        resizeW = originW;
        resizeH = originH;
    }
    return {
        resizeH,
        resizeW
    };
}
function getFileInfo(e) {
    if (e.target.value === '') {
        return false;
    }
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    let file = files[0];
    return {
        fileExtension:
            file.name.match(/[\w]*$/) && file.name.match(/[\w]*$/)[0],
        fileType: file.type.split('/')[1],
        file: files[0]
    };
}
function convertBlob({ imgBase64, fileType, fileExtension }) {
    if (!imgBase64) {
        this.$toast('請選擇圖片');
        return;
    }
    let base64 = window.atob(imgBase64.split(',')[1]);
    let buffer = new ArrayBuffer(base64.length);
    let ubuffer = new Uint8Array(buffer);
    for (let i = 0; i < base64.length; i++) {
        ubuffer[i] = base64.charCodeAt(i);
    }
    let blob;
    try {
        blob = new Blob([buffer], { type: 'image/' + fileType });
    } catch (e) {
        window.BlobBuilder =
            window.BlobBuilder ||
            window.WebKitBlobBuilder ||
            window.MozBlobBuilder ||
            window.MSBlobBuilder;
        // if (e.name === 'TypeError' && window.BlobBuilder) {
        //     let blobBuilder = new BlobBuilder();
        //     blobBuilder.append(buffer);
        //     blob = blobBuilder.getBlob('image/' + fileType);
        // }
    }
    return Promise.resolve({ blob, fileExtension, fileType, imgBase64 });
}