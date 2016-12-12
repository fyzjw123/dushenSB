$(function() {

    update_list();
    $('#search-note').css('display','none');

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
        var type = $(this).attr('local');
        var link = $(this).attr('link');
        add_music(type, link);
        update_list();
    });

});

// 搜索音乐
function search_music(music_name) {

    $.ajax({
        url: 'search?music_name=' + music_name,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(musics) {
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
        type: 'post',
        dataType: 'json',
        data: {
            "type": type,
            "link": link
        },
        async: false,
        success: function(state) {
        },
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
        },
        error: function() {
            alert("播放列表请求错误！");
        }
    });
}
