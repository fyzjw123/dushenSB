$(function() {

    update_list();

    // 搜索框样式与回车搜索事件
    $('#fakebox-input').click(function(event) {
        $(this).css('opacity','1');
    }).blur(function(event) {
        $(this).css('opacity','0');
    }).keydown(function(event){
        event.preventDefault();
        if(event.keyCode == 13){
            $('#search-note').css('display','block');
            var music_name = $("input[name^='music_name']").val();
            search_music(music_name);
        }
    });

    $(document).on("click", ".song_add a", function(event) {
        event.preventDefault();
        var type = $(this).attr('type');
        var type = $(this).attr('link');
        //add_music(type, link);
        update_list();
    });

});

// 搜索音乐
function search_music(music_name) {

    $.ajax({
        url: 'raspberry/search?music_name=' + music_name,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(musics) {
            //musics = {"musics": [{"title": "\u4f60", "type": "sogou", "singer": "\u5468\u6df1", "link": "http://cc.stream.qqmusic.qq.com/C100003I2XqC4XF1LJ.m4a?fromtag=52", "album": "\u4f60"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5c60\u6d2a\u7eb2", "link": "http://cc.stream.qqmusic.qq.com/C100001odNuA3UfaMl.m4a?fromtag=52", "album": "\u81ea\u5df1\u4eba"}, {"title": "\u4f60", "type": "sogou", "singer": "\u8427\u656c\u817e", "link": "http://cc.stream.qqmusic.qq.com/C100003U0UQk0mSzXX.m4a?fromtag=52", "album": "\u72c2\u60f3\u66f2"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5a03\u5a03", "link": "http://cc.stream.qqmusic.qq.com/C100003eCSVL4VjNYY.m4a?fromtag=52", "album": "\u66d9\u5149"}, {"title": "\u4f60", "type": "sogou", "singer": "\u84dd\u53c8\u65f6", "link": "http://cc.stream.qqmusic.qq.com/C1000015Xstb0ZCOH4.m4a?fromtag=52", "album": "\u4f26\u6566\u7684\u7231\u60c5"}, {"title": "\u4f60", "type": "sogou", "singer": "\u8bb8\u5dcd", "link": "http://cc.stream.qqmusic.qq.com/C100003f37ef34QH3y.m4a?fromtag=52", "album": "\u5728\u8def\u4e0a\u2026"}, {"title": "\u4f60", "type": "sogou", "singer": "\u66f9\u79e6", "link": "http://cc.stream.qqmusic.qq.com/C100003sbNGe21U8hh.m4a?fromtag=52", "album": "\u7e41\u661f\u672a\u6cef"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5c1a\u96ef\u5a55", "link": "http://cc.stream.qqmusic.qq.com/C100003o2Rlc0Kj9Pu.m4a?fromtag=52", "album": "\u5728\u68b5\u9ad8\u7684\u661f\u7a7a\u4e0b"}, {"title": "\u4f60", "type": "sogou", "singer": "\u9a6c\u854a", "link": "http://cc.stream.qqmusic.qq.com/C100001j7MB32ik2Cj.m4a?fromtag=52", "album": "\u4e2d\u56fd\u98ce"}, {"title": "\u4f60", "type": "sogou", "singer": "\u9686\u52c7\u6c11\u8c23", "link": "http://cc.stream.qqmusic.qq.com/C100003Zz7WA4Y6tet.m4a?fromtag=52", "album": "\u8bb8\u98de"}, {"title": "\u4f60", "type": "sogou", "singer": "\u9093\u4e3d\u541b", "link": "http://cc.stream.qqmusic.qq.com/C100000Iv1QJ3UYbu7.m4a?fromtag=52", "album": "\u5de8\u661f\u73cd\u85cf\u7cfb\u52179-\u9ed8\u9ed8\u79bb\u60c5"}, {"title": "\u4f60", "type": "sogou", "singer": "\u8303\u73ae\u742a", "link": "http://cc.stream.qqmusic.qq.com/C100000yhLsB26CWCz.m4a?fromtag=52", "album": "\u771f\u5584\u7f8e"}, {"title": "\u4f60", "type": "sogou", "singer": "\u82cf\u9047", "link": "http://cc.stream.qqmusic.qq.com/C100000wJcfs2D8DYs.m4a?fromtag=52", "album": "\u5f00\u59cb"}, {"title": "\u4f60", "type": "sogou", "singer": "\u674e\u7acb\u5d34", "link": "http://cc.stream.qqmusic.qq.com/C1000028tdUM4fmnCc.m4a?fromtag=52", "album": "\u7ec8\u4e8e"}, {"title": "\u4f60", "type": "sogou", "singer": "\u8303\u6653\u8431", "link": "http://cc.stream.qqmusic.qq.com/C100002PjbKV1BLmKo.m4a?fromtag=52", "album": "\u7edd\u4e16\u540d\u4f36"}, {"title": "\u4f60", "type": "sogou", "singer": "\u9ed1\u94bb\u77f3", "link": "http://cc.stream.qqmusic.qq.com/C100001x83Mn1LETqq.m4a?fromtag=52", "album": "\u540c\u540d\u4e13\u8f91"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5468\u8def\u660e", "link": "http://cc.stream.qqmusic.qq.com/C100001VKSjQ1wMYEn.m4a?fromtag=52", "album": "\u5feb\u4e50\u7537\u58f0\u5468\u8def\u660e\u6b4c\u66f2"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5218\u8f89", "link": "http://cc.stream.qqmusic.qq.com/C100001LzJ9x31zhSU.m4a?fromtag=52", "album": "\u4e00\u6708\u7684\u6e56\u9762"}, {"title": "\u4f60", "type": "sogou", "singer": "\u7fa4\u661f", "link": "http://cc.stream.qqmusic.qq.com/C100001MWoQZ3u72dV.m4a?fromtag=52", "album": "\u65e5\u97e9\u7ecf\u5178\u4e00"}, {"title": "\u4f60", "type": "sogou", "singer": "\u6c6a\u5cf0", "link": "http://cc.stream.qqmusic.qq.com/C1000017Z0bZ3ybp38.m4a?fromtag=52", "album": "\u7231\u662f\u4e00\u9897\u5e78\u798f\u7684\u5b50\u5f39"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5218\u6587\u6b63", "link": "http://cc.stream.qqmusic.qq.com/C100001OfH4j1SrmmT.m4a?fromtag=52", "album": "\u91d1\u88c5\u5218\u6587\u6b63\u4e0d\u673d\u7ecf\u5178\u91d1\u66f2"}, {"title": "\u4f60", "type": "sogou", "singer": "\u9648\u51a0\u5e0c", "link": "http://cc.stream.qqmusic.qq.com/C100001fhsdO0MJW4c.m4a?fromtag=52", "album": "\u82f1\u7687\u51a0\u519b\u7cbe\u9009NO.1"}, {"title": "\u4f60", "type": "sogou", "singer": "\u6797\u6d77", "link": "http://cc.stream.qqmusic.qq.com/C100002Mq6RZ0M6hO6.m4a?fromtag=52", "album": "\u5f53\u4ee3\u97f3\u4e50\u9986-\u5668\u4e50\u6f14\u594f\u5bb6\u7cfb\u5217-\u6708\u5149\u8fb9\u5883"}, {"title": "\u4f60", "type": "sogou", "singer": "\u6df1\u84dd\u4e50\u56e2", "link": "http://cc.stream.qqmusic.qq.com/C100003EBkKA2rEfku.m4a?fromtag=52", "album": "\u53ea\u4e3a\u4f60\u6b4c\u5531"}, {"title": "\u4f60", "type": "sogou", "singer": "\u738b\u96c5\u6587", "link": "http://cc.stream.qqmusic.qq.com/C100000CVjDS20rZbb.m4a?fromtag=52", "album": "\u591c\u5f71"}, {"title": "\u4f60", "type": "sogou", "singer": "\u84dd\u7acb\u5e73", "link": "http://cc.stream.qqmusic.qq.com/C100000W9as526sfmk.m4a?fromtag=52", "album": "\u5f71\u5b50,\u8bf7\u6211\u8df3\u821e\u5427"}, {"title": "\u4f60", "type": "sogou", "singer": "\u6625\u5929", "link": "http://cc.stream.qqmusic.qq.com/C100001K2M4G2sXsWl.m4a?fromtag=52", "album": "\u6625\u5929\u97f3\u4e50\u4f5c\u54c1\u96c6"}, {"title": "\u4f60", "type": "sogou", "singer": "\u66fe\u8def\u5f97", "link": "http://cc.stream.qqmusic.qq.com/C100000i4xrf4UubjI.m4a?fromtag=52", "album": "\u6700\u52a8\u542c\u7684...\u66fe\u8def\u5f97"}, {"title": "\u4f60", "type": "sogou", "singer": "In Love", "link": "http://cc.stream.qqmusic.qq.com/C100002dMdP3259bmL.m4a?fromtag=52", "album": "\u534a\u6d53\u534a\u6de1"}, {"title": "\u4f60", "type": "sogou", "singer": "\u5730\u4e0b\u94c1", "link": "http://cc.stream.qqmusic.qq.com/C100003UykVc2npkfr.m4a?fromtag=52", "album": "\u5730\u4e0b\u94c1"}]};
            $('.search-result tr:gt(0)').remove();
            $.each(musics.musics, function(key, music) {
                $('.search-result').append(
                    '<tr class="result-item" style="">'
                        +'<td class="song_title song_visible">'+music.title+'</td>'
                        +'<td class="song_singer song_visible">'+music.singer+'</td>'
                        +'<td class="song_album song_visible">'+music.album+'</td>'
                        +'<td class="song_add">'
                            +'<a href="" local="'+music.type+'" link="'+music.link+'">添加</a>'
                        +'</td>'
                    +'</tr>'
                );
            });
            $('#search-note').css('display','none');
            $('.search-result').css('display','block');
        },
        error: function() {
            $('#search-note').css('display','block').text("抱歉，请求失败了。。。");
        }
    });
}

// 添加音乐
function add_music(type, link) {

    $.ajax({
        url: 'music',
        type: 'put',
        dataType: 'json',
        data: {
            "type": type,
            "link": link
        },
        async: false,
        success: function(state) {
        }
        error: function() {
            $('#search-note').css('display','block').text("抱歉，请求失败了。。。");
        }
    });
}

// 更新播放列表
function update_list(music_name) {

    $.ajax({
        url: 'music_list',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(musics) {
        //musics = {"musics": [{"album": "\u540e\u4f1a\u65e0\u671f", "type": "local", "link": "/home/pi/KeChuang/dushenSB/music/\u9ec4\u7956\u6ce2\\ -\\ \u5e73\u51e1\u4e4b\u8def\\ -\\ \u94c3\u58f0\u7248.mp3", "singer": "\u9ec4\u7956\u6ce2", "title": "\u5e73\u51e1\u4e4b\u8def"}, {"album": "\u6765\u751f", "type": "local", "link": "/home/pi/KeChuang/dushenSB/music/\u91d1\u5357\u73b2\\ -\\ \u9006\u6d41\u6210\u6cb3\\ -\\ \u94c3\u58f0\u7248.mp3", "singer": "\u91d1\u5357\u73b2", "title": "\u9006\u6d41\u6210\u6cb3"}, {"album": "\u6211\u7684\u5c11\u5973\u65f6\u4ee3", "type": "local", "link": "/home/pi/KeChuang/dushenSB/music/\u7530\u99a5\u7504\\ -\\ \u5c0f\u5e78\u8fd0\\ -\\ \u94c3\u58f0\u7248.mp3", "singer": "\u7530\u99a5\u7504", "title": "\u5c0f\u5e78\u8fd0"}, {"album": "\u8d70\u7740\u8d70\u7740\u5c31\u6563\u4e86", "type": "local", "link": "/home/pi/KeChuang/dushenSB/music/\u5e84\u5fc3\u598d\\ -\\ \u8d70\u7740\u8d70\u7740\u5c31\u6563\u4e86\\ -\\ \u94c3\u58f0\u7248.mp3", "singer": "\u5e84\u5fc3\u598d", "title": "\u8d70\u7740\u8d70\u7740\u5c31\u6563\u4e86"}]};
            $('.left-panel ul').remove();
            $.each(musics.musics, function(key, music) {
                $('.left-panel').append(
                    '<ul class="playing-item">'
                        +'<li>'+music.title+'</li>'
                        +'<li>'+music.singer+'</li>'
                        +'<li>'+music.album+'</li>'
                    +'</ul>'
                );
            });
        }
        error: function() {
            alert("播放列表请求错误！");
        }
    });
}
