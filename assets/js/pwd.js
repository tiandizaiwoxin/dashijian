layui.form.verify({
    pwd: [/[\S]{6,12}/, '请输入6~12位非空白密码'],
    newPwd: function (value) {
        if (value === $('input[name=oldPwd]').val()) {
            return '新密码不能与旧密码一样'
        }
    },
    rePwd: function (value) {
        if (value !== $('input[name=newPwd]').val()) {
            return '两次密码输入不一致！'
        }

    }
})

$('.layui-form').submit(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('密码修改成功，请重新登录')
            $('.layui-form')[0].reset()
            window.localStorage.removeItem('token')
            setTimeout(function () {
                window.parent.get()
            }, 2000)
        }
    })
})
$('input[type=reset]').click(function () {
    $('.layui-form')[0], reset()
})