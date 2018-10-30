/**
 * 2018-10-29
 * 公交实时信息
 */
function theSky() {
  let _this = this;

  _this.header = document.getElementById("header");
  _this.main = document.getElementById("main");
  function init(data) {
    var obj = {
      date: data.date,
      time: data.time
    };
    _this.theSky = new Proxy(obj, {
      set(target, prop, value) {
        if (prop == "date") {
          let date = $(_this.dl).find(".date");
          date[0].innerText = _this.theSky.date;
        }
        if (prop == "time") {
          let time = $(_this.dl).find(".time");
          time[0].innerText = _this.theSky.time;
        }
        Reflect.set(target, prop, value);
      },
      get(target, prop) {
        return Reflect.get(target, prop);
      }
    });

    _this.updateDate();
  }
  function initRoutes(data) {
    let obj = {
      routeName: data.routeName,
      waitRoutes: data.waitRoutes,
      waitTime: data.waitTime,
      runningTime: data.runningTime
    };
    _this.routes = new Proxy(obj, {
      set(target, prop, value) {
        if (prop == "waitRoutes" && value > 0) {
          let waitRoutes = $(_this.item).find(".waitRoutes");
          waitRoutes[0].innerHTML = value + "站";
        }
        if (prop == "waitTime") {
          let waitTime = $(_this.item).find(".waitTime");
          waitTime[0].innerHTML = "预计到达时间" + value + "分钟";
        }
        Reflect.set(target, prop, value);
      },
      get(target, prop) {
        return Reflect.get(target, prop);
      }
    });
    _this.updateItem();
  }
  function updateRoute() {
    let waitRoutes = _this.routes.waitRoutes;
    let waitTime = _this.routes.waitTime;
    if (waitTime > 1) {
      waitTime--;
    } else {
      waitTime = Math.round(Math.random() * 10 + 2);
      waitRoutes = Math.round(waitTime / 3);
    }
    if (waitRoutes * 3 > waitTime) {
      waitRoutes--;
    }
    _this.routes.waitRoutes = waitRoutes;
    _this.routes.waitTime = waitTime;
  }
  return {
    init: init,
    initRoutes: initRoutes,
    updateRoute: updateRoute
  };
}
theSky.prototype.updateDate = function() {
  let _this = this;
  /** let dl = util.createDom("dl");

  let dt_1 = util.createDom("dt");
  util.addValue(dt_1, _this.theSky.date);
  util.addClass(dt_1, "date");
  let dt_2 = util.createDom("dt");
  util.addValue(dt_2, _this.theSky.time);
  util.addClass(dt_2, "time");
  let dt_3 = util.createDom("dt");
  util.addValue(dt_3, "晴");
  let dt_4 = util.createDom("dt");
  util.addValue(dt_4, "25`16°");

  util
    .appendChild(dl, dt_1)
    .appendChild(dl, dt_2)
    .appendChild(dl, dt_3)
    .appendChild(dl, dt_4);
**/
  let dl = `
  <dl>
    <dt class='date'>${_this.theSky.date}</dt>
    <dt class='time'>${_this.theSky.time}</dt>
    <dt>晴</dt>
    <dt>25<sup>~</sup>17°</dt>
  </dl>
`;
  _this.header.innerHTML = dl;
  _this.dl = dl;
};
theSky.prototype.updateItem = function() {
  let _this = this;

  // let item = util.createDom("div");
  // util.addClass(item,"item");
  // let head = uitl.createDom("div");
  // util.createDom(head,"head");
  // let dl = util.createDom('dl');
  // let dt_1 = util.createDom('dt');
  // util.addValue(dt_1,_this.routes.routeName);
  // let dt_2 = util.createDom('dt');
  // util.createDom(dt_2,"距本站");
  let body = `
    <div class="head">
      <dl>
        <dt class="routeName">${_this.routes.routeName}路</dt>
        <dt>距本站</dt>
        <dt class="waitRoutes">${_this.routes.waitRoutes}站</dt>
      </dl>
    </div>
    <div class="body">
      <p>冬季：${_this.routes.runningTime}</p>
    </div>
    <div class="foot">
      <p class="waitTime">预计到达时间${_this.routes.waitTime}分钟</p>
    </div>`;
  let item = util.createDom("div");
  util.addClass(item, "item");
  item.innerHTML = body;

  _this.main.appendChild(item);
  _this.item = item;
};
/**
 * util 工具，可以控制处理一些错误
 * createDom----创建DOM节点
 * addClass ----添加class
 * addValue ----添加节点值
 * addAttr  ----添加节点属性
 * createTreeNode   ---- 优化创建DOM的方法 ---待实现
 */
var util = (function() {
  let _this = this;
  function createDom(flag) {
    return document.createElement(flag);
  }
  function createFragDom() {
    return document.createDocumentFragment();
  }
  function addClass(dom, ...name) {
    if (dom.nodeType == 1) {
      dom.classList.add(...name);
    } else {
      throw new TypeError("the Element  " + dom + " does not Element");
    }
    return this;
  }
  function addValue(dom, value, isFront = false) {
    if (dom.hasChildNodes()) {
      let text = document.createTextNode(value);
      if (isFront) {
        dom.insertBefore(text, dom.firstChild);
      } else {
        dom.appendChild(text);
      }
    } else {
      dom.innerText = value;
    }
    return this;
  }
  function addAttr(dom, attr, value) {
    if (dom.nodeType == 1) {
      dom.setAttribute(attr, value);
    } else {
      throw new TypeError("the Element  " + dom + " does not Element");
    }
  }
  function appendChild(dom, childNode) {
    dom.appendChild(childNode);

    return this;
  }
  function createTreeNode(node) {}
  function dateFormat() {
    let date = new Date();
    // 日期
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    let day = date.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    let week = date.getDay();
    // 换算周几
    switch (week) {
      case 0:
        week = "星期日";
        break;
      case 1:
        week = "星期一";
        break;
      case 2:
        week = "星期二";
        break;
      case 3:
        week = "星期三";
        break;
      case 4:
        week = "星期四";
        break;
      case 5:
        week = "星期五";
        break;
      case 6:
        week = "星期六";
        break;
    }
    let hour = date.getHours();
    if (hour < 10) {
      hour = "0" + hour;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
      minute = "0" + minute;
    }
    return {
      date: month + "月" + day + "日/" + week,
      time: hour + ":" + minute
    };
  }
  return {
    createDom: createDom,
    addClass: addClass,
    addValue: addValue,
    addAttr: addAttr,
    createTreeNode: createTreeNode,
    createFragDom: createFragDom,
    appendChild: appendChild,
    dateFormat: dateFormat
  };
})();
