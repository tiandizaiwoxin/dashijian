$('#logOut').on("click", function (e) {
    e.preventDefault()
    layer.confirm('确定要退出吗', { icon: 4, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = 'login.html'
        layer.close(index);
    });

})
$('.userText').hide()
$('.layui-nav-img').hide()
get()
function get() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            show(res.data)
        }
    })

}

function show(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎：' + name)
    var first = name[0].toUpperCase()
    if (user.user_pic) {
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.userText').hide()
    } else {
        $('.userText').html(first).show()
        $('.layui-nav-img').hide()
    }
}

$(window).resize(function () {
    location.reload()
})

