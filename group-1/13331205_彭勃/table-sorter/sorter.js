function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesSortable(tables) {
    var thead = new Array(1), ths;
    function sort(table) {
        var ths, thid = -1, x;
        var thead = table.getElementsByTagName("thead");
        if (thead[0]) {
            ths = thead[0].getElementsByTagName("th");
            x = 0;
        } else {
            var trs = table.getElementsByTagName("tr");
            ths = trs[0].getElementsByTagName("td");
            x = 1;
        }
        for (i = ths.length - 1; i >= 0 && thid == -1; --i)
            if (ths[i].className.match(RegExp('(\\s|^)sortByThis(\\s|$)'))) {
                thid = i;
                ths[i].className = ths[i].className.replace(RegExp('(\\s|^)sortByThis(\\s|$)'), '')
            } // 寻找class中的标记
        var dir = !!ths[thid].className.match(RegExp('(\\s|^)ascend(\\s|$)'));
        // dir = true为降序 dir = false为升序
        var tbody = table.getElementsByTagName("tbody");
        var trs = tbody[0].getElementsByTagName("tr");
        var tds = new Array(trs.length);
        var temp;
        for (i = trs.length - 1; i >= 0; --i)
            tds[i] = trs[i].getElementsByTagName("td");
        // tds为二维数组储存所有tbody中的td元素
        var flag = true;
        for (i = trs.length - 1; i > x && flag; --i) {
            flag = false;   // 内层循环结束后flag仍为false则表明已经有序
            for (j = x; j < i; ++j)
                if (tds[j][thid].innerHTML > tds[j + 1][thid].innerHTML ^ dir) {
                    // 使用异或来判断升降序
                    flag = true;
                    for (k in tds[j]) {
                        temp = tds[j][k].innerHTML;
                        tds[j][k].innerHTML = tds[j + 1][k].innerHTML;
                        tds[j + 1][k].innerHTML = temp;
                    }
                }
        } // 冒泡排序，加入了一个简单优化
        for (i = ths.length - 1; i >= 0; --i)
            ths[i].className = ths[i].className.replace(RegExp('(\\s|^)((ascend)|(descend))(\\s|$)'), '');
        // 消除所有的升序和降序标记
        if (dir)
            ths[thid].className += " descend";
        else
            ths[thid].className += " ascend";
    }
    for (index = tables.length - 1; index >= 0; --index) {
        thead = tables[index].getElementsByTagName("thead");
        if (thead[0]) { // 判断表格是否含有<thead>标签，没有的话认为第一行<tr>为表头
            ths = thead[0].getElementsByTagName("th");
        } else {
            var trs = tables[index].getElementsByTagName("tr");
            ths = trs[0].getElementsByTagName("td");
        }
        for (i = ths.length - 1; i >= 0; --i) {
            ths[i].onclick = function () {
                this.className += " sortByThis"; // 在class中加入标记
                sort(this.parentNode.parentNode.parentNode);
            }
        }
    }
}

window.onload = function () {
    var tables = getAllTables();
    makeAllTablesSortable(tables);
}
