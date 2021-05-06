import React from 'react';

import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

var privacyPolicy = [
    {
        title: "隱私權保護政策的適用範圍",
        context: "隱私權保護政策內容，包括本網站如何處理在您使用網站服務時收集到的個人識別資料。隱私權保護政策不適用於本網站以外的相關連結網站，也不適用於非本網站所委託或參與管理的人員。"
    }, {
        title: "個人資料的蒐集、處理及利用方式",
        list: [
            "當您造訪本網站或使用本網站所提供之功能服務時，我們將視該服務功能性質，請您提供必要的個人資料，並在該特定目的範圍內處理及利用您的個人資料；非經您書面同意，本網站不會將個人資料用於其他用途。",
            "本網站在您使用服務信箱、問卷調查等互動性功能時，會保留您所提供的姓名、電子郵件地址、聯絡方式及使用時間等。",
            "於一般瀏覽時，伺服器會自行記錄相關行徑，包括您使用連線設備的IP位址、使用時間、使用的瀏覽器、瀏覽及點選資料記錄等，做為我們增進網站服務的參考依據，此記錄為內部應用，絕不對外公佈。",
        ]
    }, {
        title: "著作權保護",
        context: "您完整保有於本網站上傳、刊登的所有圖文資料著作權，本網站僅於取得著作財產權人同意或授權後，方得利用。"
    }, {
        title: "資料之保護",
        list: [
            "本網站託管於設有防火牆、防毒系統等相關的各項資訊安全設備，採用嚴格的保護措施的第三方平台，加以保護網站及您的個人資料，只由經過授權的人員才能接觸您的個人資料，如有違反保密義務者，將會受到相關的法律處分。",
            "如因業務需要有必要委託其他單位提供服務時，本網站亦會嚴格要求其遵守保密義務，並且採取必要檢查程序以確定其將確實遵守。"
        ]
    }, {
        title: "網站對外的相關連結",
        context: "本網站的網頁提供其他網站的網路連結，您也可經由本網站所提供的連結，點選進入其他網站。但該連結網站不適用本網站的隱私權保護政策，您必須參考該連結網站中的隱私權保護政策。"
    }, {
        title: "與第三人共用個人資料之政策",
        context:
            "本網站絕不會提供、交換、出租或出售任何您的個人資料給其他個人、團體、私人企業或公務機關，但有法律依據或合約義務者，不在此限。前項但書之情形包括不限於：",
        list: [
            "經由您書面同意。",
            "法律明文規定。",
            "為免除您生命、身體、自由或財產上之危險。",
            "與公務機關或學術研究機構合作，基於公共利益為統計或學術研究而有必要，且資料經過提供者處理或蒐集著依其揭露方式無從識別特定之當事人。",
            "當您在網站的行為，違反服務條款或可能損害或妨礙網站與其他使用者權益或導致任何人遭受損害時，經網站管理單位研析揭露您的個人資料是為了辨識、聯絡或採取法律行動所必要者。",
            "有利於您的權益。",
            "本網站委託廠商協助蒐集、處理或利用您的個人資料時，將對委外廠商或個人善盡監督管理之責。"
        ]
    }, {
        title: "Cookie之使用",
        context: "為了提供您最佳的服務，本網站會在您的瀏覽裝置中放置並取用我們的Cookie，若您不願接受Cookie的寫入，您可在您使用的瀏覽器功能項中設定隱私權等級為高，即可拒絕Cookie的寫入，但可能會導至網站某些功能無法正常執行 。"
    }, {
        title: "隱私權保護政策之修正",
        context: "本網站隱私權保護政策將因應需求隨時進行修正，修正後的條款將刊登於網站上。"
    }
];

export default function User() {


    return (
        <Box my={6} mx={3}>
            <Typography component="h1" variant="h4" color="textPrimary" gutterBottom>
                本網站隱私權政策與授權條款
            </Typography>
            <Typography component="p" variant="body" color="textPrimary" gutterBottom >
                歡迎使用 Simple Life（以下簡稱本網站），為了讓您能夠安心使用本網站的各項服務與資訊，特此向您說明本網站的隱私權保護政策，以保障您的權益，請詳閱下列內容：
            </Typography>
            {privacyPolicy.map((value) => (
                <Box my={4}>
                    <Typography component="h2" variant="h5" color="textPrimary" gutterBottom >
                        {value.title}
                    </Typography>
                    {value.context &&
                        <Typography component="p" variant="body" color="textPrimary" gutterBottom>
                            {value.context}
                        </Typography>
                    }
                    {value.list &&
                        <ul style={{marginLeft:'-20px'}}>{value.list.map((item) => (
                            <li>{item}</li>
                        ))}
                        </ul>
                    }
                </Box>
            ))}


        </Box>
    );
}