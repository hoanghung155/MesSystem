<template>
  <div class="p-4 bg-gray-50 min-h-screen font-sans text-gray-800">
    <div class="flex flex-col xl:flex-row gap-4 h-full">
      
      <!-- Cột trái (40%) -->
      <div class="w-full xl:w-[45%] bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <div class="flex items-center gap-2">
            <el-icon class="text-green-600 text-2xl"><Box /></el-icon>
            <h2 class="text-xl font-bold text-gray-700 m-0">Thông tin chờ nhập kho</h2>
          </div>
          <div class="bg-green-50 text-green-600 px-3 py-1 rounded-md border border-green-200 font-bold text-sm">
            Số lượng nhập lần này: {{ totalQuantity }}
          </div>
        </div>

        <!-- Buttons -->
        <div class="flex gap-3 mb-4">
          <button @click="confirmInbound" class="flex-1 bg-green-50 text-green-500 border border-green-200 hover:bg-green-100 py-3 rounded-[2rem] font-bold transition-colors text-base">
            Xác nhận nhập kho
          </button>
          <button class="flex-1 bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 py-3 rounded-[2rem] font-bold transition-colors flex items-center justify-center gap-1 text-base">
            <el-icon><Search /></el-icon>
            Lịch sử nhập kho
          </button>
        </div>

        <!-- Table -->
        <div class="flex-1 overflow-hidden rounded-lg border border-gray-100">
          <el-table :data="tableData" style="width: 100%; height: 100%;" class="h-full">
            <el-table-column prop="moldNo" label="Mã số khuôn" min-width="120" />
            <el-table-column prop="shoeName" label="Tên giày" min-width="140" />
            <el-table-column prop="partName" label="Tên bộ phận" min-width="100" />
            <el-table-column prop="size" label="Size" min-width="80" align="center">
              <template #default="scope">
                <span class="font-bold text-gray-600">{{ scope.row.size }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="quantity" label="Số lượng" min-width="70" align="center">
              <template #default="scope">
                <span class="font-bold text-green-600">{{ scope.row.quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="warehouse" label="Kho" min-width="90" />
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
          <el-icon class="text-green-600 text-2xl rotate-[135deg]"><Key /></el-icon>
          <h2 class="text-xl font-bold text-gray-700 m-0">Thao tác nhập kho</h2>
        </div>

        <!-- Form nhập liệu -->
        <el-form :model="form" label-position="left" label-width="90px" class="mb-2">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item required>
                <template #label><span class="text-red-500 mr-1">*</span> <span class="font-bold text-gray-600">Loại khuôn</span></template>
                <el-select v-model="form.moldType" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-green-500 font-bold"><Setting /></el-icon>
                  </template>
                  <el-option label="Khuôn dập" value="hammer" />
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
                <el-select v-model="form.partName" placeholder="Chọn bộ phận" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-green-500"><Grid /></el-icon>
                  </template>
                  <el-option label="Chọn bộ phận" value="" />
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
                    <span class="text-green-500 font-bold ml-1">±</span>
                  </template>
                </el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item>
                <template #label><span class="font-bold text-gray-600">Vị trí</span></template>
                <el-select v-model="form.location" placeholder="Chọn" class="w-full" size="large">
                  <template #prefix>
                    <el-icon class="text-green-500"><Location /></el-icon>
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
              <button class="bg-white text-green-500 border border-green-300 hover:bg-green-50 px-5 py-1.5 rounded-full font-bold transition-colors flex items-center gap-1 text-sm shadow-sm">
                <el-icon class="text-green-500 text-lg"><Coin /></el-icon>
                Nhập nguyên bộ
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
                  <el-button class="bg-gray-100"><el-icon class="text-green-500"><Delete /></el-icon></el-button>
                </template>
              </el-input>
            </div>

            <button @click="addPendingItem" class="w-full bg-green-50 hover:bg-green-100 text-green-600 border border-green-200 py-3 rounded-full font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
              <el-icon><Check /></el-icon>
              Xác nhận
            </button>
          </div>

          <!-- Right side: Numpad -->
          <div class="w-full lg:w-72">
            <div class="grid grid-cols-3 gap-3">
              <button v-for="num in ['7', '8', '9', '4', '5', '6', '1', '2', '3']" :key="num"
                @click="appendNumpad(num)"
                class="bg-[#f0f9eb] hover:bg-green-100 text-green-600 font-bold text-2xl h-14 rounded-[2rem] border border-[#e1f3d8] transition-colors shadow-sm flex items-center justify-center">
                {{ num }}
              </button>
              <button @click="appendNumpad('0')" class="col-span-2 bg-[#f0f9eb] hover:bg-green-100 text-green-600 font-bold text-2xl h-14 rounded-[2rem] border border-[#e1f3d8] transition-colors shadow-sm flex items-center justify-center">
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
          <div class="grid grid-cols-3 lg:grid-cols-4 gap-3">
            <button v-for="(size, index) in quickSizes" :key="index"
              @click="inputSize = size.replace(/\n/g, ', ')"
              class="bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 text-gray-700 font-bold py-2 px-2 rounded-full transition-all text-sm sm:text-base break-words flex flex-col items-center justify-center min-h-[48px]">
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
  Box, Search, Delete, Key, Setting, Grid, OfficeBuilding,
  Location, EditPen, Coin, Menu, Check, Back
} from '@element-plus/icons-vue'
import { globalStore } from '../store'
import { ElMessage } from 'element-plus'

// --- Dữ liệu cột trái ---
const tableData = ref([
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '3#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '3.5#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '4#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '4.5#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '5#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '5.5#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '6#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '6.5#', quantity: 1, warehouse: 'Kho khuôn dập' },
  { moldNo: '11-015-M-MID', shoeName: 'Cloudboom Strike 2 (M)', partName: '', size: '7#', quantity: 1, warehouse: 'Kho khuôn dập' },
])

const totalQuantity = computed(() => {
  return tableData.value.reduce((sum, item) => sum + item.quantity, 0)
})

const removeRow = (index: number) => {
  tableData.value.splice(index, 1)
}

// --- Dữ liệu cột phải ---
const form = ref({
  moldType: 'hammer',
  moldNo: '11-015-M-MID',
  partName: '',
  deliveryUnit: 'a1_line',
  warehouse: 'Kho khuôn dập',
  location: 'a_01'
})

const inputSize = ref('3#')
const inputQuantity = ref('1')

const quickSizes = [
  '3#', '3.5#', '4#',
  '4.5#', '5#', '5.5#',
  '6#', '6.5#', '7#',
  '7.5#', '8#', '8.5#'
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
    moldNo: form.value.moldNo,
    shoeName: 'Cloudboom Strike 2 (M)', // Mock name
    partName: form.value.partName,
    size: inputSize.value,
    quantity: parseInt(inputQuantity.value),
    warehouse: form.value.warehouse
  });
  ElMessage.success('Đã thêm vào danh sách chờ nhập kho');
}

// Gửi vào Store
const confirmInbound = () => {
  if (tableData.value.length === 0) {
    ElMessage.warning('Không có dữ liệu chờ nhập kho');
    return;
  }
  globalStore.processTransaction(tableData.value, false, form.value.warehouse, form.value.location);
  tableData.value = [];
  ElMessage.success('Xác nhận nhập kho thành công!');
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
