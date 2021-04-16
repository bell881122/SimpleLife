import React from 'react';
import { useHistory } from "react-router-dom";
import { storage } from "js/firebase";
import getTimestamp from "js/getTimestamp.js";

import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

import GoodDataService from "services/good.service";
const UpdateImage = React.lazy(() => import('tools/UpdateImage.tool.jsx'));

const states = [
    {
        value: '全新',
        label: '全新',
    },
    {
        value: '二手',
        label: '二手',
    },
];

export default function GoodEdit(props) {
    const history = useHistory();
    const { good, setGood, setIsEdit, editType, setEditType } = props;
    const [editGood, setEditGood] = React.useState(good);
    const [imgFileBlob, setImgFileBlob] = React.useState(); //圖片暫存 blob
    const [submitButtomDisabled, setSubmitButtomDisabled] = React.useState(false);
    const [previewImgUrl, setPreviewImgUrl] = React.useState(); //本地圖片預覽
    const [tagsString, setTagsString] = React.useState(editGood.tags.toString());

    const checkDisabled = React.useCallback(() => {
        let tags = tagsString.split(",");

        const doCheckDisabled = async () => {
            if (editGood.title === "" ||
                editGood.description === "" ||
                editGood.state === "" ||
                (previewImgUrl === undefined && good.imgURL === "") ||
                editGood.price < 0 ||
                editGood.price > 99999 ||
                (tags.length > 1 && tags.some(x => x === "" || x === " "))
            ) {
                setSubmitButtomDisabled(true);
            } else {
                setSubmitButtomDisabled(false);
            }
        };

        doCheckDisabled();
    }, [tagsString, editGood, previewImgUrl, good]);

    React.useEffect(() => {
        if (editGood !== undefined)
            checkDisabled();
    }, [editGood, checkDisabled]);

    const update = (newGoodId) => {
        const goodId = newGoodId === undefined ? good.id : newGoodId;
        const data = editGood;
        data.lastModifiedDate = Date.now();
        data.lastModifiedTimestamp = getTimestamp();

        if (imgFileBlob !== undefined) {
            let imagePathAndName = `good/${goodId}-main.jpg`;
            let storageRef = storage.ref().child(imagePathAndName);
            //已有圖片的話，先刪除再更新
            storageRef.getDownloadURL().then(function (url) {
                storageRef.delete().then(function () {
                    updateImage();
                }).catch(function (error) {
                    console.log(error.code);
                });
            }).catch(function (error) {
                if (error.code === "storage/object-not-found") {
                    updateImage();
                } else {
                    console.log(error.code);
                }
            })

            //更新圖片到遠端
            const updateImage = () => {
                if (imgFileBlob === null) return;

                let metadata = { contentType: 'image/jpeg' };
                storageRef.put(imgFileBlob, metadata).then(() => {
                    storageRef.getDownloadURL().then(function (url) {
                        data.id = goodId;
                        data.imgURL = url;
                        updateGood(goodId, data);
                    }).catch(function (error) {
                        console.log(error.code);
                    })
                });
            }
        } else {
            updateGood(goodId, data);
        }
    }

    const updateGood = (goodId, data) => {
        let good = data;
        if (tagsString !== "" && tagsString !== " ") {
            good.tags = tagsString.split(",")
                .map(x => x.trim())
                .filter(function (element, index, arr) {
                    return arr.indexOf(element) === index;
                });;
        }

        GoodDataService.update(goodId, data)
            .then(() => {
                //重整網頁
                setIsEdit(false);
                setEditType("編輯");
                setGood(good);
                // history.go(0);
                history.push(`/good/${goodId}`);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const saveGood = () => {
        let data = editGood;
        GoodDataService.create(data)
            .then(function (docRef) {
                console.log("成功新增，物品ID: ", docRef.id);
                update(docRef.id);
            })
            .catch((e) => {
                console.log(e);
            });
    }

    const onChange = (e, name) => {
        setEditGood(state => ({
            ...state,
            title: name === "title" ? e : editGood.title.trim(),
            description: name === "description" ? e : editGood.description.trim(),
            imgURL: name === "imgURL" ? e : editGood.imgURL,
            price: name === "price" ? parseInt(e) : parseInt(editGood.price),
            state: name === "state" ? e : editGood.state,
            location: name === "location" ? e : editGood.location,
            published: name === "published" ? e : editGood.published,
        }))

        if (name === "tag") {
            setTagsString(e);
        }
    }

    return (
        <>
            {editGood &&
                <Box py={3}>
                    <form noValidate autoComplete="off">
                        <Box mb={1} mr={0} display="flex" style={{ width: '52%', minWidth: '310px' }}                  >
                            <Box>
                                <Typography variant="h5" component="h2">
                                    {editType}物品
                                </Typography>
                            </Box>
                            <Box ml="auto" >
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={editGood.published}
                                            onChange={e => onChange(e.target.checked, e.target.name)}
                                            name="published"
                                            color="primary"
                                        />
                                    }
                                    label="刊登"
                                />
                            </Box>
                        </Box>
                        <UpdateImage previewImgUrl={previewImgUrl} setPreviewImgUrl={setPreviewImgUrl} good={editGood} setImgFileBlob={setImgFileBlob} checkDisabled={checkDisabled} />
                        <Box my={3}>
                            <TextField
                                style={{ width: '50%', minWidth: '300px' }}
                                id="standard-basic"
                                label="物品名稱"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'title'
                                }}
                                name="title"
                                value={editGood.title}
                                onChange={e => onChange(e.target.value, e.target.name)}
                                error={editGood.title === ""}
                                helperText={editGood.title === "" ? "物品名稱不可為空" : ""}
                                onBlur={() => checkDisabled()}
                            />
                        </Box>
                        <Box my={3}>
                            <Box component="span" mr={3}>
                                <TextField
                                    id="standard-select-currency"
                                    select
                                    label="狀態"
                                    name="state"
                                    value={editGood.state}
                                    onChange={e => onChange(e.target.value, e.target.name)}
                                >
                                    {states.map((option) => (
                                        <MenuItem key={option.value} value={option.value} style={{ width: '100%' }}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Box>
                            <Box component="span">
                                <TextField
                                    id="standard-number"
                                    label="標價"
                                    type="number"
                                    InputLabelProps={{
                                        shrink: true,
                                        'aria-label': 'price'
                                    }}
                                    InputProps={{ inputProps: { min: 0 } }}
                                    name="price"
                                    value={editGood.price}
                                    onChange={e => onChange(e.target.value, e.target.name)}
                                    min={0}
                                    max={99999}
                                    error={editGood.price < 0 || editGood.price > 99999}
                                    helperText={editGood.price < 0 || editGood.price > 99999 ? "請填寫位於0~99999之間的數字" : ""}
                                    onBlur={() => checkDisabled()}
                                />
                            </Box>
                        </Box>
                        <Box my={3} >
                            <TextField
                                style={{ width: '50%', minWidth: '300px' }}
                                id="standard-multiline-static"
                                label="物品敘述"
                                name="description"
                                multiline
                                rows={4}
                                value={editGood.description}
                                onChange={e => onChange(e.target.value, e.target.name)}
                                error={editGood.description === ""}
                                helperText={editGood.description === "" ? "物品敘述不可為空" : ""}
                                onBlur={() => checkDisabled()}
                            />
                        </Box>
                        <Box my={3}>
                            <TextField
                                style={{ width: '50%', minWidth: '300px' }}
                                id="standard-basic"
                                label="所在地"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'location'
                                }}
                                name="location"
                                value={editGood.location}
                                onChange={e => onChange(e.target.value, e.target.name)}
                            />
                        </Box>
                        <Box my={3}>
                            <TextField
                                style={{ width: '50%', minWidth: '300px' }}
                                id="standard-basic"
                                label="標籤(請用半形逗號「,」分開)"
                                InputLabelProps={{
                                    shrink: true,
                                    'aria-label': 'tag'
                                }}
                                name="tag"
                                value={tagsString}
                                onChange={e => onChange(e.target.value, e.target.name)}
                                error={tagsString.split(",").length > 1 && tagsString.split(",").some(x => x === "" || x === " ")}
                                helperText={tagsString.split(",").length > 1 && tagsString.split(",").some(x => x === "" || x === " ") && "請勿填寫空白標籤"}
                            />
                        </Box>
                        <Box mt={4} mb={2}>
                            {editType === "編輯" ?
                                <>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => update()}
                                        style={{ marginRight: 10 }}
                                        disabled={submitButtomDisabled}
                                    >更新</Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => {
                                            setIsEdit(false)
                                        }}
                                    >取消</Button>
                                </>
                                :
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => saveGood()}
                                    disabled={submitButtomDisabled}
                                >新增物品</Button>
                            }
                        </Box>
                        <FormControl style={{ width: '50%', minWidth: '300px' }}>
                            <FormHelperText id="component-error-text">網頁需要一段時間處理資料，更新後幾分鐘內無法搜尋到新增資料為正常現象喔</FormHelperText>
                        </FormControl>
                    </form>
                </Box>
            }
        </>
    );
}