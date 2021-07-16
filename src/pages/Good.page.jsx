import React from 'react';
import { useParams, useHistory, useRouteMatch } from "react-router-dom";
import { storage } from "js/firebase";

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { dangerColor } from "material-ui/custom.js";
import FileCopyIcon from '@material-ui/icons/FileCopy';
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { CurrentMemberContext } from "context/CurrentMemberContext.js";
import GoodDataService, { newGood as NewGood } from "services/good.service";
const GoodDetail = React.lazy(() => import('components/Good/GoodDetail.component.jsx'));
const GoodEdit = React.lazy(() => import('components/Good/GoodEdit.component.jsx'));
const GoBackBotton = React.lazy(() => import('tools/GoBackBotton.tool.jsx'));
const ModalBotton = React.lazy(() => import('tools/ModalBotton.tool.jsx'));

export default function Good() {
    let { id } = useParams();
    let { path } = useRouteMatch();
    const history = useHistory();
    const { currentMemberContext } = React.useContext(CurrentMemberContext);
    const [good, setGood] = React.useState();
    const [isMyGood, setIsMyGood] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [editType, setEditType] = React.useState("編輯");
    const [noMatch, setNoMatch] = React.useState(false);

    React.useEffect(() => {
        if (id && id !== "") {
            if (path.indexOf("add/:id") > -1) {
                setIsEdit(true);
                setEditType("複製")
            }
            else if (id === "add") {
                if (currentMemberContext) {
                    setIsEdit(true);
                    let newGood = NewGood("", "");
                    newGood.memberId = currentMemberContext.id;
                    setGood(newGood);
                    setEditType("新增");
                }
            } else {
                GoodDataService.getById(id, setGood, setNoMatch);
            }
        }
    }, [currentMemberContext, id, path]);

    React.useEffect(() => {
        if (good !== undefined &&
            good.memberId !== undefined &&
            currentMemberContext !== undefined &&
            currentMemberContext.id === good.memberId) {
            setIsMyGood(true);
        }
    }, [good, currentMemberContext]);

    React.useEffect(() => {
        if (noMatch) {
            history.push("/error")
        }
    }, [noMatch, history]);

    const deleteGood = () => {
        GoodDataService.delete(good.id)
            .then(() => {
                // console.log("物品已刪除");
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
                // console.log("物品圖片已刪除");
            }).catch(function (error) {
                console.log(error.code);
            });
        }).catch(function (error) {
            console.log(error.code);
        })
    }

    const copyGood = (goodId) => {
        setGood(NewGood("", good, true))
        history.push(`add/${goodId}`)
    }

    return (
        <Container maxWidth="sm">
            <>
                {good &&
                    <Box>
                        {!isEdit ?
                            <>
                                {isMyGood &&
                                    <Box my={2} display="flex">
                                        <Box mr="auto">
                                            <GoBackBotton />
                                        </Box>
                                        <Box mr={1}>
                                            <Button
                                                style={{
                                                    color: 'white',
                                                    minWidth: '45px',
                                                    padding: '6px',
                                                }}
                                                variant="contained"
                                                color="primary"
                                                onClick={() => setIsEdit(true)}
                                            ><EditIcon /></Button>
                                        </Box>
                                        <Box mr={1}>
                                            <Button
                                                style={{
                                                    color: 'white',
                                                    minWidth: '45px',
                                                    padding: '6px',
                                                }}
                                                variant="contained"
                                                color="secondary"
                                                onClick={() => copyGood(good.id)}
                                            ><FileCopyIcon /></Button>
                                        </Box>
                                        <Box>
                                            <ModalBotton
                                                variant="contained"
                                                style={{
                                                    color: 'white',
                                                    minWidth: '45px',
                                                    padding: '6px',
                                                    backgroundColor: dangerColor
                                                }}
                                                buttonText={<DeleteForeverIcon />}
                                                disabled={false}
                                                modalTitle="刪除物品"
                                                modalContentType="text"
                                                modalContent="確認要刪除物品嗎"
                                                modalAction={() => deleteGood()}
                                                modalActionButtonColor={dangerColor}
                                                actionText="刪除"
                                            />
                                        </Box>
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
        </Container>
    );
}