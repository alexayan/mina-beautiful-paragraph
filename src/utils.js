const PunctuationRegex = /([\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff][,，、。?？!！;；:：>》」）】@#$%~^&*/])/;

export function splitPunctuationWord(texts) {
  return (texts || '').split(PunctuationRegex).filter((item) => {
    return !!item;
  }).map((item) => {
    return {
      text: item,
    }
  })
}

export function splitCJKWord(texts) {
  const nCJK = /([^\u2e80-\u2eff\u2f00-\u2fdf\u3040-\u309f\u30a0-\u30fa\u30fc-\u30ff\u3100-\u312f\u3200-\u32ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\s-,，、。?？!！;；:：>》」）】]+)/g;
  let rtn = [];
  let lastIndex = 0;
  let match;
  do {
    match = nCJK.exec(texts);
    let leftStr;
    let matchStr;
    if (match) {
      leftStr = texts.slice(lastIndex, match.index);
      matchStr = match[0];
    } else {
      leftStr = texts.slice(lastIndex);
    }
    if (leftStr) {
      rtn.push({
        text: leftStr,
        type: 'cjk',
      })
      lastIndex += leftStr.length;
    }
    if (matchStr) {
      const prevWord = rtn[rtn.length - 1];
      let needHideAfterJustify = false;
      if (prevWord && prevWord.text[prevWord.text.length - 1] === ' ') {
        needHideAfterJustify = true;
      }
      rtn.push({
        text: '',
        type: 'flag',
        needHideAfterJustify,
      });
      rtn.push({
        text: matchStr,
        type: 'ncjk',
      });
      rtn.push({
        text: '',
        type: 'flag',
      });
      lastIndex += matchStr.length;
    }
  } while (match);
  return rtn;
}
