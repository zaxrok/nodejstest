/**
 * Created by bcchoi on 2015. 12. 2..
 */


// No 'Access-Control-Allow-Origin' header is present on the requested resource... ref:http://adrenal.tistory.com/16
// jsonp ref: http://dev.epiloum.net/1311

var Contents;
var ghostToken;
function Contents(){   // create instance
    this.init();
    // usage
    function fn(token){
        ghostToken = token;
        console.log(ghostToken);
    }
    this.getGhostToken(fn);
}

Contents.prototype.init = function(){

};
Contents.prototype.getGhost2Token = function(returnToken) {

    var _d = {
        grant_type: 'password',
        username: 'zaxrok@gmail.com',
        password: 'cbc0104&*',
        client_id:'ghost-admin'
    };
    $.ajax({
        url: "http://snap2.ghost.io/ghost/api/v0.1/authentication/token",
        type: "POST",
        data: _d,
        dataType: 'json',
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data){
            console.log(JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        }
    });
};
Contents.prototype.getGhostToken = function(returnToken){
    var tokenParams='grant_type=password&username=sjlim@isans.co.kr&password=12345678&client_id=ghost-admin';
    var request = this.createRequest();
    request.open('POST', 'http://106.243.134.230:2369/ghost/api/v0.1/authentication/token', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(tokenParams);
    function onReadyStateChange(){
        if (request.readyState == 4) {
            try{
                if(request.status == 200){
                    var token = JSON.parse(request.responseText);
                    returnToken(token.access_token);
                }
            }catch (err) {
                console.log(err.toString());
            }
        }
    }
    request.onreadystatechange = onReadyStateChange;
};

Contents.prototype.addImage = function(base64, fn){
    var request = this.createRequest();
    var uuid = this.generateUUID();
    request.open('PUT', 'https://api.github.com/repos/zaxrok/hello-world/contents/'+uuid+'.png', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', 'token cb46086a1186be31118611e4bdb0ba2d11fd47e6');
    var _d = {
        path: uuid+'.png',
        message: 'added a image',
        content: base64,
        committer: { name: "zaxrok", email: "bcc@isans.co.kr" },
        branch: 'master'
    };
    request.send(JSON.stringify(_d));
    function onReadyStateChange(){
        if(request.readyState == 4){
            try{
                JSON.parse(request.responseText, function(k, v) {
                    if(k == 'download_url') {
                        fn(v);
                    }
                    return v;
                });
            }catch (err) {
                console.log(err.toString());
            }
        }
    }
    request.onreadystatechange = onReadyStateChange;
};

Contents.prototype.addText = function(base64, fn){
    var request = this.createRequest();
    var uuid = this.generateUUID();
    request.open('PUT', 'https://api.github.com/repos/zaxrok/hello-world/contents/'+uuid+'.xml', true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.setRequestHeader('Authorization', 'token cb46086a1186be31118611e4bdb0ba2d11fd47e6');
    var _d = {
        path: uuid+'.xml',
        message: 'added a snap project file',
        content: base64,
        committer: { name: "zaxrok", email: "bcc@isans.co.kr" },
        branch: 'master'
    };
    request.send(JSON.stringify(_d));
    function onReadyStateChange(){
        if(request.readyState == 4){
            try{
                JSON.parse(request.responseText, function(k, v) {
                    if(k == 'download_url') {
                        fn(v);
                    }
                    return v;
                });
            }catch (err) {
                console.log(err.toString());
            }
        }
    }
    request.onreadystatechange = onReadyStateChange;
};

Contents.prototype.addPost = function(img, txt, fn){
    console.log(img);
    console.log(txt);

    var request = this.createRequest();
    request.open('POST', 'https://snap2.ghost.io/ghost/api/v0.1/posts', true);
    request.setRequestHeader('Authorization', 'Bearer '+ 'iyLAMB0vM0K2VMWuONNdUNesbng1XkzrS5ckfRUoSnW7n1v23aIJlojL7DKRsD8ZHS4St5cvAxCEQLSWg0LE8IX4DJfUhoYGgor3GEFbcYPSkN8N3lnONwAWgySwADi3q6VSmrbkREK51nIzC4jKagm9l1l0UcH1l9vJBKFutMFh9Ct3XpO9qSsPx5rPtLHyoqu25Z8MdX25Qt5kBzCtbI8CuuQd7I0cumn12AFwIQzWKMEJobseP0aj0L1DAJg');
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    var tag = null;
    var _d = {
        posts: [
            {
                status: "published",
                title: "Welcome to Ghost5",
                slug: "welcome-to-ghost5",
                markdown: "bcc",
                html: "",
                image: img,
                featured: false,
                page: false,
                language: "en_US",
                meta_title: null,
                meta_description: null,
                author: 1,
                created_at: "2014-04-15T12:36:28.353Z",
                created_by: 1,
                updated_at: "2014-04-15T12:36:28.353Z",
                updated_by: 1,
                published_at: "2014-04-15T12:36:28.363Z",
                published_by: 1,
                tags: tag
            }
        ]
    };
    request.send(JSON.stringify(_d));
    function onReadyStateChange(){
        if(request.readyState == 4){
            try{
                console.log(request.status+':' +
                    request.responseText);
            }catch (err) {
                console.log(err.toString());
            }
        }
    }
    request.onreadystatechange = onReadyStateChange;
};
Contents.prototype.wpTest = function() {

    var _d = {
        title: "Welcome to Ghost",
        content_raw: 'Hello world',
        tags: 'test'
    };
    $.ajax({
        url: "https://public-api.wordpress.com/rest/v1/sites/103569357/posts/new",
        type: "POST",
        data: _d,
        dataType: 'json',
        headers: {
            Authorization: 'Bearer y7PdMHC5%2ACDY%21jKkHzFBQzFJPNtzi7rrOhANjNIj%24XERM%40CQwU9TuL2YPUWpx3lO'
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data){
            console.log(JSON.stringify(data));
        },
        error: function (jqXHR, textStatus, errorThrown){
            console.log(jqXHR.responseText);
        }
    });
};

Contents.prototype.ajaxTest = function(img, txt, fn){
    var tag = null;
    var _d = {
        posts: [
            {
                status: "published",
                title: "Welcome to Ghost4",
                slug: "welcome-to-ghost4",
                markdown: "abc4",
                html: "",
                image: img,
                featured: false,
                page: false,
                language: "en_US",
                meta_title: null,
                meta_description: null,
                author: 1,
                created_at: "2014-04-15T12:36:28.353Z",
                created_by: 1,
                updated_at: "2014-04-15T12:36:28.353Z",
                updated_by: 1,
                published_at: "2014-04-15T12:36:28.363Z",
                published_by: 1,
                tags: tag
            }
        ]
    };
    var USERNAME = "sjlim@isans.co.kr";
    var PASSWORD = "12345678";
    $.ajax({
        url: "https://snap2.ghost.io/ghost/api/v0.1/posts",
        //url: "http://106.243.134.230:2369/ghost/api/v0.1/posts/",
        type: "POST",
        data: _d,
        dataType: 'json',
        headers: {
            //Authorization: "Basic " + btoa(USERNAME + ":" + PASSWORD)
            Authorization: 'Bearer '+ '8Tdgy04TcB5WpPB7c26RFJHuwcZ7r7Qtc6XMXHPkfOMqB2n1rC93aCVxMhJjicpDQE0xhbdG5IOgCMU6bLhNLkZHjD9eKJlDl6aUoBZdFagLDKeGpkUERPd33ocesvtHdHZW1pmuYTegk56LjSXhpqPtZG8aXPUNMaLZEbxGdGQjaUguq2urAvZYp6J1jzmg1YqBZBRgnTXTiAhdzcOnyr4eTcicvG4ooOeVZfbFb6Zi8nSHvFREmMyDpFgbiyw'
            //Authorization: 'Bearer ' + 'nN7yXkuQbTUlGPBjKGoB3gmKlMHo0dtl30wRkMnVkX4NdUIa01H7cOCpaWn0EJK0BaxVs84OKaSwiAMzE6HyiYfPcNTRy3SlVy8JWylgGW5UR64CzsxWVCKLzmQrehBwSRc1p9JTA7GgsBG8S5btGs2i9APsxaVe8yji63BuA20aeuO3ACAFXUvTgmIeKDJ4uVwmgUKSO5vdLoXXtF2uUBmhkciXw5cyAZcDsrzL2H59XyNvgPTFgOCVETfUr65'
        },
        contentType: "application/x-www-form-urlencoded; charset=UTF-8",
        success: function(data){
            //data - response from server
            fn('ok');
        },
        error: function (jqXHR, textStatus, errorThrown){
            fn('error');
        }
    });
};
// ref: https://msdn.microsoft.com/en-us/library/ms537505(v=vs.85).aspx
Contents.prototype.createRequest = function(){
    var xmlHttp = null;
    if (window.XMLHttpRequest) {
        // If IE7, Mozilla, Safari, and so on: Use native object.
        xmlHttp = new XMLHttpRequest();
    }
    else
    {
        if (window.ActiveXObject) {
            // ...otherwise, use the ActiveX control for IE5.x and IE6.
            xmlHttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
    }
    return xmlHttp;
};

// ref: http://jsfiddle.net/briguy37/2mvfd/
Contents.prototype.generateUUID = function() {
    var d = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random()*16)%16 | 0;
        d = Math.floor(d/16);
        return (c=='x' ? r : (r&0x3|0x8)).toString(16);
    });
    return uuid;
};
