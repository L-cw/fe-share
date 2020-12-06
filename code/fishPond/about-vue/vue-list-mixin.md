## 列表 Mixin

后台项目做多了就会发现，在一个成熟的后台项目中，列表页面的结构以及逻辑都是相对固定的，怎样才能把重复的这部分提取出来呢

### 哪些需要提取

项目里用的 UI 库是 `Element UI` 。一个列表页从 UI 表现来看上至下通常包含这么几部分：筛选栏，列表，分页。在 `vue` 单文件组件中看的话，主要是模板区和 `js` 区，项目里列表页一般是统一风格，所以公共样式不会写在列表组件里。首先模板部分我认为是不需要提取出来的，一方面是因为用了 `element` 表格组件，二次封装会使传值等变的更为复杂，另一方面是封装过后在可读性上有很大的损失

### 怎么封装

由于只提取了公共的逻辑，模板部分未有提取，而且每个列表页调用的 `api` 也不同，选择采用 `mixin` 的方式，在 `mixin` 中定义公共的数据变量以及方法，在对应的业务单文件组件中引入。`mixin` 的特性可以在 [官方文档](https://cn.vuejs.org/v2/guide/mixins.html) 中了解，通过这种方式优点是可以提取公共逻辑，并且可以在混入的地方通过新声明覆盖旧声明的方式重写；缺点是通过 `mixin` 引入的内容在业务页面是没法直接看到的，这也是使用 `mixin` 的主要问题。在项目的协作开发，我们采用约定开发的方式，使用者要了解页面所使用的 `mixin` ，这样可以降低使用 `mixin` 导致出问题的几率

### 成果

```js
/**
 * list.js 列表 mixin
*/

import { TIMER_DURATION } from '@/config'

export default {
  data () {
    return {
      // 接口的 api 方法
      getListApi: () => {},
      // 请求参数
      reqParams: {},
      // 过滤参数
      filterParams: {},
      // 列表数据
      list: [],
      // 分页数据
      page: {
        pageStart: 1,
        pageSize: 20
      },
      // 返回参对应列表数据的字段名
      responseListName: 'list',
      // 请求接口 loading flag
      listLoading: false,
      // 是否开启轮询
      needPolling: false,
      // 轮询的时间间隔，默认采用全局统一间隔时间
      timerDuration: TIMER_DURATION,
      // 轮询定义的定时器
      timer: null
    }
  },
  mounted () {
    // 方法调用放在页面中
    // this.getList()
    // this.startPolling()
  },
  beforeDestroy () {
    this.endPolling()
  },
  methods: {
    getList () {
      if (!this.listLoading) {
        this.listLoading = true
        this.getListApi({
          ...this.reqParams,
          ...this.filterParams,
          ...this.page
        }).then(res => {
          // 翻页可能连续点击，如果返回数据不是当前页，不执行赋值操作
          if (res.data && res.data.page && (this.page.pageStart !== res.data.page.pageStart)) {
            return
          }
          this.handleGetListResponse(res)
        }).catch(() => {
          this.handleGetListErr()
        }).finally(() => {
          this.listLoading = false
        })
      }
    },

    // 如果默认方法不能满足需求，可以在组件中重写这个方法来处理返回数据
    handleGetListResponse (res) {
      res.data = res.data || {}
      this.list = res.data[this.responseListName] || []
      res.data.page && (this.page = res.data.page)
    },

    handleGetListErr () {},

    // 翻页
    handleSizeChange (val) {
      this.page.pageStart = val
      this.getList()
    },

    // 过滤
    handFilterStatusChange (e) {
      // 结束当前的定时任务，避免和本次请求冲突
      this.endPolling()
      this.getList()
      this.startPolling()
    },

    // 开始轮询
    startPolling () {
      if (!this.needPolling) {
        return
      }
      this.timer = setInterval(this.getList, this.timerDuration)
    },
    // 结束轮询
    endPolling () {
      if (!this.needPolling) {
        return
      }
      clearInterval(this.timer)
    }
  }
}
```

```vue
/**
* 页面中引入 mixin 使用
*/
<template>
  <div class="user-manage">
    <basic-box-comp>
      <el-tabs v-model="reqParams.auditStatus" type="card" @tab-click="handleTabClick">
        <!-- 待审核 -->
        <el-tab-pane label="待审核" name="0" />
        <!-- 审核通过 -->
        <el-tab-pane label="审核通过" name="1" />
        <!-- 审核未通过 -->
        <el-tab-pane label="审核未通过" name="2" />
      </el-tabs>

      <!-- 查询栏 -->
      <div class="node-fliter-bar">
        <el-form ref="filterParams" :model="filterParams" :inline="true" class="search">
          <el-form-item label="用户名">
            <el-input v-model="filterParams.userName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="用户类型">
            <el-select v-model="filterParams.userType" clearable placeholder="请选择用户类型">
              <el-option value="1" label="个人用户" />
              <el-option value="2" label="企业用户" />
              <el-option value="" label="不限" />
            </el-select>
          </el-form-item>
          <el-form-item label="用户名ID">
            <el-input v-model="filterParams.userId" placeholder="请输入用户名ID" />
          </el-form-item>
          <el-form-item label="是否可信">
            <el-select v-model="filterParams.trusted" clearable placeholder="请选择是否可信">
              <el-option value="1" label="是" />
              <el-option value="0" label="否" />
              <el-option value="" label="不限" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="search-btn" size="mini" type="primary"
              @click="handFilterStatusChange">查询</el-button>
            <el-button
              class="search-btn"
              size="mini"
              @click="handleResetFilterParams"
            >重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 列表表格 -->
      <el-table v-loading="listLoading" :data="list">
        <el-table-column prop="userName" label="用户名" />
        <el-table-column label="用户类型">
          <template slot-scope="scope">{{ scope.row.userType | fmtUserType}}</template>
        </el-table-column>
        <el-table-column label="企业名称">
          <template slot-scope="scope">{{ scope.row.companyName || '--' }}</template>
        </el-table-column>
        <el-table-column prop="chainName" label="所属链" />
        <el-table-column prop="userId" label="用户ID" width="200" />
        <el-table-column label="电话号码">
          <template slot-scope="scope">
            <span v-if="scope.row.phone">{{ scope.row.phone | hidePhoneNum }}</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <el-table-column label="是否可信认证" width="110" align="center">
          <template slot-scope="scope">{{ scope.row.trusted | fmtTrusted}}</template>
        </el-table-column>
        <el-table-column label="时间" width="200">
          <template slot-scope="scope">{{ scope.row.createTime | fmtTimeFromTimestamp }}</template>
        </el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button type="text" @click="handleGoDeatil(scope.row)">
              {{ scope.row.auditStatus === '0' ? '审核' : '详情' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页器 -->
      <div class="pagination-box">
        <el-pagination
          hide-on-single-page
          background
          layout="prev, pager, next"
          :current-page="page.pageStart"
          :page-size="page.pageSize"
          :total="page.pageTotal"
          @current-change="handleSizeChange" />
      </div>
    </basic-box-comp>
  </div>
</template>

<script>
import listMixin from '@/utils/mixins/list'
import { getUserListApi } from '@/api/user'

const defaultFilterParams = {
  code: '',
  userName: '',
  userType: '',
  userId: '',
  trusted: '',
}
export default {
  name: 'UserList',
  mixins: [listMixin],
  data () {
    return {
      getListApi: getUserListApi,
      responseListName: 'userList',
      listLoading: false,
      reqParams: {
        auditStatus: '0', // 0待审核 1 通过 2不通过
      },
      filterParams: { ...defaultFilterParams }
    };
  },
  mounted () {
    this.getList()
  },
  methods: {
    handleTabClick (tab, event) {
      this.page = {
        pageStart: 1,
        pageSize: 20,
      }
      this.getList()
    },
    handleGoDeatil ({ userId, code }) {
      this.$router.push({
        name: 'UserDetail',
        params: { userId },
        query: { code }
      })
    },
    handleResetFilterParams () {
      this.filterParams = { ...defaultFilterParams }
      this.handFilterStatusChange()
    }
  },
};
</script>

```

上述示例是稍复杂的应用，若只是展示列表，只需重置 `data` 中的数据即可

### 总结

通过这样的方式，将同类业务中相同的逻辑抽离出来，列表页面的逻辑被简化，后续的业务迭代中只需很少的代码即可实现需求，公共的逻辑在 `mixin` 中统一维护，提高开发效率