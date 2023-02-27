function messageTip(msg, duration = 3000) {
    let elem = document.createElement('div');
    elem.className = "errorTip";
    elem.innerText = msg;
    document.body.appendChild(elem);
    setTimeout(() => {
        document.body.removeChild(elem);
    }, duration)
}