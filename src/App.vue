  <template>
    <div class="app-layout flex flex-col h-screen">
      <el-menu
        :default-active="activeIndex"
        class="border-b bg-white shadow-sm"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#409eff"
      >
        <div class="flex items-center px-6 font-bold text-xl text-gray-800 w-[250px] gap-2 tracking-tight">
          <el-icon class="text-blue-500"><Platform /></el-icon>
          DEMO
        </div>
        <el-menu-item index="inbound" class="font-bold text-base">
          <el-icon><Box /></el-icon>
          <span>Nhập kho</span>
        </el-menu-item>
        <el-menu-item index="outbound" class="font-bold text-base">
          <el-icon><Van /></el-icon>
          <span>Xuất kho</span>
        </el-menu-item>
        <el-menu-item index="history" class="font-bold text-base">
          <el-icon><Document /></el-icon>
          <span>Lịch sử tồn kho</span>
        </el-menu-item>
      </el-menu>

      <div class="flex-1 overflow-auto bg-gray-50">
        <MoldInbound v-if="activeIndex === 'inbound'" />
        <MoldOutbound v-else-if="activeIndex === 'outbound'" />
        <InventoryHistory v-else-if="activeIndex === 'history'" />
      </div>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { Box, Van, Document, Platform } from '@element-plus/icons-vue'
  import MoldInbound from './components/MoldInbound.vue'
  import MoldOutbound from './components/MoldOutbound.vue'
  import InventoryHistory from './components/InventoryHistory.vue'

  const activeIndex = ref('inbound')

  const handleSelect = (key: string) => {
    activeIndex.value = key
  }
  </script>

  <style>
  body {
    margin: 0;
    padding: 0;
    background-color: #f5f7fa;
  }
  .el-menu--horizontal .el-menu-item {
    height: 60px;
    line-height: 60px;
  }
  </style>
