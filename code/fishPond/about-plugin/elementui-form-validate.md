# Element UI 表单的校验

Element UI 是很好用的 UI 框架，其中的表单是我们在做后台项目时经常用到的，它集成的校验功能用起来方便快捷，但是有很多场景，当我们需要用到校验的时候却发现它的文档上并没有很详实的介绍

## 关键点介绍

要用表单校验需要 `el-form` ，`el-form-item` 一起配合使用， el-form 必须要绑定 model 属性，rules 根据具体需求决定是否绑定；`el-form-item` 需要绑定 `prop` 属性，`rules` 在做具体表单项的校验的时候需要绑定规则

表单校验中最重要的三个属性就是 `model` 、 `prop` 和 `rules` ，`prop` 相当于设置要校验的值， `rules` 则为校验函数，只要搞明白动态的表单中的 `prop` 该如何对应，问题就解决了一大半了。我们都知道在使用 `element`  的表单校验时要使校验生效必须确保 `prop` 的值和表单项的绑定值对应，这个的前提是校验函数的作用对象是表单项的绑定值，那么为什么要这样绑定呢， `prop` 的作用是什么，所以要看下 `el-form-item` 源码里的实现

```js
// el-form-item 组件
computed: {
  form() {
    let parent = this.$parent;
    let parentName = parent.$options.componentName;
    while (parentName !== 'ElForm') {
      if (parentName === 'ElFormItem') {
        this.isNested = true;
      }
      parent = parent.$parent;
      parentName = parent.$options.componentName;
    }
    return parent;
  },
  fieldValue() {
    const model = this.form.model;
    if (!model || !this.prop) { return; }

    let path = this.prop;
    if (path.indexOf(':') !== -1) {
      path = path.replace(/:/, '.');
    }

    return getPropByPath(model, path, true).v;
  },
},

// getPropByPath
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  // xxx[0].len ===> xxx.0.len
  path = path.replace(/\[(\w+)\]/g, '.$1');
  // .xxx.0.len ===> xxx.0.len
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};
```

可以看到 `fieldValue` 的获取的前提是父组件绑定了 `model` 的值并且组件有绑定 `prop` 的值，以 `prop` 作为一个路径去 `model` 中取值。下面的伪代码中写了几种可能的场景，可以参考一下 `prop` 和 `model` 的关系。

```js
form: {
  list: [{ key: 'value' }],
  key: 'value',
  rules: [
    {
      validator： (rule, val, cb) => { cb() }
    }
  ]
}

:model="form"
prop="list.0.key" , prop="list[0].key" // validator 中的 val 指 form.list[0].key
prop="list.0" , prop="list[0]" // validator 中的 val 指 form.list[0]
prop="key" // validator 中的 val 指 form.key
```



## 使用场景

使用场景大致上有静态的表单和动态的表单两种：静态的表单就是表单数量、规则是固定的；动态表单一般是通过循环或者其他方式动态生成表单

### 普通表单

普通表单就像 `Element UI` 文档上展示的 [例子](https://element.eleme.cn/#/zh-CN/component/form#zi-ding-yi-xiao-yan-gui-ze) 那样使用，此处不做赘述

### 动态生成 - 静态校验

此处静态校验方式的介绍可以结合表格场景来讨论，表格场景比普通场景是要复杂一些的，但是大致的逻辑是一致的

先看效果

大致代码如下：

```vue
<el-form
  class="ident-template-property-form"
  :model="propertyForm"
  ref="propertyForm"
  :rules="propertyForm.rules"
>
  <el-table :data="propertyForm.propertyList">
    <el-table-column label="最小长度">
      <template slot-scope="scope">
        <el-form-item
          :prop="`propertyList.${scope.$index}.minLen`"
          :rules="propertyForm.rules.minLen"
        >
          <el-input v-model="scope.row.minLen"></el-input>
        </el-form-item>
      </template>
    </el-table-column>
  </el-table>
</el-form>
```



```js
propertyForm: {
  propertyList: [
    { ...propertyItem }
  ],
    rules: {
      nameCn: [{ required: true, message: '必填项', trigger: 'blur' }],
      nameEn: [{ required: true, message: '必填项', trigger: 'blur' }],
      dataType: [{ required: true, message: '未选择', trigger: 'blur' }],
      minLen: [
        { required: true, message: '必填项', trigger: 'blur' },
        {
          validator: (rule, val, cb) => {
            // 判断是否为正整数
            if (checkStr(val, 'positiveNumber')) {
              cb()
            } else {
              cb(new Error('非正整数'))
            }
          }, trigger: 'blur'
        }
      ],
      maxLen: [
          { required: true, message: '必填项', trigger: 'blur' },
          {
            validator: (rule, val, cb) => {
               // 判断是否为正整数
              if (checkStr(val, 'positiveNumber')) {
                cb()
              } else {
                cb(new Error('非正整数'))
              }
            }, trigger: 'blur'
          }
        ]
    }
},
```

表单动态绑定的数据是 `propertyForm` ，`prop` 应当是对应的属性值，表单校验生效的关键就在于 `prop` 的对应，及值的取用 ``:prop="`propertyList.${scope.$index}.minLen`"`` ，校验函数中传入的 `val` 的值就是 `prop` 对应的值

### 动态生成 - 动态校验

动态校验规则一般和生成当前表单项的数据相关，校验规则中使用的 `value` 值其实就是通过 `prop` 路径从 `model` 数据中查询到的值，动态校验的要点就是设置要校验的 `prop` 。此处的业务场景是：表单项是动态生成的，每个表单项有自己的校验规则，最小字符长度和最大字符长度，使用渲染当前表单项的数据做校验 `value` ，通过获取 `value` 中的数据来进行校验

先看效果

大致代码如下：

```vue
<el-form
  :model="identTemplatePropertyForm"
  ref="identTemplatePropertyForm"
>
  <template v-for="(item, index) in identTemplatePropertyForm.list">
    <el-form-item
      :key="item.key"
      :label="item.nameCn"
      :prop="`list.${index}`"
      :rules="identTemplatePropertyForm.rules"
    >
      <el-input
        :value="item.value"
        type="text"
        placeholder="请输入"
        @input="handlePropertyIptChange($event, index)"
      />
    </el-form-item>
  </template>
</el-form>
```

```js
identTemplatePropertyForm: {
  list: [],
  rules: [
    {
      validator: (rule, val, cb) => {
        let { value, minLen, maxLen } = val
        value = value.trim()
        if (!isNaN(minLen)) {
          if (value.length < minLen) {
            cb(new Error(`输入字符长度不能小于${minLen}`))
          }
        }
        if (!isNaN(maxLen)) {
          if (value.length > maxLen) {
            cb(new Error(`输入字符长度不能大于${maxLen}`))
          }
        }
        cb()
      },
      trigger: 'blur'
    }
  ]
},
```

此处绑定的校验值是 ``:prop="`list.${index}`"`` ，然后校验函数中就可以根据动态的值来进行校验

