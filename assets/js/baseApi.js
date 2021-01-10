$.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url
    if (options.url.includes('/my/')) {
        options.headers = {
            Authorization: localStorage.token || ''
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message.includes('身份认证失败')) {
            localStorage.removeItem('token')
            location.href = 'login.html'
        }
    }
})