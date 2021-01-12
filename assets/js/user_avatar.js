var options = {
    aspectRatio: 1 / 1,//裁剪框的比例
    viewMode: 1,//裁剪框不能超出图片范围
    preview: ".small",//预览区,设置多个相同盒子可以出现多个预览区
    guides: false,//去掉网格
    movable: false,//不许移动图片
    zoomable: false,//不许缩放图片
}
$('#image').cropper(options)

$('#up').click(function () {
    $('#file').click()
})
$('#file').change(function () {//当文件选择标签发生改变时触发
    console.dir($(this)[0].files);//文件选择器获取到的文件信息存储在DOM元素中的files中，它是一个数组（可以存多个文件信息）
    var file = $(this)[0].files[0]
    var url = URL.createObjectURL(file)//将文件信息转换为路径（本地路径）
    $('#image').cropper('replace', url)//利用replace方法替换图像的src并重新构建cropper
})
$('#ok').click(function () {
    var cas = $('#image').cropper('getCroppedCanvas', {
        width: 100,
        height: 100
    })//创建了一个画布用来存储裁剪的图片,返回值是一个标签元素
    var base64url = cas.toDataURL('image/jpeg')//生成base64图片格式
    cas.toBlob(function (e) {
        console.log(e);//生成blob图片格式
    })
    $.ajax({
        method: 'post',
        url: '/my/update/avatar',
        data: {
            avatar: base64url
        },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg(res.message)
            }
            layui.layer.msg(res.message)
            window.parent.get()
        }
    })

})
