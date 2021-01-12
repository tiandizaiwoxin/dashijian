function show() {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            var str = template('table', res)
            $('tbody').html(str)
        }
    })
}
show()
var layers = null
//点击新增按钮
$('.newTab').click(function () {
    layers = layui.layer.open({
        id: 1,
        resize: false,
        type: 1,
        title: '添加文章分类',
        content: $('#form').html(),
        area: '444px'
    });
})
//确认新增
$('body').on('submit', '.newform', function (e) {
    e.preventDefault()
    var data = $('.newform').serialize()
    $.ajax({
        method: 'post',
        url: '/my/article/addcates',
        data: data,
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            layui.layer.msg(res.message)
            show()
            setTimeout(function () {
                layui.layer.close(layers)
            }, 1000)
        }
    })
})
//点击编辑按钮
$('body').on('click', '.edit', function () {
    layers = layui.layer.open({
        id: 1,
        resize: false,
        type: 1,
        title: '修改文章分类',
        content: $('#form1').html(),
        area: '444px'
    });
    var id = $(this).attr('data-id')
    $.ajax({
        method: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            layui.form.val('form', res.data)
        }
    })
})
//确认修改
$('body').on('submit', '.editform', function (e) {
    e.preventDefault()
    var data = $('.editform').serialize()
    $.ajax({
        method: 'post',
        url: '/my/article/updatecate',
        data: data,
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            layui.layer.msg(res.message)
            show()
            setTimeout(function () {
                layui.layer.close(layers)
            }, 1000)
        }
    })
})

//点击删除
$('body').on('click', '.del', function () {
    var id = $(this).attr('data-id')
    layui.layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
        //do something
        $.ajax({
            method: 'get',
            url: '/my/article/deletecate/' + id,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                show()
            }
        })
        layer.close(index);
    })
})