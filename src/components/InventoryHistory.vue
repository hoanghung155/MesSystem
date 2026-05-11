<template>
  <div class="p-4 bg-gray-50 min-h-screen font-sans text-gray-800">
    <!-- Top Search Bar -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-4">
      <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
        <el-icon class="text-gray-600 text-xl"><Document /></el-icon>
        <h2 class="text-lg font-bold text-gray-700 m-0">Truy vấn lịch sử tồn kho</h2>
      </div>
      
      <el-form :model="searchForm" label-position="top" class="flex flex-wrap gap-4 items-end">
        <div class="w-64">
          <el-form-item label="Mã số khuôn" class="mb-0 font-bold text-gray-600">
            <el-input v-model="searchForm.moldNo" placeholder="Vui lòng nhập" size="large" clearable />
          </el-form-item>
        </div>
        <div class="w-64">
          <el-form-item label="Ngày bắt đầu" class="mb-0 font-bold text-gray-600">
            <el-date-picker v-model="searchForm.startDate" type="date" placeholder="Chọn ngày bắt đầu" size="large" class="w-full" />
          </el-form-item>
        </div>
        <div class="w-64">
          <el-form-item label="Ngày kết thúc" class="mb-0 font-bold text-gray-600">
            <el-date-picker v-model="searchForm.endDate" type="date" placeholder="Chọn ngày kết thúc" size="large" class="w-full" />
          </el-form-item>
        </div>
        <div class="pb-1">
          <button class="bg-orange-50 hover:bg-orange-100 text-orange-500 border border-orange-200 px-8 py-2 rounded-full font-bold transition-colors flex items-center justify-center gap-2 shadow-sm h-[40px]">
            <el-icon><Search /></el-icon>
          </button>
        </div>
      </el-form>
    </div>

    <!-- Bottom: 2 Tables -->
    <div class="flex flex-col xl:flex-row gap-4">
      
      <!-- Left: Summary Table -->
      <div class="w-full xl:w-[50%] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-[calc(100vh-220px)]">
        <div class="flex items-center gap-2 mb-4 border-b border-gray-100 pb-2">
          <el-icon class="text-orange-600 text-xl"><Files /></el-icon>
          <h2 class="text-lg font-bold text-gray-700 m-0">Tổng hợp tồn kho</h2>
        </div>

        <div class="flex-1 overflow-hidden rounded-lg border border-gray-100 flex flex-col">
          <el-table :data="filteredSummary" style="width: 100%;" class="flex-1" highlight-current-row @current-change="handleSummaryRowSelect">
            <el-table-column prop="type" label="Loại" min-width="80" />
            <el-table-column prop="moldNo" label="Mã số khuôn" min-width="120" />
            <el-table-column prop="shoeName" label="Tên giày" min-width="120" show-overflow-tooltip />
            <el-table-column prop="partName" label="Bộ phận" min-width="80" />
            <el-table-column prop="size" label="Size" min-width="70" align="center">
              <template #default="scope">
                <span class="font-bold">{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="total" label="Tồn kho" min-width="70" align="center">
              <template #default="scope">
                <span class="font-bold text-blue-600">{{ scope.row.total }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="warehouse" label="Kho" min-width="90" />
            <el-table-column prop="updateTime" label="Cập nhật" min-width="140" />
          </el-table>
          <div class="p-2 flex justify-center border-t border-gray-100 bg-gray-50">
            <el-pagination layout="prev, pager, next" :total="globalStore.inventorySummary.length" :page-size="10" />
          </div>
        </div>
      </div>

      <!-- Right: History Detail Table -->
      <div class="w-full xl:w-[50%] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col h-[calc(100vh-220px)]">
        <div class="flex justify-between items-center mb-4 border-b border-gray-100 pb-2">
          <div class="flex items-center gap-2">
            <el-icon class="text-gray-600 text-xl"><List /></el-icon>
            <h2 class="text-lg font-bold text-gray-700 m-0">Chi tiết xuất nhập</h2>
          </div>
          <div v-if="selectedMold" class="bg-gray-50 text-gray-600 px-3 py-1 rounded-md border border-gray-200 font-bold text-sm">
            {{ selectedMold }}
          </div>
        </div>

        <div class="flex-1 overflow-hidden rounded-lg border border-gray-100 flex flex-col">
          <el-table :data="filteredHistory" style="width: 100%;" class="flex-1">
            <el-table-column prop="id" label="#" width="50" align="center" />
            <el-table-column prop="transactionNo" label="Mã giao dịch" min-width="140" show-overflow-tooltip />
            <el-table-column prop="type" label="Loại" min-width="80" align="center">
              <template #default="scope">
                <el-tag :type="scope.row.type === 'Inbound' ? 'success' : 'warning'" effect="plain" class="font-bold border-2">
                  {{ scope.row.type === 'Inbound' ? 'Nhập kho' : 'Xuất kho' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" label="Số lượng" min-width="70" align="center">
              <template #default="scope">
                <span class="font-bold" :class="scope.row.type === 'Inbound' ? 'text-green-600' : 'text-orange-500'">
                  {{ scope.row.quantity > 0 ? '+' : '' }}{{ scope.row.quantity }}
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="warehouse" label="Kho" min-width="90" />
            <el-table-column prop="location" label="Vị trí" min-width="90" />
            <el-table-column prop="operator" label="Người thao tác" min-width="80" />
            <el-table-column prop="time" label="Thời gian" min-width="140" />
          </el-table>
          <div class="p-2 flex justify-center border-t border-gray-100 bg-gray-50">
            <el-pagination layout="prev, pager, next" :total="filteredHistory.length" :page-size="10" />
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Document, Search, Files, List } from '@element-plus/icons-vue'
import { globalStore, type InventoryItem } from '../store'

const searchForm = ref({
  moldNo: '',
  startDate: '',
  endDate: ''
})

const selectedRow = ref<InventoryItem | null>(null)

const selectedMold = computed(() => {
  if (selectedRow.value) {
    return `${selectedRow.value.moldNo} | ${selectedRow.value.size}`;
  }
  return '';
})

// Filter Summary based on search form
const filteredSummary = computed(() => {
  let result = globalStore.inventorySummary;
  if (searchForm.value.moldNo) {
    result = result.filter(item => 
      item.moldNo.toLowerCase().includes(searchForm.value.moldNo.toLowerCase()) || 
      item.shoeName.toLowerCase().includes(searchForm.value.moldNo.toLowerCase())
    );
  }
  return result;
})

// Filter History based on selected Summary row
const filteredHistory = computed(() => {
  let result = globalStore.inventoryHistory;
  if (selectedRow.value) {
    // Show history specifically for this mold no
    result = result.filter(item => item.moldNo === selectedRow.value?.moldNo);
  }
  return result;
})

const handleSummaryRowSelect = (val: InventoryItem | null) => {
  selectedRow.value = val;
}
</script>

<style scoped>
:deep(.el-table th.el-table__cell) {
  background-color: #fafafa !important;
  color: #606266 !important;
  font-weight: bold;
}
</style>
