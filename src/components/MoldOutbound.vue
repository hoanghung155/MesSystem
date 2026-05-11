<template>
  <div class="p-4 bg-gray-50 min-h-screen font-sans text-gray-800">
    <div class="flex flex-col xl:flex-row gap-4 h-full">
      
      <!-- Cột trái (40%) -->
      <div class="w-full xl:w-[45%] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-2">
            <el-icon class="text-orange-600 text-2xl"><Van /></el-icon>
            <h2 class="text-xl font-bold text-gray-700 m-0">Thông tin chờ xuất kho</h2>
          </div>
          <div class="bg-orange-50 text-orange-600 px-3 py-1 rounded-md border border-orange-200 font-bold text-sm">
            Số lượng xuất lần này: {{ totalQuantity }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 mb-4">
          <button @click="confirmOutbound" class="flex-1 bg-orange-50 text-orange-500 border border-orange-200 hover:bg-orange-100 py-3 rounded-[2rem] font-bold transition-colors text-base">
            Xác nhận xuất kho
          </button>
          <button class="flex-1 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 py-3 rounded-[2rem] font-bold transition-colors flex items-center justify-center gap-1 text-base">
            <el-icon><Search /></el-icon>
            Lịch sử xuất kho
          </button>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-hidden rounded-lg border border-gray-100">
          <el-table :data="tableData" style="width: 100%; height: 100%;" class="h-full">
            <el-table-column prop="shoeName" label="Tên giày" min-width="130" />
            <el-table-column prop="partName" label="Tên bộ phận" min-width="110" />
            <el-table-column prop="size" label="Size" min-width="150" align="center">
              <template #default="scope">
                <span class="font-bold text-gray-600">{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" label="Số lượng" min-width="70" align="center">
              <template #default="scope">
                <span class="font-bold">{{ scope.row.quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="warehouse" label="Kho" min-width="90" />
            <el-table-column prop="location" label="Vị trí" min-width="90" />
            <el-table-column label="Thao tác" width="70" align="center" fixed="right">
              <template #default="scope">
                <el-button type="danger" plain circle size="small" @click="removeRow(scope.$index)">
                  <el-icon><Delete /></el-icon>
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>

      <!-- Cột phải (60%) -->
      <div class="w-full xl:w-[55%] bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col">
        <!-- Header -->
        <div class="flex items-center gap-2 mb-6 border-b border-gray-100 pb-3">
          <el-icon class="text-gray-600 text-2xl rotate-[135deg]"><Key /></el-icon>
          <h2 class="text-xl font-bold text-gray-700 m-0">Thao tác xuất kho</h2>
        </div>

        <!-- Form nhập liệu -->
        <el-form :model="form" label-position="left" label-width="90px" class="mb-2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item required>
                <template #label><span class="text-red-500 mr-1">*</span> <span class="font-bold text-gray-600">Loại khuôn</span></template>
                <el-select v-model="form.moldType" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-orange-500 font-bold"><Setting /></el-icon>
                  </template>
                  <el-option label="Khuôn ép nhiệt" value="hot_press" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item required>
                <template #label><span class="text-red-500 mr-1">*</span> <span class="font-bold text-gray-600">Mã số khuôn</span></template>
                <el-input v-model="form.moldNo" placeholder="Vui lòng nhập" size="large">
                  <template #prefix>
                    <el-icon class="text-gray-400 font-bold"><Search /></el-icon>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item>
                <template #label><span class="font-bold text-gray-600">Tên bộ phận</span></template>
                <el-select v-model="form.partName" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-orange-500"><Grid /></el-icon>
                  </template>
                  <el-option label="Khuôn ép nhiệt lưỡi gà" value="tongue_hot_press" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                 <template #label><span class="font-bold text-gray-600">Đơn vị giao hàng</span></template>
                <el-select v-model="form.deliveryUnit" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-gray-400"><OfficeBuilding /></el-icon>
                  </template>
                  <el-option label="Chuyền A1" value="a1_line" />
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item required>
                <template #label><span class="text-red-500 mr-1">*</span> <span class="font-bold text-gray-600">Kho</span></template>
                <el-input v-model="form.warehouse" placeholder="Vui lòng nhập" size="large">
                  <template #prefix>
                    <span class="text-orange-500 font-bold ml-1">±</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label><span class="font-bold text-gray-600">Vị trí</span></template>
                <el-select v-model="form.location" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-orange-500"><Location /></el-icon>
                  </template>
                  <el-option label="Khu A - Kệ 01" value="a_01" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>

        <div class="h-[1px] w-full bg-gray-100 mb-6"></div>

        <!-- Area: Numpad & Size Input -->
        <div class="flex flex-col lg:flex-row gap-8 mt-2">
          <!-- Left side: Size & Qty -->
          <div class="flex-1 flex flex-col justify-between">
            <div class="flex justify-between items-center mb-6">
              <div class="flex items-center gap-2 text-blue-600 font-bold text-lg">
                <div class="bg-blue-600 text-white rounded-[4px] w-6 h-6 flex items-center justify-center">
                   <el-icon class="text-sm"><EditPen /></el-icon>
                </div>
                <span>Nhập thông tin</span>
              </div>
              <button class="bg-white text-orange-500 border border-orange-300 hover:bg-orange-50 px-5 py-1.5 rounded-full font-bold transition-colors flex items-center gap-1 text-sm shadow-sm">
                <el-icon class="text-green-500 text-lg"><Coin /></el-icon>
                Xuất nguyên bộ
              </button>
            </div>

            <div class="flex items-center mb-5">
              <div class="w-16 text-gray-500 font-bold text-lg">Size</div>
              <el-input v-model="inputSize" size="large" class="flex-1" input-style="text-align: center; font-weight: bold; font-size: 16px;">
                <template #append>
                  <el-button class="bg-gray-100"><el-icon><Menu /></el-icon></el-button>
                </template>
              </el-input>
            </div>

            <div class="flex items-center mb-6">
              <div class="w-16 text-gray-500 font-bold text-lg">Số lượng</div>
              <el-input v-model="inputQuantity" size="large" class="flex-1" input-style="text-align: center; font-weight: bold; font-size: 16px;">
                <template #append>
                  <el-button class="bg-gray-100"><el-icon class="text-orange-500"><Delete /></el-icon></el-button>
                </template>
              </el-input>
            </div>

            <button @click="addPendingItem" class="w-full bg-orange-50 hover:bg-orange-100 text-orange-500 border border-orange-200 py-3 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
              <el-icon><Check /></el-icon>
              Xác nhận
            </button>
          </div>

          <!-- Right side: Numpad -->
          <div class="w-full lg:w-72">
            <div class="grid grid-cols-3 gap-3">
              <button v-for="num in ['7', '8', '9', '4', '5', '6', '1', '2', '3']" :key="num"
                @click="appendNumpad(num)"
                class="bg-[#fff9f3] hover:bg-orange-100 text-orange-500 font-bold text-2xl h-14 rounded-[2rem] border border-[#f5eadb] transition-colors shadow-sm flex items-center justify-center">
                {{ num }}
              </button>
              <button @click="appendNumpad('0')" class="col-span-2 bg-[#fff9f3] hover:bg-orange-100 text-orange-500 font-bold text-2xl h-14 rounded-[2rem] border border-[#f5eadb] transition-colors shadow-sm flex items-center justify-center">
                0
              </button>
              <button @click="backspaceNumpad" class="bg-[#fff5f5] hover:bg-red-50 text-red-400 font-bold text-2xl h-14 rounded-md border border-[#fce8e8] transition-colors flex items-center justify-center shadow-sm">
                <el-icon><Back /></el-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Sizes List -->
        <div class="mt-8 pt-6 border-t border-gray-100">
          <div class="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <button v-for="(size, index) in quickSizes" :key="index"
              @click="inputSize = size.replace(/\n/g, ', ')"
              class="bg-white hover:bg-orange-50 border border-gray-200 hover:border-orange-300 text-gray-700 font-bold py-2 px-2 rounded-full transition-all text-sm sm:text-base break-words flex flex-col items-center justify-center leading-tight min-h-[56px]">
              <span v-for="(line, i) in size.split('\n')" :key="i">{{ line }}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Van, Search, Delete, Key, Setting, Grid, OfficeBuilding,
  Location, EditPen, Coin, Menu, Check, Back
} from '@element-plus/icons-vue'
import { globalStore } from '../store'
import { ElMessage } from 'element-plus'

// --- Dữ liệu cột trái ---
const tableData = ref([
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt lưỡi gà', size: '7#-8# W', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 01' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt thân giày', size: '8.5#-9.5#,7#-7.5# M', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 02' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt thân giày', size: '10#-11# W,8#-9# M', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 03' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt thân giày', size: '9.5#-10.5# M', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 04' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt thân giày', size: '11#-12# M', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 05' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt thân giày', size: '12.5#-14# M', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 06' },
  { shoeName: 'Cloudboom Max', partName: 'Khuôn ép nhiệt lưỡi gà', size: '5#-6.5# W', quantity: 2, warehouse: 'Phòng khuôn dao', location: 'Khu A - Kệ 07' },
])

const totalQuantity = computed(() => {
  return tableData.value.reduce((sum, item) => sum + item.quantity, 0)
})

const removeRow = (index: number) => {
  tableData.value.splice(index, 1)
}

// --- Dữ liệu cột phải ---
const form = ref({
  moldType: 'hot_press',
  moldNo: 'Cloudboom Max',
  partName: 'tongue_hot_press',
  deliveryUnit: 'a1_line',
  warehouse: 'Phòng khuôn dao',
  location: 'a_01'
})

const inputSize = ref('8.5#-9.5#,7#-7.5# M')
const inputQuantity = ref('2')

const quickSizes = [
  '5#-6.5# W',
  '7#-8# W',
  '8.5#-9.5# M\n7#-7.5# M',
  '10#-11# W\n8#-9# M',
  '9.5#-10.5# M',
  '11#-12# M',
  '12.5#-14# M'
]

// --- Xử lý Numpad ---
const appendNumpad = (num: string) => {
  if (inputQuantity.value === '0') {
    inputQuantity.value = num
  } else {
    inputQuantity.value += num
  }
}

const backspaceNumpad = () => {
  if (inputQuantity.value.length > 0) {
    inputQuantity.value = inputQuantity.value.slice(0, -1)
  }
  if (inputQuantity.value === '') {
     inputQuantity.value = '0'
  }
}

// Xử lý thêm vào danh sách chờ
const addPendingItem = () => {
  if (!inputSize.value || parseInt(inputQuantity.value) <= 0) return;
  tableData.value.push({
    shoeName: form.value.moldNo,
    partName: form.value.partName,
    size: inputSize.value,
    quantity: parseInt(inputQuantity.value),
    warehouse: form.value.warehouse,
    location: form.value.location
  });
  ElMessage.success('Đã thêm vào danh sách chờ xuất kho');
}

// Gửi vào Store
const confirmOutbound = () => {
  if (tableData.value.length === 0) {
    ElMessage.warning('Không có dữ liệu chờ xuất kho');
    return;
  }
  globalStore.processTransaction(tableData.value, true, form.value.warehouse, form.value.location);
  tableData.value = [];
  ElMessage.success('Xác nhận xuất kho thành công!');
}
</script>

<style scoped>
/* Tuỳ chỉnh table header */
:deep(.el-table th.el-table__cell) {
  background-color: #fafafa !important;
  color: #606266 !important;
  font-weight: bold;
}
:deep(.el-form-item) {
  margin-bottom: 18px;
}
</style>
