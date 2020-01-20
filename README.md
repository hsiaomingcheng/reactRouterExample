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
