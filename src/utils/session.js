/*
 * @Author: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @Date: 2022-09-28 08:27:49
 * @LastEditors: DESKTOP-CQREP7P\easy zhou03041516@163.com
 * @LastEditTime: 2022-09-28 08:35:52
 * @FilePath: \yujing-app\src\utils\session.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export default function resetSetItem  (key, newVal) {
    if (key === 'watchStorage') {
        // 创建一个StorageEvent事件
        var newStorageEvent = document.createEvent('StorageEvent');
        const storage = {
            setItem: function (k, val) {
                sessionStorage.setItem(k, val);
  
                // 初始化创建的事件
                newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
  
                // 派发对象
                window.dispatchEvent(newStorageEvent)
            }
        }
        return storage.setItem(key, newVal);
    }
      if (key === 'refresh') {
          // 创建一个StorageEvent事件
          // eslint-disable-next-line no-redeclare
          var newStorageEvent = document.createEvent('StorageEvent');
          const storage = {
              setItem: function (k, val) {
                  sessionStorage.setItem(k, val);
  
                  // 初始化创建的事件
                  newStorageEvent.initStorageEvent('setItem', false, false, k, null, val, null, null);
  
                  // 派发对象
                  window.dispatchEvent(newStorageEvent)
              }
          }
          return storage.setItem(key, newVal);
      }
  }
  
  