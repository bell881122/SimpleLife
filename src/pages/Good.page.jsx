import React from 'react';
import { useParams, useHistory } from "react-router-dom";
import { storage } from "js/firebase";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import GoodDataService, { NewGood } from "services/good.service";
const GoodDetail = React.lazy(() => import('components/Good/GoodDetail.component.jsx'));
const GoodEdit = React.lazy(() => import('components/Good/GoodEdit.component.jsx'));
const GoBackBotton = React.lazy(() => import('tools/GoBackBotton.tool.jsx'));

export default function Good() {
    let { id } = useParams();
    const history = useHistory();

    const [currentMemberContext] = React.useContext(CurrentMemberContext);
    const [good, setGood] = React.useState();
    const [isMyGood, setIsMyGood] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [editType, setEditType] = React.useState("編輯");

    React.useEffect(() => {
        if (id !== "") {
            if (id === "add" && currentMemberContext !== undefined) {
                setIsEdit(true);
                let newGood = NewGood.data;
                newGood.memberId = currentMemberContext.uid;
                setGood(newGood);
                setEditType("新增")
            } else {
                GoodDataService.getById(id, setGood);
            }
        }
    }, [currentMemberContext, id]);


    React.useEffect(() => {
        if (good !== undefined &&
            good.memberId !== undefined &&
            currentMemberContext !== undefined &&
            currentMemberContext.uid === good.memberId) {
            setIsMyGood(true);
        }
    }, [good, currentMemberContext]);

    const deleteGood = () => {
        GoodDataService.delete(good.id)
            .then(() => {
                console.log("物品已刪除");
                history.push("/user");
            })
            .catch((e) => {
                console.log(e);
            });

        //刪除圖片
        let imagePathAndName = `good/${good.id}-main.jpg`;
        let storageRef = storage.ref().child(imagePathAndName);
        storageRef.getDownloadURL().then(function (url) {
            storageRef.delete().then(function () {
                console.log("物品圖片已刪除");
            }).catch(function (error) {
                console.log(error.code);
            });
        }).catch(function (error) {
            console.log(error.code);
        })
    }

    return (
        <>
            {good &&
                <Box position="relative">
                    {!isEdit ?
                        <>
                            <Box position="absolute" style={{ top: 15 }}>
                                <GoBackBotton />
                            </Box>
                            {isMyGood &&
                                <Box position="absolute" style={{ top: 15, right: 0 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setIsEdit(true)}

                                    >編輯</Button>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginLeft: 5, marginRight: 10 }}
                                        onClick={() => deleteGood()}
                                    >刪除</Button>
                                </Box>
                            }
                            <GoodDetail good={good} />
                        </>
                        :
                    <GoodEdit good={good} setGood={setGood} setIsEdit={setIsEdit} editType={editType} setEditType={setEditType} />
                    }
                </Box>
            }
        </>
    );
}