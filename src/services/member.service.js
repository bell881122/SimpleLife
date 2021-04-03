import BaseDataService from "services/_base.service";
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
            messageBoard: dt.messageBoard !== undefined ? dt.messageBoard : "每天一點點，邁向簡單幸福生活。"
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

    getById(uid, user, setState) {
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
                        console.log("成功新增使用者，ID: ", docRef.id);
                        member.id = docRef.id;
                        let memberDataService = new MemberDataService();
                        memberDataService.update(member.id, member);
                        setState(member);
                    })
                    .catch((e) => {
                        console.log(e);
                    });

                // this.create(member);
                // setState(member);
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

    getSimpleMemberData(uids, messageItems, setMessageItems) {
        let queryCondition = {
            where: [{
                key: "uid",
                operation: "in",
                condition: uids
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
                    if (i.memberIds.indexOf(dt.uid) > -1) {
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