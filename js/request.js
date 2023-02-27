function commonAjax(method, url, params, done) {
    // 统一转换为大写便于后续判断
    method = method.toUpperCase()
    // 对象形式的参数转换为 urlencoded 格式
    let pairs = []
    for (let key in params) {
        pairs.push(key + '=' + params[key])
    }
    let querystring = pairs.join('&')
    let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new
        ActiveXObject('Microsoft.XMLHTTP')
    xhr.addEventListener('readystatechange', function () {
        console.log(this.readyState)
        if (this.readyState !== 4)
            return
        try {
            done(JSON.parse(this.responseText))
        } catch (e) {
            done(this.responseText)
        }
    })
    if (method === 'GET') {
        url += '?' + querystring
    }
    xhr.open(method, url)
    
    let data = null
    if (method === 'POST') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
        data = querystring
    }
    xhr.send(data)
}