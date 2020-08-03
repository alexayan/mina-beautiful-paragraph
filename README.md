# mina-beautiful-paragraph

小程序纯文本段落排版美化。

- 完美的两端对齐（中英文混杂，且存在长英文文本）
- 标点不出现在行首

## usage

### install

`npm install mina-beautiful-paragraph --save`

### page.json

```json
{
  "usingComponents": {
    "BeautifulParagraph": "path/to/mina-beautiful-paragraph"
  }
}
```

### page.wxml

``` html
<BeautifulParagraph
  custom-class="custom-paragraph-class"
  content="{{texts}}"
  selectable="{{true}}"
  padding="{{35}}"
  />
```

### page.js

```javascript
Page({
  data: {
    texts: '文本文本'
  }
})
```

### page.wxss

```css
/* 自定义样式 */
.custom-paragraph-class{

}
```

## 组件支持的属性

|name|required|type|default|desc|
|---|---|---|---|---|
|custom-class|false|string|''||
|content|true|string|''|要排版的文本|
|selectable|false|boolean|true|文本是否可选中|
|padding|false|number|35|换行距离|
