import React from 'react';
import resizeImage from "js/resizeImage";

import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';

export default function UpdateImage(props) {
    const { good, setImgFileBlob, checkDisabled, previewImgUrl, setPreviewImgUrl } = props;

    const previewImg = (e) => {
        resizeImage(e).then(file => {
            var blob = file.blob;
            setImgFileBlob(blob);
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function () {
                setPreviewImgUrl(reader.result);
            }
        }).catch(err => {
            console.log(err);
        });
    }
    return (
        <>
            {(previewImgUrl || good.imgURL) &&
                <Box>
                    <img
                        style={{ width: '100%', maxWidth: '300px', maxHeight: '300px' }}
                        src={previewImgUrl ? previewImgUrl : good.imgURL}
                        title={good.title || "預覽圖片"}
                        alt="預覽圖片"
                    />
                </Box>
            }
            <Box>
                <TextField
                    type="file"
                    label="圖片預覽"
                    InputLabelProps={{
                        shrink: true,
                        'aria-label': 'img'
                    }}
                    accept="image/png, image/jpeg"
                    onChange={e => previewImg(e)}
                    error={((!previewImgUrl) || previewImgUrl === "") && good.imgURL === ""}
                    helperText={((!previewImgUrl) || previewImgUrl === "") && good.imgURL === "" ? "請至少上傳一張主圖" : ""}
                    onBlur={() => checkDisabled()}
                />
            </Box>
        </>
    );
}