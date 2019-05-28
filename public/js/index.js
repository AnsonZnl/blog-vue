var ip = 'http://localhost:3000'

// 注册页
function login(){
            var name = $('#login-name').val();
            var password = $('#login-password').val();
            var repassword = $('#login-repassword').val();
            var bio = $('#bio').val();
            var gender = $('#login-gender').val();
            var avatar;
            if ($('#file')[0].files.length == 1) {
                avatar = $('#file')[0].files[0]
            } else {
                avatar = ''
            }
            var data = new FormData();
    
            data.append('name',name);
            data.append('password',password);
            data.append('repassword',repassword);
            data.append('gender',gender);
            data.append('avatar',avatar);
            data.append('bio',bio);
            console.log(1, data)
    
            //avatar格式错误报错,不上传头像正常，上传头像报错
            if (!(name.length >= 1 && name.length <= 10)) {
                alert('名字请限制在 1-10 个字符')
                return
            }
            if (['m', 'f', 'x'].indexOf(gender) === -1) {
                alert('性别只能是 m、f 或 x')
                return
            }
            if (!(bio.length >= 1 && bio.length <= 30)) {
                alert('请填写合适的简介字数')
                return
            }
            if (password.length < 6) {
                alert('密码至少 6 个字符')
                return
            }
            if (password !== repassword) {
                alert('两次输入密码不一致')
                return
            }
            $.ajax({
                url: ip + '/login/post',
                type: 'post',
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                success: function (r) {
                    console.log(3, r)
                    // alert(r.message);
                    location.href = '/blog'
                }, error: function (r) {
                    console.log(1111, r)
                }
            })
}

// 登陆页
function signin(){
            var name = $('#signin-name').val()
            var password = $('#signin-password').val()
            if (name && password) {
                $.ajax({
                    url: ip+'/signin',
                    type: 'post',
                    data: {name: name, password: password},
                    success: function (r) {
                        console.log(3, r)
                        if (r.status == 200) {
                            location.href = '/blog'
                        }else{
                            //用户名或密码错误
                            alert(r.message)
                        }
                    }
                })
            } else {
                alert('用户名或密码不能为空')
            }
}

// 添加文章
function blogCreate() {
        var title = $('#blog-create-title').val()
        var content = $('#blog-create-content').val()
        if (title && content) {
            $.ajax({
                url: ip+'/blog/create',
                type: 'post',
                data: {title: title, content: content},
                success: function (r) {
                    console.log(3, r)
                    if (r.status == 200) {
                        location.href = '/blog/' + r.blogId
                    } else {
                        //用户名或密码错误
                        alert(r.message)
                    }
                }
            })
        } else {
            alert('标题或内容不能为空')
        }
}
// 修改文章
function editSubmit(){
        var title = $('#edit-title').val()
        var content = $('#edit-content').val()
        if (title && content) {
            $.ajax({
                url: location.href,
                type: 'post',
                data: {title: title, content: content},
                success: function (r) {
                    console.log(3, r)
                    if (r.status == 200) {
                        location.reload()
                    }
                }
            })
        } else {
            alert('标题或内容不能为空')
        }
}

//删除文章
function del() {
    var blogId = $('#del').attr('data-id')
     console.log(blogId)
    $.ajax({
        url: ip+'/blog/' + blogId + '/remove',
        type: 'get',
        success: function (r) {
            location.href = '/blog/' + r.blogId;
            alert('删除成功！')
        }
    })
}

// 插件
$(document).ready(function () {
    // 点击按钮弹出下拉框
    $('.ui.dropdown').dropdown();
    //登出
    $(".logout").click(function () {
        $.ajax({
            url: ip+'/logout',
            type: 'get',
            success: function (r) {
                location.href = '/blog'
            }
        })
    })
    // $("#smllLogout").click(function () {
    //     console.log(1)
    //     $.ajax({
    //         url: ip + 'logout',
    //         type: 'get',
    //         success: function (r) {
    //             location.href = '/blog'
    //         }
    //     })
    // })
})