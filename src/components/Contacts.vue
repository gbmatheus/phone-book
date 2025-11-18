<template>
  <div class="card">
    <ConfirmPopup></ConfirmPopup>
    <DataView :value="products" paginator :rows="5">
      <template #list="slotProps">
        <div class="flex flex-col">
          <div v-for="(item, index) in slotProps.items" :key="index">
            <ContactItem
              :index="index"
              :name="item.name"
              :email="item.description"
              :phone-number="item.code"
            />
          </div>
        </div>
      </template>
    </DataView>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ProductService } from '@/service/ProductService'
import { Avatar, Button, Card, ConfirmPopup, DataView, Tag } from 'primevue'
import ContactItem from './ContactItem.vue'

onMounted(() => {
  ProductService.getProductsSmall().then((data) => (products.value = data))
})

const products = ref()
const getSeverity = (product) => {
  switch (product.inventoryStatus) {
    case 'INSTOCK':
      return 'success'

    case 'LOWSTOCK':
      return 'warn'

    case 'OUTOFSTOCK':
      return 'danger'

    default:
      return null
  }
}
</script>
