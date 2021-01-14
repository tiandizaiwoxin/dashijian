$(function () {
    $.ajax({
        method: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            var str = template('select', res)
            $('[name=cate_id]').html(str)
            layui.form.render()
        }
    })

    tinymce.init({
        selector: '#mytextarea',
        language: 'zh_CN',
    })
    // initEditor()

    var options = {
        aspectRatio: 1 / 1,//裁剪框的比例
        viewMode: 1,//裁剪框不能超出图片范围
        preview: ".small",//预览区,设置多个相同盒子可以出现多个预览区
        guides: false,//去掉网格
        movable: false,//不许移动图片
        zoomable: false,//不许缩放图片
    }
    $('#image').cropper(options)

    $('#ok').click(function () {
        $('#file').click()
    })

    $('#file').change(function () {
        var url = URL.createObjectURL($('#file')[0].files[0])
        $('#image').cropper('replace', url)
    })

    var state = '已发布'
    $('#now').click(function () {
        state = '草稿'
    })

    $('.layui-form').submit(function (e) {
        e.preventDefault()
        var data = new FormData(this)
        data.append('state', state)
        var cas = $('#image').cropper('getCroppedCanvas', {
            width: 100,
            height: 100
        })//创建了一个画布用来存储裁剪的图片,返回值是一个标签元素
        cas.toBlob(function (e) {
            data.append('cover_img', e)
            show(data)
        })
    })
    function show(data) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: data,
            processData: false//不对数据进行urlencode编码
            , contentType: false//不改变Content-Type的值
            , success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg(res.message)
                window.parent.document.querySelector('#list').click()
            }
        })
    }
})