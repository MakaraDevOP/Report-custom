

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration 🤖👻

### Description of Method in Reports 🤖👻👾

```
    //ការបិត​​ record ទាំងអស់
    collapseAll() {
      this.expandedKeys = {};
    },
    //ការបើក record row
    expand(node) {
      node.data.total = node.data.prevtotal;
    },
    //ការបិត record row
    collapse(node) {
      var dataHead = node.data;
      var dataChild = node.children;
      //ការបន្ថែម prevtotal​ ដែលតម្លៃវា យក​​​ total ដើម
      dataHead.prevtotal = dataHead.total;
      //ការបញ្ចូល​តម្លៃវា យក​​​ total សរុប
      dataHead.total = this.findSummary(dataChild);
    },
    //ការស្វែងរក​ Total
    findSummary(data) {
      var total = null;
      for (var x of data) {
        if (x.data.row == "SummaryRow") {
          total = x.data.total;
        }
      }
      return total;
    },
    //ការចុចលើ  record  ទាំងអស់
    seclected(node) {
      if (node.children.length > 0) {
        this.expandedKeys[node.key] = !this.expandedKeys[node.key];
        if (this.expandedKeys[node.key] === true) {
          this.expand(node);
        } else {
          this.collapse(node);
        }
      }
    },
    //*ការបើក record row ណាមួយ
    expandAll() {
      for (let node of this.baseData) {
        this.expandNode(node);
      }
      this.expandedKeys = {...this.expandedKeys};
    },
    expandNode(node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true;
        for (let child of node.children) {
          this.expandNode(child);
        }
      }
    },
  },
```

![report](https://user-images.githubusercontent.com/97021587/190304737-9523fb00-df15-408a-8520-f7b6adc2074c.png)
