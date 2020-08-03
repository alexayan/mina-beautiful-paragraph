import { splitCJKWord, splitPunctuationWord } from './utils';

Component({
  externalClasses: ['custom-class'],
  data: {
    needJustify: false,
    summaryWords: [],
    paragraphs: [],
  },

  properties: {
    content: {
      type: String,
      value: '',
      observer(newVal, oldVal) {
        if (oldVal && newVal && oldVal !== newVal) {
          this.formatSummary();
        }
      },
    },
    selectable: {
      type: Boolean,
      value: true,
    },
    padding: {
      type: Number,
      value: 35,
    },
  },

  lifetimes: {
    ready: function () {
      this.formatSummary();
    },
  },

  methods: {
    formatSummary() {
      this.setData({
        needJustify: false,
        summaryWords: [],
        paragraphs: [],
      }, () => {
        const query = this.createSelectorQuery()
        query.select('.bp').boundingClientRect()
        query.exec((res) => {
          if (!res[0]) {
            return;
          }
          const width = res[0].width;
          const summary = this.properties.content;
          if (!summary) {
            return;
          }
          const words = splitCJKWord(summary);
          this.setData({
            summaryWords: words,
            needJustify: false,
          }, () => {
            const splitIndex = [];
            const query = this.createSelectorQuery()
            query.selectAll('.flag').boundingClientRect()
            query.exec((res) => {
              const items = res[0];
              const len = items.length;
              let left = null;
              let right = null;
              let needJustify = true;
              const paragraphs = [];
              for (let i = 0; i < len; i++) {
                if (i % 2 === 0) {
                  left = items[i];
                  continue;
                }
                right = items[i];
                if (left.top !== right.top && (width - left.left > this.properties.padding)) {
                  needJustify = false;
                  splitIndex.push(+left.dataset.index);
                }
              }
              if (splitIndex.length > 0) {
                let p = '';
                words.forEach((item, i) => {
                  if (splitIndex.indexOf(i) > -1 && p) {
                    paragraphs.push(p);
                    p = '';
                    return;
                  }
                  p += (item.text || '');
                })
                if (p) {
                  paragraphs.push(p);
                  p = '';
                }
              }
              this.setData({
                needJustify,
                summaryWords: splitPunctuationWord(summary),
                paragraphs: paragraphs.map((p) => {
                  return splitPunctuationWord(p)
                }),
              })
            })
          })
        })
      })
    },
  },
});
