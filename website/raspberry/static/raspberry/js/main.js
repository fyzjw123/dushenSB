$(function() {

    // 搜索框样式与回车搜索事件
    $('#fakebox-input').click(function(event) {
        $(this).css('opacity','1');
    }).blur(function(event) {
        $(this).css('opacity','0');
    }).keydown(function(event){
        event.preventDefault();
        if(event.keyCode == 13){
            var music_name = $("input[name^='music_name']").val();
            search_music(music_name);
        }
    });

    $('.song_add a').click(function(event) {
        event.preventDefault();
        var type = $(this).parent().siblings('.song_type').text();
        var link = $(this).parent().siblings('.song_link').text();
        add_music(type, link);
        update_list();
    });

});

// 搜索音乐
function search_music(music_name) {

    $.ajax({
        url: '/search?music_name=%s' + music_name,
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(musics) {
            $('.search-result tr:gt(0)').remove();
            $.each(musics, function(key, music) {
                $('.search-result').append(
                    '<tr class="result-item" style="">'
                        +'<div class="song_type song_hidden">'+music.local+'</div>'
                        +'<div class="song_link song_hidden">'+music.link+'</div>'
                        +'<td class="song_title song_visible">'+music.title+'</td>'
                        +'<td class="song_singer song_visible">'+music.singer+'</td>'
                        +'<td class="song_album song_visible">'+music.album+'</td>'
                        +'<td class="song_add">'
                            +'<a href="">添加</a>'
                        +'</td>'
                    +'</tr>'
                );
            });
            $('.search-result').css('display','block');
        }
    });
}

// 添加音乐
function add_music(type, link) {

    $.ajax({
        url: '/music',
        type: 'put',
        dataType: 'json',
        data: {
            "type": type,
            "link": link
        },
        async: false,
        success: function(state) {
            alert(state.status);
        }
    });
}

// 更新播放列表
function update_list(music_name) {

    $.ajax({
        url: '/music_list',
        type: 'get',
        dataType: 'json',
        async: false,
        success: function(musics) {
            $('.left-panel ul').remove();
            $.each(musics, function(key, music) {
                $('.left-panel').append(
                    +'<ul class="playing-item">'
                        +'<li>'+music.title+'</li>'
                        +'<li>'+music.singer+'</li>'
                        +'<li>'+music.album+'</li>'
                    +'</ul>'
                );
            });
        }
    });
}