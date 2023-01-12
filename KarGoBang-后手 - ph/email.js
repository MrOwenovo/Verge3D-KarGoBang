function sendMessage() {
    let email = $(".wrapper-input-2").val();
    if (email === "") {
        window.alert("输入信息不能为空");
        return;
    }
    $.ajax({
        type: "post",
        url: 'http://mch6xzsh3.neiwangyun.net/api/chat/sendMessage',
        async: true,
        data: {
            message:email,
        },
        dataType:"json",
        xhrFields:{
            withCredentials: true,
        },
        success: function (data) {
            if (data.code === 200) {
                close();
                //
            } else {
                window.alert(data.message);
            }
        },
        error: function () {
            window.alert("服务器未连接!");
        },
    });
}

function modifyUserCard(data) {  //防止信息超出的方案
    let me = data[0];
    let opponent = data[1];
    let myUsername=me.username;
    let myUserInfo = me.userInfo;
    let myuserScore = me.userScore;
    let mySex= myUserInfo.sex;
    let myIcon= myUserInfo.icon;
    let myMessage = myUserInfo.message;
    let mySessions = myuserScore.sessions;
    let myWinRate = myuserScore.winRate;
    let myPassNumber = myuserScore.passNumber;
    let mySexFlag;
    if (mySex === "男") {
        mySexFlag = "fa-mars";
    } else {
        mySexFlag = "fa-venus";
    }
    let oppUsername=opponent.username;
    let oppUserInfo = opponent.userInfo;
    let oppuserScore = opponent.userScore;
    let oppSex= oppUserInfo.sex;
    let oppIcon= oppUserInfo.icon;
    let oppMessage = oppUserInfo.message;
    let oppSessions = oppuserScore.sessions;
    let oppWinRate = oppuserScore.winRate;
    let oppPassNumber = oppuserScore.passNumber;
    let oppSexFlag;
    if (oppSex === "男") {
        oppSexFlag = "fa-mars";
    } else {
        oppSexFlag = "fa-venus";
    }
    $(function () {
    //修改用户card内容
        // $("#user1-h2").text(myUsername);
        $("#user1-h2").html("<h2 id=\"user1-h2\">"+myUsername+"<br>\n" +
            "            <span class=\"user1-span\">"+myMessage+"</span>\n" +
            "            <i id=\"user1-sex\" class=\"fa fa-mars i-user\" aria-hidden=\"true\" style=\"color: #0679a2; font-size: 1px;\"></i>\n" +
            "        </h2>");
        $("#user1-h2").css("font-size", "0.9em");
        $(".user1-span").css("font-size", "0.7em");

        $("#user2-h2").html("<h2 id=\"user1-h2\">"+oppUsername+"<br>\n" +
            "            <span class=\"user1-span\">"+oppMessage+"</span>\n" +
            "            <i id=\"user1-sex\" class=\"fa fa-mars i-user\" aria-hidden=\"true\" style=\"color: #0679a2; font-size: 1px;\"></i>\n" +
            "        </h2>");
        $("#user2-h2").css("font-size", "0.9em");

        // $(".navigation").css("top", "0px");
        $("#my-a-1").html(" <a id=\"my-a-1\" href=\"#\">\n" +
            "                <ion-icon name=\"game-controller-outline\"></ion-icon>\n" +
            "                总场次数 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            mySessions+
            "            </a>")
        $("#my-a-2").html("<a id=\"my-a-2\" href=\"#\">\n" +
            "                <ion-icon name=\"trophy-outline\"></ion-icon>\n" +
            "                游戏胜率 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            myWinRate+
            "            %</a>")
        $("#my-a-3").html("<a id=\"my-a-3\" href=\"#\">\n" +
            "                <ion-icon name=\"checkmark-done-outline\"></ion-icon>\n" +
            "                熄灯关数 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            myPassNumber+
            "            </a>")
        $("#opp-a-1").html(" <a id=\"opp-a-1\" href=\"#\">\n" +
            "                <ion-icon name=\"game-controller-outline\"></ion-icon>\n" +
            "                总场次数 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            oppSessions+
            "            </a>")
        $("#opp-a-2").html("<a id=\"opp-a-2\" href=\"#\">\n" +
            "                <ion-icon name=\"trophy-outline\"></ion-icon>\n" +
            "                游戏胜率 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            oppWinRate+
            "            %</a>")
        $("#opp-a-3").html("<a id=\"opp-a-3\" href=\"#\">\n" +
            "                <ion-icon name=\"checkmark-done-outline\"></ion-icon>\n" +
            "                熄灯关数 &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp\n" +
            oppPassNumber+
            "            </a>")
        $("#opp-a-5").attr("href", "javascript:openSendMessageWindow()");

        if (mySex === "女") {
            $("#user1-sex").css("color", "#e5275a");
            if (myIcon===null)
                $(".my-img").attr("src", "static/images/girl.png");
        }
        if (myIcon!==null) {
            $(".my-img").attr("src", myIcon);
        }

        if (oppSex === "男") {
            $("#user2-sex").css("color", "#277de3");
            if (oppIcon===null)
                $(".opp-img").attr("src", "static/images/boy.png");
        }
        if (oppIcon!==null) {
            $(".opp-img").attr("src", oppIcon);
        }
    });
};



function init() {
    myTImer=setInterval("waitForMessage()",1000)
}
function waitForMessage() {
    $.ajax({
        type:'get',
        url:'http://mch6xzsh3.neiwangyun.net/api/chat/getMessage',
        async:true,
        dataType:'json',
        xhrFields:{
            withCredentials : true,
        },
        success: function (data) {
            if (data.code === 200) {
                openGetMessageWindow(data.data);
            } else {
                //没有接收到
            }
        },
        error: function (data) {
            console.info("服务器未连接");
        },
    })
}



function close() {
    $(".email-card").fadeOut(500);
}
function closeGet() {
    $(".email-get").fadeOut(500);
}
