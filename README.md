# React Router Example
基本的React Router使用範例

需要特別注意到一點，因為我使用webpack
在devServer這裡需加上一行
```
devServer: {
  historyApiFallback: true
}
```
否則在非"/"路徑的頁面都會無法顯示，只出現Cannot get

### 為什麼要在devServer加historyApiFallback: true  
[可以看這篇](https://stackoverflow.com/questions/27928372/react-router-urls-dont-work-when-refreshing-or-writing-manually?answertab=active#tab-top)  

解決的方法
1. 將BrowserRouter更換爲HashRouter
2. webpack中devServer添加historyApiFallback: true

[以下解答來自這篇](https://www.twblogs.net/a/5c7bd14fbd9eee339918b1c7)  
一般網頁分為服務端渲染與客戶端渲染。
而webpack-dev-server實質是提供了一個簡單的web服務器，本質上是一個小型的Node.js Express服務器。
那麼使用webpack-dev-server後，訪問頁面實際上走的是一個服務端渲染的過程，如果最後找不到要渲染的內容，那麼就會報404。

方法一中將BrowserRouter改爲HashRouter，頁面的url就變成 http://localhost:5566/#/xxx 的形式，在hash標識(#)後的部分不會被髮送到服務器端，服務器只接收到 http://localhost:5566 ，返回首頁以及包含React、React-Router的js代碼，而訪問其它頁面時，走的是客戶端渲染。

好了，現在通過設置historyApiFallback爲true，解決了頁面無法訪問的問題。然後我想要價格列表詳情頁，如果如下：

<Route exact path="/list/detai" component={ Detail } />
然後發現頁面又不能訪問了，瀏覽器報錯404:GET http://localhost:5566/list/app.js 404 (Not Found)。這又是爲什麼呢？經過資料查找，發現webpack的output中有一個配置項publicPath需要注意。publicPath指定在瀏覽器中所引用的「此輸出目錄對應的公開URL」，默認值爲一個空字符串""。也就是說，如果不設置這個值，那麼在模版文件(index.html)中引入的js文件地址爲：

<script src="app.js"></script>
所有，當頁面訪問 http://localhost:5566/list/detail 時，其中引用的js文件爲 http://localhost:5566/list/aap.js ，而這個文件是不存在的，因爲內存中這個文件和模版文件(index.html)都在dist的根目錄下。因此，爲了解決這一問題，需要手動設置publicPath的值：pulicPath: "/"，這個模版文件(index.html)中引入的js文件地址爲：

<script src="/app.js"></script>
當頁面訪問 http://localhost:5566/list/detail 時，其中引用的js文件爲 http://localhost:5566/aap.js 。

至此，在該環境下的頁面，都能正常訪問了。
