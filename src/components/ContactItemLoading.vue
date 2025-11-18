<script setup>
import { Skeleton } from 'primevue'
</script>

<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-4 md:px-12 lg:px-20">
    <div class="flex items-center flex-col lg:flex-row lg:justify-between">
      <div class="flex items-center flex-col md:flex-row gap-4">
        <Skeleton shape="circle" size="4rem" class="bg-gray-200 dark:bg-gray-700" />
        <div class="text-surface-900 dark:text-surface-0 font-semibold text-lg">
          <Skeleton width="10rem" height="1.5rem" class="bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <div class="flex items-start flex-col md:flex-row gap-8 mt-4 md:mt-0">
        <div class="flex flex-col gap-2">
          <Skeleton width="8rem" height="1rem" class="bg-gray-200 dark:bg-gray-700" />
          <Skeleton width="12rem" height="1rem" class="bg-gray-200 dark:bg-gray-700" />
        </div>
      </div>

      <div class="mt-6 lg:mt-0 flex items-center gap-4">
        <Skeleton
          width="2.5rem"
          height="2.5rem"
          class="rounded-full bg-gray-200 dark:bg-gray-700"
        />
        <Skeleton
          width="2.5rem"
          height="2.5rem"
          class="rounded-full bg-gray-200 dark:bg-gray-700"
        />
      </div>
    </div>
  </div>
</template>
