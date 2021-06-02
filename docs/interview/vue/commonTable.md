## 1.elementUi搭配Vue封装table组件
### 思路
 - 在子组件中创建一个公共的表格，通过对象的配置和数据来动态渲染表格
### 开发
  #### 1.子组件(table组件)
   commonTable.vue
   ```vue
   <template>
<div>
  <el-table
      :data="data"
      v-loading="loading"
      tooltip-effect="light"
      size="small"
      ref="tableRef"
      :border="border"
      :show-header="showHeader"
      :header-row-class-name="headerRowClassName"
      :header-cell-class-name='headerCellclassName'
      @selection-change="handleSelectionChange"
      style="width: 100%"
      :cell-style="cellStyleMothod"
      :span-method="spanMethod"
      :highlight-current-row="false"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      :default-expand-all="defaultExpandAll"
      @current-change="singleSelectChange"
      @sort-change="handleSortChange"
      v-bind="$attrs"
      :row-class-name="tableRowClassName"
      :cell-class-name='tableCellClassName'
    >
      <el-table-column
        :selectable="tableColumns[0].selectable"
        type="selection"
        width="55"
        :fixed="tableColumns[0].fixed"
        v-if="tableColumns && tableColumns[0].type === 'selection'"
      >
      </el-table-column>
      <!-- eslint-disable vue/no-use-v-if-with-v-for -->
      <template>
        <el-table-column
          :prop="column.key"
          :label="column.title"
          :type="column.type"
          :width="column.width"
          :min-width="column.minWidth"
          :sortable="column.sortable"
          :render-header="column.renderHeader"
          :show-overflow-tooltip="column.operate ? false :
          column.showTooltip === false ? false : true"
          v-for="column in tableColumns"
          v-if="column.type !== 'selection' && !column.hide"
          :key="column.key"
          :fixed="column.fixed"
          :align="column.align || 'left'"
        >
          <template slot="header"
            ><el-tooltip
            :content="column.content"
            v-if="column.tooltip"
            placement="bottom-start"
            effect="light"
          >
              <i class="el-icon-question"></i> </el-tooltip
            ><span v-if="column.mustFill" class="must-tips">*</span>{{ column.title }}</template
          >
          <!-- eslint-enable -->
          <template slot-scope="{ row, $index }">
            <!-- 列的slot -->
            <slot :name="column.slotName" v-if="column.slot" :row="row" :index="$index"></slot>

            <column-render
            v-else-if="column.render"
            :row="row"
            :index="$index"
            :render="column.render">
            </column-render>
            <span
            v-else-if="!column.operate && !column.input && column.key">
            {{
              column.formatter ?
              column.formatter(row[column.key], $index, row, filter) : row[column.key]

            }}</span>
            <span v-else-if="column.input && column.key">
              <el-input
                v-model="row[column.key]"
                :type="column.type || 'number'"
                size="mini"
                :maxlength="column.maxLength"
                clearable
                :class="{ 'show-word-limit-input': column.showWordLimit }"
                :show-word-limit="column.showWordLimit"
              >
                <template v-if="column.append" slot="append">{{ column.append }}</template>
              </el-input>
            </span>
            <div v-else-if="column.operate">
              <span
                v-for="(item, idx) in column.setBtns(
                  row, $index, total, page, totalPages, data.length
                )" :key="idx">
                <el-button
                  style="margin: 0 2px"
                  :disabled="item.disabled"
                  v-if="!item.hide"
                  :style="item.style"
                  :type="item.type || 'text'"
                  :size="item.size || 'medium'"
                  @click="item.handler(row, $index)"
                  v-bind="$attrs"
                  >{{ item.label }}</el-button
                >
              </span>
            </div>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 分页器 -->
    <div class="pagination" v-if="showPage">
      <el-pagination
        :layout="layoutSet"
        :page-size="filter.size"
        :page-sizes="pageSize"
        :pager-count="5"
        :current-page="filter.page"
        @current-change="currentChange"
        @size-change="sizeChange"
        background
        :total="total"
      >
      </el-pagination>
    </div>
</div>
</template>
<script>
// 支持render函数
import ColumnRender from '@/utils/ColumnRender';

export default {
  name: 'CommonTable',
  components: {
    ColumnRender,
  },
  props: {
    data: {
      type: Array,
    },
    total: {
      type: Number,
      default: 0,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: false,
    },
    showHeader: {
      type: Boolean,
      default: true,
    },
    filter: {
      type: Object,
      default: () => {},
    },
    tableColumns: {
      type: Array,
      default: () => {},
    },
    spanMethod: {
      type: Function,
      default: () => {},
    },
    summaryMethod: {
      type: Function,
      default: () => {},
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper',
    },
    cellStyleMothod: {
      type: Function,
      default: () => {},
    },
    pageSize: {
      type: Array,
      default() {
        return [5, 10, 20, 30];
      },
    },
    page: {
      type: Number,
      default: 1,
    },
    totalPages: {
      type: Number,
      default: 1,
    },
    defaultExpandAll: {
      type: Boolean,
      default: false,
    },
    tableRowClassName: {
      type: [Function, String],
      default: () => {},
    },
    tableCellClassName: {
      type: [Function, String],
      default: () => {},
    },
    headerRowClassName: {
      type: [Function, String],
      default: () => {},
    },
    headerCellclassName: {
      type: [Function, String],
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    layoutSet() {
      return this.layout;
    },
  },
  methods: {
    toggleRowExpansion(row, e) {
      this.$refs.tableRef.toggleRowExpansion(row, e);
    },
    handleSortChange(val) {
      this.$emit('handleSortChange', val);
    },
    singleSelectChange(val) {
      this.$emit('singleSelectChange', val);
    },
    currentChange(val) {
      this.$emit('currentChange', val);
    },
    sizeChange(val) {
      this.$emit('sizeChange', val);
    },
    handleSelectionChange(val) {
      this.$emit('selectionChange', val);
    },
    getSummaries(params) {
      // eslint-disable-next-line no-underscore-dangle
      const _arr = this.summaryMethod ? this.summaryMethod(params) : [];
      return _arr;
    },
    clearSelection() {
      this.$refs.tableRef.clearSelection();
    },
    toggleRowSelection(row, selected = true) {
      this.$nextTick(() => {
        this.$refs.tableRef.toggleRowSelection(row, selected);
      });
    },
    toggleAllSelection() {
      this.$nextTick(() => {
        this.$refs.tableRef.toggleAllSelection();
      });
    },
  },
};
</script>
<style lang="less">

</style>
   ```
ColumnRender(支持render函数，并将当前行数据返回)
```js
export default {
  functional: true,
  inheritAttrs: false,
  props: {
    row: Object,
    render: Function,
    index: Number,
    column: {
      type: Object,
      default: null,
    },
  },
  render: (h, ctx) => ctx.props.render(h, ctx.props.row, ctx.props.index),
};

```
#### 2.父组件
index.vue
```vue
<template>
  <div class='table'>
    <common-table
      ref="CommonTableRef"
      :loading="isLoading"
      :layout="layoutPage"
      :tableColumns="tableConfig.tableColumns(this)"
      :total="data.total"
      :border="border"
      :showHeader="showHeader"
      :data="data.list"
      :showPage="showPage"
      :filter='form'
      tableRowClassName='table__tbody__tr'
      headerRowClassName='table__thead'
      headerCellclassName='table__thead__tr'
      @handleSortChange="handleSortChange"
      @sizeChange="sizeChange"
      @selectionChange="selectionChange"
      @currentChange="currentChange"
    >
    <template
      v-slot:[item.slotName]="{ row }"
      v-for="(item, index) in tableConfig.tableColumns(this)">
      <slot :name="item.slotName" v-if="item.slot" :row="row" :index="index"></slot>
    </template>
    </common-table>
  </div>
</template>
<script>
import commonTable from '@/components/commonTable.vue';
// 配置项
import tableConfig from '@/helpers/tableConfig';
export default {
  components: {
    'common-table': commonTable,
  },
  data(){
    return{
      tableConfig,
      layoutPage: 'prev, pager, next',
      border: false,
      showHeader: true,
      showPage: true,
      data: {
        list: [],
        total: 0,
      },
      isLoading:false,
      form: {
        search: '',
        page: 1,
        size: 13,
      },
    }
  },
  methods: {
    // 自定义方法（没有一一列举）

    handleSortChange({ prop }) {

    },
    sizeChange() {

    },
    selectionChange() {

    },

    currentChange(page) {
      this.form.page = page;
    },
  }
}
</script>
```
表格配置项
tableConfig.js
```js
import vProgress from '@/components/progress.vue';
// vm当前引入组件的实例，vm.fn()调用当前组件某个方法
const tableColumns = (vm) => [
  {
    type: 'selection',
    fixed: 'left'
  },
  {
    title: '题目数量',
    key: 'qnumber',
    showTooltip: false,
    width: 100,
    align: 'center',
  },
  {
    title: '完成状态',
    key: 'complateStatus',
    showTooltip: false,
    width: 300,
    align: 'center',
    sortable: 'custom', //排序
    render: (h, row) => {
      const { complateStatus } = row;
      // vProgress引入某个组件
      return h(vProgress, {
        props: {
          val: complateStatus * 100,
        },
      });
    },
  },
  {
    title: '题号',
    key: 'qid',
    showTooltip: false,
    width: 200,
    align: 'center',
    sortable: 'custom',
    formatter: val => {
      return val === 3 ? '已驳回' : val === 2 ? '已确认' : val === 1 ? '待确认' : '未分单'
    },
  },
  {
    title: '题单名称',
    key: 'name',
    showTooltip: false,
    width: 400,
    align: 'center',
    render: (h, row) => h('a', {
      on: {
        click() {
          vm.goComiler(row.id);
        },
      },
      domProps: {
        innerHTML: row.name,
      },
      class: 'table__tbody__tr__name',
    }),
  },
  {
      operate: true,
      width: 220,
      fixed: 'right',
      title: '操作',
      setBtns: (row, index) => {
        let arr = []
        if (vm.$checkPermissions('ORDERS:LIST:VIEW')) {
          arr.push({
            label: '查看',
            handler: () => vm.detail(row, index)
          })
        }
        if ((row.status === 1 || row.status === 5) && vm.$checkPermissions('ORDERS:LIST:EDIT')) {
          arr.push({
            label: '编辑',
            handler: () => vm.editOrder(row, index)
          })
        return arr
      }
    }
  }
];
```
 ---------------------------------------------------------------------------------------------------
 参考资料：<br />
<a target='_blank' href='https://element.eleme.cn/#/zh-CN/component/table'>elementUi</a><br />
<a target='_blank' href='https://www.yuque.com/biaoshu-wyvwo/gtqt3d/nzinn1'>elementUI搭配vue封装table组件</a><br />
<a target='_blank' href='https://blog.csdn.net/weixin_44380707/article/details/112308172'>封装table组件</a><br />

