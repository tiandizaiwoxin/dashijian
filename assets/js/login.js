$(function () {
    $('#login_box a').click(function () {
        $('#login_box').hide()
        $('#reg_box').show()
    })
    $('#reg_box a').click(function () {
        $('#login_box').show()
        $('#reg_box').hide()
    })
    layui.form.verify({
        repwd: function (val) {
            if ($('#reg_box [name=password]').val() !== val) {
                return '两次密码输入不一致'
            }
        },
        pwd: [
            /^[\S]{6,12}$/,
            '请输入6-12位密码，不能输入空格'
        ]
    })
    $('#reg_box').submit(function (e) {
        e.preventDefault();
        var data = { username: $('#reg_box [name=username]').val(), password: $('#reg_box [name=password]').val() };
        $.post('/api/reguser', data, function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg('注册成功，请登录')
            $('#reg_box a').click()
        })
    })
    $('#login_box').submit(function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $('#login_box').serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                localStorage.token = res.token
                location.href = 'index.html'
            }
        })
    })
})