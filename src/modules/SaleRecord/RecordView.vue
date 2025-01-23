<script setup lang="ts">
import { fetchTotalSummary, getSaleReportWithPagination } from '@/api/sale/queires';
import { columns } from '@/modules/SaleRecord/chunks/RecordColumns';
import DataTable from '@/components/DataTable.vue';
import { computed, reactive, ref, watch } from 'vue';
import { paginationInfo, SaleReportType } from '@/api/sale/types';

const { data: summary } = fetchTotalSummary.useQuery();

const pagination = reactive<paginationInfo>({
    page: 1,
    pageSize: 10,
});

const changePage = (page: number) => {
    pagination.page = page;
};

const changePageSize = (pageSize: number) => {
    pagination.pageSize = pageSize;
};

const queryKey = computed(() => ['getAllUsers', pagination.page, pagination.pageSize]);

const { data, refetch } = getSaleReportWithPagination.useQuery(queryKey);

const tableData = computed(() => {
    return data.value?.items || [];
});

// Automatically refetch when pagination changes
watch(
    () => [pagination.page, pagination.pageSize],
    () => {
        refetch();
    }
);
</script>

<template>
    <div class="flex gap-5">
        <div
            class="border border-gray-200 p-3 px-10 my-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-gray-100 text-center shadow-xl">
            <p class="text-2xl font-bold">Total Revenue</p>
            <p class="text-xl font-semibold text-yellow-300">$ {{ summary?.totalRevenue }}</p>
        </div>
        <div
            class="border border-gray-200 p-3 px-10 my-5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-gray-100 text-center shadow-xl">
            <p class="text-2xl font-bold">Total Profit</p>
            <p class="text-xl font-semibold text-green-300">$ {{ summary?.totalProfit }}</p>
        </div>
    </div>
    <DataTable v-model:page="pagination.page" v-model:pageSize="pagination.pageSize" :columns="columns"
        :data="tableData" :data-info="data" @page-change="changePage" @page-size-change="changePageSize" />
</template>
