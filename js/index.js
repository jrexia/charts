window.onload = function() {
    var app;
    //判断是否为苹果
    var isIPHONE = navigator.userAgent.toUpperCase().indexOf('IPHONE') != -1;

    // 元素失去焦点隐藏iphone的软键盘
    function objBlur(id, time) {
        if (typeof id != 'string') throw new Error('objBlur()参数错误');
        var obj = document.getElementById(id),
            time = time || 300,
            docTouchend = function(event) {
                if (event.target != obj) {
                    setTimeout(function() {
                        obj.blur();
                        document.removeEventListener('touchend', docTouchend, false);
                    }, time);
                }
            };
        if (obj) {
            obj.addEventListener('focus', function() {
                document.addEventListener('touchend', docTouchend, false);
            }, false);
        } else {
            throw new Error('objBlur()没有找到元素');
        }
    }

    if (isIPHONE) {
        var input = new objBlur('content1');
        input = null;
    }

    function IsPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"
        ];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    if (IsPC()) {
        $(window).resize(function() {
            $(".chart-box").css("margin-top", ($(window).height() - $(".chart-box").height()) / 2 + "px");
            $(".chart-box").css("margin-left", ($(window).width() - $(".chart-box").width()) / 2 + "px");
        });
        $(".chart-box").css("margin-top", ($(window).height() - $(".chart-box").height()) / 2 + "px");

        $(".chart-box").css("margin-left", ($(window).width() - $(".chart-box").width()) / 2 + "px");
    }
    // 设置聊天室标题宽度和父元素一样
    $(window).resize(function() {
        $(".chart-box .chat-list .title").css("width", ($(".chart-box .chat-list").width() + "px"));
    });
    $(".chart-box .chat-list .title").css("width", ($(".chart-box .chat-list").width() + "px"));

    // alert($(".content")[0].innerHTML);
    $('.content').keypress(function(e) {

        if (e.ctrlKey && e.which == 13 || e.which == 10 || e.which == 13) {

            e.preventDefault(); //屏蔽enter对系统作用。按后增加\r\n等换行
        }
    });



    document.onkeydown = function(e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            if ($(".content").val() == "") {

            } else {
                app.loadMore({ text: $(".content").val(), a: true });
                // alert($(".content").val());

                var myurl = "https://route.showapi.com/913-1?brand=&location=&platform=&question=" + $(".content").val() + "&showapi_appid=31610&userid=1&showapi_sign=794da37ef6d548bdb3faf07de393bc6d";
                $(".content").val("");
                $.ajax({
                    type: "get",
                    url: myurl,
                    dataType: "json",
                    success: function(json) {
                        app.loadMore(json.showapi_res_body.content);
                        $('.chat-txt').animate({ scrollTop: $(".chat-txt")[0].scrollHeight + 'px' });
                        console.log(json);
                    },
                    error: function(e) {
                        console.log(e);
                    }
                });
                // alert($('.chat-txt')[0].scrollHeight);
                $('.chat-txt').animate({ scrollTop: $(".chat-txt")[0].scrollHeight + 'px' });
            }
        }
    }



    $(".btn-post").click(function() {
        if ($(".content").val() == "") {

        } else {
            app.loadMore({ text: $(".content").val(), a: true });
            // alert($(".content").val());

            var myurl = "https://route.showapi.com/913-1?brand=&location=&platform=&question=" + $(".content").val() + "&showapi_appid=31610&userid=1&showapi_sign=794da37ef6d548bdb3faf07de393bc6d";
            $(".content").val("");
            $.ajax({
                type: "get",
                url: myurl,
                dataType: "json",
                success: function(json) {
                    app.loadMore(json.showapi_res_body.content);
                    $('.chat-txt').animate({ scrollTop: $(".chat-txt")[0].scrollHeight + 'px' });
                    console.log(json);
                },
                error: function(e) {
                    console.log(e);
                }
            });
            // alert($('.chat-txt')[0].scrollHeight);
            $('.chat-txt').animate({ scrollTop: $(".chat-txt")[0].scrollHeight + 'px' });
        }
    });


    var json = ["您好"];
    app = new Vue({
        el: '#app',
        data: {
            items: json,
        },
        methods: {
            loadMore: function(moreData) {

                this.items.push(moreData);
                $('.chat-txt').animate({ scrollTop: $(".chat-txt")[0].scrollHeight + 'px' });
            }
        }
    });
}