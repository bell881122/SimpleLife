import React from 'react';
import resizeImage from "js/resizeImage";

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

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
                        style={{
                            width: 'auto',
                            height: 'auto',
                            maxWidth: '300px',
                            maxHeight: '300px'
                        }}
                        src={previewImgUrl ? previewImgUrl : good.imgURL}
                        title={good.title || "預覽圖片"}
                        alt="預覽圖片"
                    />
                </Box>
            }
            <Box display="flex" alignItems="center">
                <Box>
                    <input
                        accept="image/*"
                        style={{ display: 'none' }}
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={e => previewImg(e)}
                        onBlur={() => checkDisabled()}
                    />
                    <label htmlFor="contained-button-file">
                        <Button variant="contained" color="primary" component="span">
                            選擇圖片
                        </Button>
                    </label>
            </Box>
            <Box ml={1}>

                    <FormControl error={((!previewImgUrl) || previewImgUrl === "") && good.imgURL === ""} >
                        <FormHelperText id="component-error-text">{((!previewImgUrl) || previewImgUrl === "") && good.imgURL === "" ? "請至少上傳一張主圖" : ""}</FormHelperText>
                    </FormControl>
                </Box>
               
            </Box>
        </>
    );
}