//定义渲染页面所需的数据
var q = {
    pagenum: 1,
    pagesize: 2,
    cate_id: '',
    state: '',
}
//定义渲染页面的函数
template.defaults.imports.newDate = function (str) {
    return str.split('.')[0]
}
show()
function show() {
    $.ajax({
        method: 'get',
        url: '/my/article/list',
        data: q,
        success: function (res) {
            if (res.status !== 0) return layui.layer.msg(res.message)
            var str = template('table', res)
            $('tbody').html(str)
            render(res.total)
        }
    })
}
//定义筛选按钮
$('.filter').submit(function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    q.cate_id = cate_id
    q.state = state
    show()
})
//渲染下拉菜单
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
//定义删除按钮
$('tbody').on('click', '.del', function () {
    var id = $(this).attr('data-id')
    var num = $('.del').length
    layer.confirm('确定删除吗?', { icon: 3, title: '温馨提示' }, function (index) {
        //do something
        $.ajax({
            method: 'get',
            url: '/my/article/delete/' + id,
            success: function (res) {
                if (res.status !== 0) return layui.layer.msg(res.message)
                layui.layer.msg(res.message)
                if (num === 1) {
                    q.pagenum === 1 ? q.pagenum : q.pagenum--
                }
                show()
            }
        })
        layer.close(index);
    });
})
//渲染分页
function render(total) {
    layui.use('laypage', function () {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: q.pagesize
            , limits: [2, 4, 5, 6, 8, 10]
            , curr: q.pagenum
            , groups: 3
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                q.pagenum = obj.curr
                // console.log(obj.limit); //得到每页显示的条数
                q.pagesize = obj.limit
                //首次不执行
                if (!first) {
                    //do something
                    show()
                }
            }
        });
    });
}
