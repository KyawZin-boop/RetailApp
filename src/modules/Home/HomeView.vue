<script setup lang="ts">
import { fetchSaleReport, fetchTotalSummary, getSaleReportWithinDate } from '@/api/sale/queires';
import { BarChart } from '@/components/ui/chart-bar'
import type { DateRange } from 'radix-vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { RangeCalendar } from '@/components/ui/range-calendar'
import { cn } from '@/lib/utils'
import {
    CalendarDate,
    DateFormatter,
    getLocalTimeZone,
} from '@internationalized/date'
import { Calendar as CalendarIcon } from 'lucide-vue-next'
import { reactive, type Ref, ref, watch } from 'vue'
import { string } from 'zod';
import { ReportDateType } from '@/api/sale/types';

const rangeData = ref();

const df = new DateFormatter('en-US', {
    dateStyle: 'medium',
})

const value = ref({
    start: new CalendarDate(2024, 12, 20),
    end: new CalendarDate(2025, 1, 20),
}) as Ref<DateRange>

const { mutate: getReportWithinDate } = getSaleReportWithinDate.useMutation({
    onSuccess: (data) => {
        rangeData.value = data.data;
        console.log("🚀 ~ data:", data)
        console.log(rangeData.value)
    }
})

const getDate = () => {
    if (value.value.start && value.value.end) {
        const dateObj: ReportDateType = {
            start: value.value.start.toString(),
            end: value.value.end.toString()
        }
        getReportWithinDate(dateObj);
    }
}

watch(() => value.value, () => {
    getDate();
})

const { data: summary } = fetchSaleReport.useQuery("getSaleReport");
rangeData.value = summary;

</script>

<template>
    <div class="container py-6">
        <Popover>
            <PopoverTrigger as-child>
                <Button variant="outline" :class="cn(
                    'w-[280px] justify-start text-left font-normal',
                    !value && 'text-muted-foreground',
                )">
                    <CalendarIcon class="mr-2 h-4 w-4" />
                    <template v-if="value.start">
                        <template v-if="value.end">
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }} - {{
                                df.format(value.end.toDate(getLocalTimeZone())) }}
                        </template>

                        <template v-else>
                            {{ df.format(value.start.toDate(getLocalTimeZone())) }}
                        </template>
                    </template>
                    <template v-else>
                        Pick a date
                    </template>
                </Button>
            </PopoverTrigger>
            <PopoverContent class="w-auto p-0">
                <RangeCalendar v-model="value" initial-focus :number-of-months="2"
                    @update:start-value="(startDate) => value.start = startDate" />
            </PopoverContent>
        </Popover>
        <BarChart index="name" :data="rangeData.value ?? []" :categories="['totalPrice', 'totalProfit']" :y-formatter="(tick, i) => {
            return typeof tick === 'number'
                ? `$ ${new Intl.NumberFormat('us').format(tick).toString()}`
                : ''
        }" :colors="['blue', 'orange']" :rounded-corners="4" />
    </div>
</template>