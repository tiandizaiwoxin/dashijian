function show() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            // layui.layer.msg(res.message)
            console.log(res.data);
            layui.form.val('form', res.data)
        }
    })
}
show()
$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('res.message')
            }
            layui.layer.msg('res.message')
            window.parent.get()
        }
    })
})
$('button[type=reset]').click(function () {
    show()
})