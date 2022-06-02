$(function () {
    const initArtCateList = () => {
        $.ajax({
            type: 'get',
            url: '/my/article/cates',
            success: res => {
                const htmlStr = template('tpl-table', res)
                $('tbody').empty().html(htmlStr)
            }
        })
    }
    const layer = layui.layer;
    let indexAdd = null
    $("#btnAddCate").click(() => {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialog-add').html()
        })
    });
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('添加图书失败')
                layer.msg('添加图书成功')
                initArtCateList()
                layer.close(indexAdd)
            }
        })
    })
    // 通过代理方式，为 btn-edit 按钮绑定点击事件
    let indexEdit = null;
    $("tbody").on("click", ".btn-edit", function () {
        // 弹出修改文章分类的弹窗
        indexEdit = layer.open({
            type: 1,
            area: ["500px", "250px"],
            title: "修改文章分类",
            content: $("#dialog-edit").html(),
        });
        const id = $(this).attr('data-id');
        $.ajax({
            type: 'get',
            url: '/my/article/cates/' + id,
            success: res => {
                layui.form.val('form-edit', res.data)
            }
        })
    });

    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();
        $.ajax({
            type: 'post',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: res => {
                if (res.status !== 0) return layer.msg('更新分类失败')
                layer.msg('更新分类成功')
                initArtCateList()
                layer.close(indexEdit)
            }
        })
    })
    $('tbody').on('click', '.btn-delete', function () {
        const id = $(this).attr('data-id')
        layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
            $.ajax({
                type: 'get',
                url: '/my/article/deletecate/' + id,
                success: res => {
                    if (res.status !== 0) return layer.msg('删除数据失败')
                    layer.msg('删除数据成功')
                    layer.close(index)
                    initArtCateList()
                }
            })
        })
    })
    initArtCateList()
})