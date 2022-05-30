$(function(){
    // 点击去注册账号让 登录框隐藏，注册框显示
    $('#link_reg').click(function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击去登录让 注册框隐藏，登录框显示
    $('#link_login').click(function(){
        $('.login-box').show()
        $('.reg-box').hide()
    })
    const form=layui.form
    const layer=layui.layer
    form.verify({
         // 自定义一个叫 pwd 的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd:value=>{
        const pwd=$('#form_reg [name=password]').val()
        if(pwd!=value)return "两次密码不一样"
    }
    })
    // const baseUrl=`http://www.liulongbin.top:3007`
    // 注册功能
    $('#form_reg').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type:'POST',
            url:'/api/reguser',
            data:{
               username: $('#form_reg [name=username]').val(),
               password: $('#form_reg [name=password]').val(),
            },
            success:function(res){
                if(res.status!=0)return layer.msg(res.massge)
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })
    })
    // 登录功能
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'POST',
            url:'/api/login',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!=0)return layer.msg('登陆失败')
                layer.msg('登陆成功')
                // console.log(res);
                localStorage.setItem('token',res.token)
                location.href="/index.html"
            }
        })
    })
})