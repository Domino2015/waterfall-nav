/**
 * Created by 993711336 on 2016/3/20.
 */
window.onload = function () {
    imgLocation("container", "box");
    //模拟数据传输
    var imgData={'data':[{'src':'1.png'},{'src':'2.png'},{'src':'3.png'},{'src':'4.jpg'}]};

    //监听滚动条
    window.onscroll = function () {
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i = 0;i<imgData.data.length;i++){
                var cconten=document.createElement("div");
                cconten.className="box";
                cparent.appendChild(cconten);
                var boximg=document.createElement("div");
                boximg.className="box_img";
                cconten.appendChild(boximg);
                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);
            }
            imgLocation("container", "box");
        }
    }

};
function checkFlag() {
    var cparent = document.getElementById("container");
    var ccontent = getChildElement(cparent, "box");
    var lastContentHeight = ccontent[ccontent.length - 1].offsetTop;
    //scrollTop-->隐藏页面的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    //页面的高度
    var pageHeight = document.documentElement.clientHeight || document.body.clientHeight;
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }


}
function imgLocation(parent, content) {
    //将parent下所有的content全部取出
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);

    var imgWidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = "width:" + imgWidth * num + "px";

    //获取第一排元素的高度，找最小高度
    var boxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
        if (i < num) {
            boxHeightArr[i] = ccontent[i].offsetHeight;
        } else {
            var minHeight = Math.min.apply(null, boxHeightArr);
            var minIndex = getMinHeightLocation(boxHeightArr, minHeight);

            ccontent[i].style.position = "absolute";
            ccontent[i].style.top = minHeight + "px";
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + "px";
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
}
function getMinHeightLocation(boxHeightArr, minHeight) {
    for (var i in boxHeightArr) {
        if (boxHeightArr[i] == minHeight) {
            return i;
        }
    }
}

function getChildElement(parent, content) {
    var contentArr = [];
    var allcontent = parent.getElementsByTagName("*");
    for (var i = 0; i < allcontent.length; i++) {
        if (allcontent[i].className == content) {
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}