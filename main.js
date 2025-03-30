// ==UserScript==
// @name         B站删除粉丝勋章无需等待
// @namespace    https://space.bilibili.com/35192025
// @supportURL   https://space.bilibili.com/35192025
// @description  删除b站粉丝勋章时跳过等待的10秒
// @version      0.1.0
// @description  移除B站删除粉丝勋章时的10秒等待限制
// @author       boxie123
// @match        https://link.bilibili.com/p/center/index
// @grant        none
// @license      MIT
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  // 等待.link-popup-ctnr元素加载完成
  const waitForPopupContainers = () => {
    const containers = document.querySelectorAll('.link-popup-ctnr');
    if (containers && containers.length > 0) {
      // 为每个容器初始化观察器
      containers.forEach((container, index) => {
        console.log(container);
        initObserver(container);
      });
    } else {
      // 如果元素还没加载，等待100ms后重试
      setTimeout(waitForPopupContainers, 100);
    }
  };

  // 初始化MutationObserver
  const initObserver = (container) => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const confirmButton = node.querySelector('.bl-button--shallow[disabled]');
            if (confirmButton) {
              console.log("找到禁用的确认按钮，正在启用...");
              confirmButton.removeAttribute('disabled');
              confirmButton.classList.remove('bl-button--shallow');
              confirmButton.classList.add('bl-button--ghost');
            }
          }
        });
      });
    });

    // 监听配置
    observer.observe(container, {
      childList: true,
      subtree: true
    });
  };

  //     // 监听DOM变化，处理动态加载的容器
  //     const observeDocument = () => {
  //         const documentObserver = new MutationObserver((mutations) => {
  //             mutations.forEach((mutation) => {
  //                 mutation.addedNodes.forEach((node) => {
  //                     if (node.nodeType === Node.ELEMENT_NODE) {
  //                         const newContainers = node.querySelectorAll('.link-popup-ctnr');
  //                         if (newContainers.length > 0) {
  //                             console.log(`检测到${newContainers.length}个新的.link-popup-ctnr元素`);
  //                             newContainers.forEach((container) => initObserver(container));
  //                         }
  //                     }
  //                 });
  //             });
  //         });

  //         // 监听整个文档的变化
  //         documentObserver.observe(document.body, {
  //             childList: true,
  //             subtree: true
  //         });
  //     };

  // 启动脚本
  waitForPopupContainers();
  // observeDocument();
})();