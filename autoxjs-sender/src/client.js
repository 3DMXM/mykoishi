/*
 * @Author: initialencounter
 * @Date: 2023-07-01 22:04:50
 * @LastEditors: initialencounter
 * @LastEditTime: 2023-07-01 22:04:50
 * @FilePath: D:\dev\koishi-hmr\external\autoxjs-server\src\client.js
 * @Description: 请使用 AutoX.js 运行此脚本
 *
 * Copyright (c) 2023 by initialencounter, All Rights Reserved.
 */

importPackage(Packages["okhttp3"]); //导入包
const client = new OkHttpClient.Builder().retryOnConnectionFailure(true).build();

// 图片保存的路径
const IMG_PATH = "/sdcard/Pictures/";
const ENDPOINT = "ws://127.0.0.1:32327";

const request = new Request.Builder().url(ENDPOINT).build(); // ws 地址，
client.dispatcher().cancelAll();//清理一次


// 发送消息
function sendMsg(msg) {
    try {
        let { content, guildId, id } = JSON.parse(msg);
        if (guildId == 0) {
            id = id.slice(8,);
        }
        device.wakeUp();
        sleep(200);
        const id1 = content.indexOf('<image url="') + 12;
        if (id1 > 11) {
            sendImage(saveImage(getUrl(id1, content)), id)
        } else {
            // 发送文本
            sendText(id, content);
        }
        back();
    }
    catch (e) {
        console.log("W:\n", e);
    }
}

// 发送图片
function sendImage(imgUrl, qid) {
    const intent = app.intent({
        action: "SEND",
        packageName: "com.tencent.mobileqq",
        className: "com.tencent.mobileqq.activity.JumpActivity",
        root: true
    })
    intent.setType("image/*");
    intent.putExtra(Intent.EXTRA_STREAM, imgUrl);
    app.startActivity(intent);
    sleep(800);
    click(250, 270);
    for (var i of qid.slice(0, 2)) {
        KeyCode(parseInt(i) + 7);
        sleep(600);
    }
    text(`(${qid})`).findOne(2000).parent().click();
    text('发送').findOne(2000).click();
    sleep(300);
    back();
    back();
}

// 保存图片
function saveImage(url) {
    print('img-url:', url);
    const img = images.load(url);
    const filePath = IMG_PATH + getTime() + ".jpg";
    images.save(img, filePath, "jpg", 100);
    img.recycle();
    print("img-path", filePath);
    return filePath;
}

// 获取图片 url
function getUrl(id1, msg) {
    const id2 = msg.indexOf('"/>');
    const url = msg.slice(id1, id2);
    return url;
}

// 获取时间
function getTime() {
    const date = new Date();
    const date_str = date.toISOString();
    return date_str.replace(/:/g, '-').slice(0, 19);
}


// 发送文本
function sendText(qid, msg) {
    print(qid, ': ', msg);
    const intent = app.intent({
        action: "SEND",
        packageName: "com.tencent.mobileqq",
        className: "com.tencent.mobileqq.activity.JumpActivity",
        root: true
    })
    intent.putExtra(Intent.EXTRA_TEXT, msg);
    intent.setType("text/plain");
    app.startActivity(intent);
    sleep(500);
    click(250, 270);
    for (var i of qid.slice(0, 2)) {
        KeyCode(parseInt(i) + 7);
        sleep(600);
    }
    text(`(${qid})`).findOne(2000).parent().click();
    text('发送').findOne(2000).click();
    sleep(300);
    back();
    back();
}


const heartbeatInterval = 5000; // 心跳间隔时间，单位：毫秒
let heartbeatTimer = null;
// 客户端
myListener = {
    onOpen: function (webSocket, response) {
        print("连接到服务端");
        webSocket.send('xiaomi8');
        heartbeatTimer = setInterval(() => {
            webSocket.send('heartbeat'); // 发送心跳包
        }, heartbeatInterval);
    },
    onMessage: function (webSocket, msg) { //msg可能是字符串，也可能是byte数组，取决于服务器送的内容
        if (msg == "heartbeat") {
            print(getTime()+msg);
        } else {
            sendMsg(msg);
        }
    },
    onClosed: function (webSocket, code, response) {
        print("已关闭");
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
    }
}

const webSocket = client.newWebSocket(request, new WebSocketListener(myListener)); //创建链接

setInterval(() => { // 防止主线程退出

}, 1000);