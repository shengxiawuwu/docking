// 初始化页码器
function setPage(pageCount = 8, rowCount = 387, rootClassName, callback) {
    currentPage = 1;
    let docModule = document.getElementsByClassName(rootClassName)[0];
    let numberDomLists = docModule.getElementsByClassName('number');
    docModule.getElementsByClassName('el-pager')[0].innerHTML = ''
    docModule.getElementsByClassName('el-pagination__total')[0].innerText = '共 ' + rowCount + ' 条数据';
    if (pageCount < 6) {
        for (let i = 1; i <= pageCount; i++) {
            let elem = document.createElement('li');
            elem.className = 'number';
            elem.innerText = i;
            elem.setAttribute('key', i)
            docModule.getElementsByClassName('el-pager')[0].appendChild(elem)
        }
    } else {
        for (let i = 1; i <= 4; i++) {
            let elem = document.createElement('li');
            elem.className = 'number';
            elem.innerText = i;
            elem.setAttribute('key', i)
            docModule.getElementsByClassName('el-pager')[0].appendChild(elem)
        }
        let elemMore = document.createElement('li');
        elemMore.className = 'el-icon more btn-quicknext el-icon-more';
        elemMore.setAttribute('key', '')
        docModule.getElementsByClassName('el-pager')[0].appendChild(elemMore);
        let elemLast = document.createElement('li');
        elemLast.className = 'number';
        elemLast.innerText = pageCount;
        elemLast.setAttribute('key', pageCount)
        docModule.getElementsByClassName('el-pager')[0].appendChild(elemLast)
    }
    numberDomLists[currentPage - 1].className = 'number active';
    docModule.getElementsByClassName('btn-prev')[0].disabled = 'true';
    bindMoreIconEvent(numberDomLists, pageCount, docModule, callback);
    bindPagerEvent(numberDomLists, callback);
}
// 页码器之间往后翻页
function bindMoreIconEvent(numberDomLists, pageCount, docModule, callback) {
    let quicknextElem = docModule.getElementsByClassName('btn-quicknext')[0];
    if (quicknextElem) {
        quicknextElem.onclick = function () {
            linkNextPage(this, numberDomLists, pageCount, docModule, callback);
            callback({
                flag: 'onlyCurrentPage'
            })
        }
    }
}
// 往后翻页
function linkNextPage(obj, numberDomLists, pageCount, docModule, callback) {
    // 如果第二个数字是2，改为...并移除3，增加5，否则，移除dom
    let secondPage = numberDomLists[1];
    if (secondPage.innerText == 2) {
        secondPage.className = 'el-icon more btn-quickprev el-icon-more';
        secondPage.innerText = '';
        secondPage.setAttribute('key', '')
        bindPreIconEvent(numberDomLists, pageCount, docModule, callback);
        docModule.getElementsByClassName('el-pager')[0].removeChild(numberDomLists[1]);
    } else {
        docModule.getElementsByClassName('el-pager')[0].removeChild(secondPage);
    }
    // 如果倒数第二个数字比总页数少2，改为总页数-1，否则在前面追加dom
    if (obj.previousElementSibling.innerText < pageCount - 2) {
        let elem = document.createElement('li');
        elem.className = 'number';
        elem.innerText = Number(obj.previousElementSibling.innerText) + 1;
        elem.setAttribute('key', Number(obj.previousElementSibling.innerText) + 1)
        docModule.getElementsByClassName('el-pager')[0].insertBefore(elem, obj);
    } else {
        obj.className = 'number';
        obj.innerText = pageCount - 1;
        obj.setAttribute('key', pageCount - 1)
    }
    bindPagerEvent(numberDomLists, callback);
}
// 页码器之间往前翻页
function bindPreIconEvent(numberDomLists, pageCount, docModule, callback) {
    let quickprevElem = docModule.getElementsByClassName('btn-quickprev')[0];
    if (quickprevElem) {
        quickprevElem.onclick = function () {
            linkPrevPage(this, numberDomLists, pageCount, docModule, callback);
            callback({
                flag: 'onlyCurrentPage'
            })
        }
    }
}
// 往前翻页
function linkPrevPage(obj, numberDomLists, pageCount, docModule, callback) {
    // 如果第二个数字是4，改为2
    if (obj.nextElementSibling.innerText == 4) {
        obj.className = 'number';
        obj.innerText = '2';
        obj.setAttribute('key', '2')
    }
    // 大于等于4 obj后追加一个dom
    let elem = document.createElement('li');
    elem.className = 'number';
    elem.innerText = Number(obj.nextElementSibling.innerText) - 1;
    elem.setAttribute('key', Number(obj.nextElementSibling.innerText) - 1);
    docModule.getElementsByClassName('el-pager')[0].insertBefore(elem, obj.nextElementSibling);

    // 如果倒数第二个数字是总数-1，改为...，否则移除dom
    let len = numberDomLists.length;
    let lastSecondPage = numberDomLists[len - 2];
    if (lastSecondPage.innerText == pageCount - 1) {
        lastSecondPage.className = 'el-icon more btn-quicknext el-icon-more';
        lastSecondPage.innerText = '';
        lastSecondPage.setAttribute('key', '')
        bindMoreIconEvent(numberDomLists, pageCount, docModule, callback);
    } else {
        docModule.getElementsByClassName('el-pager')[0].removeChild(lastSecondPage);
    }
    bindPagerEvent(numberDomLists, callback);
}
// 绑定页码点击事件
function bindPagerEvent(numberDomLists, callback) {
    for (let i = 0; i < numberDomLists.length; i++) {
        numberDomLists[i].onclick = function () {
            setPageActive(this, numberDomLists);
            callback({
                newPage: numberDomLists[i].innerText
            })
        }
    }
}
// 页码点击事件
function setPageActive(obj, numberDomLists) {
    for (let i = 0; i < numberDomLists.length; i++) {
        numberDomLists[i].className = 'number';
    }
    obj.className = 'number active'
}
// 点击最后一页
function selectLastPage(pageCount = 8, rootClassName, callback) {
    let docModule = document.getElementsByClassName(rootClassName)[0];
    let numberDomLists = docModule.getElementsByClassName('number');
    docModule.getElementsByClassName('el-pager')[0].innerHTML = ''
    if (pageCount < 6) {
        for (let i = 1; i <= pageCount; i++) {
            let elem = document.createElement('li');
            elem.className = 'number';
            elem.innerText = i;
            elem.setAttribute('key', i)
            docModule.getElementsByClassName('el-pager')[0].appendChild(elem)
        }
    } else {
        let elemLast = document.createElement('li');
        elemLast.className = 'number';
        elemLast.innerText = 1;
        elemLast.setAttribute('key', 1)
        docModule.getElementsByClassName('el-pager')[0].appendChild(elemLast)
        let elemMore = document.createElement('li');
        elemMore.className = 'el-icon more btn-quickprev el-icon-more';
        elemMore.setAttribute('key', '')
        docModule.getElementsByClassName('el-pager')[0].appendChild(elemMore);
        for (let i = pageCount - 2; i <= pageCount; i++) {
            let elem = document.createElement('li');
            elem.className = 'number';
            elem.innerText = i;
            elem.setAttribute('key', i)
            docModule.getElementsByClassName('el-pager')[0].appendChild(elem)
        }
    }
    numberDomLists[numberDomLists.length - 1].className = 'number active';
    docModule.getElementsByClassName('btn-next')[0].disabled = 'true';
    bindPreIconEvent(numberDomLists, pageCount, docModule, callback);
    bindPagerEvent(numberDomLists, callback);
}

// 通过自定义属性查找dom
function getElementsByAttr(rootClassName, className, attr, value) {
    let docModule = document.getElementsByClassName(rootClassName)[0];
    let classList = docModule.getElementsByClassName(className);
    let doms = [];
    for (let i = 0; i < classList.length; i++) {
        if (classList[i].getAttribute(attr) == value) {
            doms.push(classList[i])
        }
    }
    return doms;
}
