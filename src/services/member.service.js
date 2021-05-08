import BaseDataService from "services/_base.service";
import NotificationDataService from "services/notification.service";
let collection = "/members";

class Member {
    constructor(id, dt) {
        this.data = {
            id: id,
            uid: dt.uid,
            profile: {
                name: dt !== undefined ? dt.profile.name : "",
                email: dt !== undefined ? dt.profile.email : "",
                photoURL: dt !== undefined ? dt.profile.photoURL : "",
            },
            registerDate: dt.registerDate !== undefined ? dt.registerDate : Date.now(),
            messageBoard: dt.messageBoard !== undefined ? dt.messageBoard : "每天一點點，邁向簡單幸福生活。",
            scores: dt.scores !== undefined ? dt.scores : [],
            favorites: dt.favorites !== undefined ? dt.favorites : [],
        }
    }
}

class MemberDataService {

    create(data) {
        return BaseDataService.create(collection, data);
    }

    update(id, data) {
        return BaseDataService.update(collection, id, data);
    }

    getByUid(uid, user, setState, setIsNewMember) {
        let queryCondition = {
            where: [{
                key: "uid",
                operation: "==",
                condition: uid
            }]
        }
        BaseDataService.query(collection, queryCondition).then(snapshot => {
            let member;
            if (snapshot.docs.length === 0) {
                member = new Member("", user).data;

                this.create(member)
                    .then(function (docRef) {
                        // console.log("成功新增使用者，ID: ", docRef.id);
                        member.id = docRef.id;
                        let memberDataService = new MemberDataService();
                        memberDataService.update(member.id, member);
                        setState(member);
                        setIsNewMember(true);

                        NotificationDataService.createNotificationItem(member.id)
                    })
                    .catch((e) => {
                        console.log(e);
                    });
            } else {
                snapshot.forEach((item) => {
                    let dt = item.data();
                    member = new Member(dt.id, dt).data;
                    setState(member);
                });
            }
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    getById(id, setState) {
        let queryCondition = {
            where: [{
                key: "id",
                operation: "==",
                condition: id
            }]
        }
        BaseDataService.query(collection, queryCondition).then(snapshot => {
            snapshot.forEach((item) => {
                let dt = item.data();
                let member = new Member(dt.id, dt).data;
                setState(member);
            });
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }

    getSimpleMemberData(ids, messageItems, setMessageItems) {
        let queryCondition = {
            where: [{
                key: "id",
                operation: "in",
                condition: ids
            }]
        }

        BaseDataService.query(collection, queryCondition).then(snapshot => {

            // TODO:目前用迴圈塞資料，數量多時可能會有效能問題，要改寫法
            let chatMessageItems = messageItems;
            snapshot.forEach((item) => {
                let id = item.id;
                let dt = item.data();
                let member = new Member(id, dt).data;
                chatMessageItems.forEach(i => {
                    if (i.memberIds.indexOf(dt.id) > -1) {
                        i.chatMemberName = member.profile.name;
                        i.chatMemberPhotoUrl = member.profile.photoURL;
                    }
                })
            })
            setMessageItems(chatMessageItems);
        }).catch(error => {
            console.log("Error getting documents: ", error);
        });
    }
}

export default new MemberDataService();