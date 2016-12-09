$(function() {

    $('#fakebox-input').click(function(event) {
        $(this).css('opacity','1');
    }).blur(function(event) {
        $(this).css('opacity','0');
    }).keydown(function(event){
        event.preventDefault();
        if(event.keyCode == 13){
            var music_name = $("input[name^='music_name']").val();
            request_music(music_name);
        }
    });

});

function request_music(music_name) {

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
                        +'<td>'
                            +'<a href="">添加</a>'
                        +'</td>'
                    +'</tr>'
                );
            }
            $('.search-result').css('display','block');
        }
    });
}