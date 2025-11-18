<template>
  <div class="bg-surface-0 dark:bg-surface-950 px-6 py-4 md:px-12 lg:px-20">
    <div class="flex items-center flex-col lg:flex-row lg:justify-between">
      <div class="flex items-center flex-col md:flex-row gap-4">
        <Avatar
          label="K"
          image="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/pageheading/kathryn.png"
          size="xlarge"
          style="background-color: #ece9fc; color: #2a1261"
          shape="circle"
        />
        <div class="text-surface-900 dark:text-surface-0 font-semibold text-lg">{{ name }}</div>
      </div>
      <div class="flex items-start flex-col md:flex-row gap-8">
        <div class="flex flex-col">
          <div class="text-surface-700 dark:text-surface-100 mt-1">{{ phoneNumber }}</div>
          <div class="text-surface-500 dark:text-surface-300 mt-1">{{ email }}</div>
        </div>
      </div>

      <div class="mt-6 lg:mt-0 flex items-center gap-4">
        <Button
          icon="pi pi-pen-to-square"
          rounded
          outlined
          severity="secondary"
          icon-only
          class="shrink-0"
        />
        <Button
          icon="pi pi-trash"
          rounded
          outlined
          severity="secondary"
          icon-only
          class="shrink-0"
          @click="showConfirm($event)"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Avatar } from 'primevue'
import Button from 'primevue/button'
import { useConfirm } from 'primevue/useconfirm'

const confirm = useConfirm()

const props = defineProps({
  index: Number,
  name: String,
  phoneNumber: String,
  email: String,
})

const showConfirm = (event) => {
  console.log('Aqui')
  confirm.require({
    target: event.currentTarget,
    message: 'Você tem certeza de que deseja prosseguir?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Delete',
      severity: 'danger',
    },
    accept: () => {
      toast.add({
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Solicitação confirmada',
        life: 3000,
      })
    },
    reject: () => {
      toast.add({
        severity: 'error',
        summary: 'Rejected',
        detail: 'Solicitação rejeitada',
        life: 3000,
      })
    },
  })
}
</script>
