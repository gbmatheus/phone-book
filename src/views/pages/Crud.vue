<script setup>
import { FilterMatchMode } from '@primevue/core/api'
import {
  Avatar,
  Button,
  ConfirmPopup,
  DataView,
  Dialog,
  IconField,
  InputIcon,
  InputText,
  Message,
  Toast,
  Toolbar,
} from 'primevue'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { computed, onMounted, ref } from 'vue'
import { Form } from '@primevue/forms'
import { z } from 'zod'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { useFetch } from '@/hooks/useFetch'
import ContactItemLoading from '@/components/ContactItemLoading.vue'
import ContactItemEmpty from '@/components/ContactItemEmpty.vue'

const { data, error, loading, get, post, put, del } = useFetch()

const getError = computed(() => error.value.toString().replace(',', '\n'))

onMounted(async () => {
  await get('/contacts')
  contacts.value = data.value
  isLoading.value = loading
})

const toast = useToast()
const confirm = useConfirm()

const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
})
const submitted = ref(false)

const isLoading = ref(true)
const contactDialog = ref(false)
const contact = ref({})
const contacts = ref([])

const initialValues = ref({
  id: null,
  name: '',
  phoneNumber: '',
  email: '',
})

const resolver = ref(
  zodResolver(
    z.object({
      name: z.string().min(1, { message: 'Nome é obrigatório' }),
      email: z.email({ message: 'E-mail inválido' }),
      phoneNumber: z
        .string()
        .regex(
          /^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/,
          { message: 'Tefone inválido.' },
        ),
    }),
  ),
)

const onFormSubmit = ({ valid, values }) => {
  if (valid) {
    console.log({ valid, values, initial: initialValues.value })
    // saveContact()
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}

function openNewContact() {
  contact.value = {}
  submitted.value = false
  contactDialog.value = true
}

function hideDialog() {
  contactDialog.value = false
  submitted.value = false
}

async function saveContact() {
  submitted.value = true

  if (contact?.value.name?.trim()) {
    try {
      let messageSuccess = 'Contato Criado'
      if (contact.value.id) {
        await put(`/contacts/${contact.value.id}`, contact.value)
        messageSuccess = 'Contato Atualizado'
      } else await post('/contacts', contact.value)

      await get('/contacts')
      contacts.value = data.value

      toast.add({
        severity: 'success',
        summary: 'Sucesso',
        detail: messageSuccess,
        life: 3000,
      })

      // ! CORRIGIR ISSO
      contactDialog.value = false
      contact.value = {}
    } catch (err) {
      toast.add({
        severity: 'error',
        summary: 'Rejeitado',
        detail: getError,
        life: 3000,
      })
    }
  }
}

function editContact(data) {
  contact.value = { ...data }
  initialValues.value = { ...data }
  contactDialog.value = true
}

const confirmDeleteContact = (event, item) => {
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
    accept: async () => {
      console.log('confirmDeleteContact deletando')

      await del(`/contacts/${item.id}`)
      await get('/contacts')
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

<template>
  <div class="flex flex-col items-center">
    <ConfirmPopup />
    <Toast />

    <div class="w-full max-w-7xl overflow-auto bg-white shadow-m">
      <Toolbar class="mb-6">
        <template #start>
          <Button label="Adicionar" icon="pi pi-plus" class="mr-2" @click="openNewContact" />
        </template>
      </Toolbar>

      <DataView :value="contacts" paginator :rows="10" :lazy="true">
        <template #header>
          <div class="flex flex-wrap gap-2 items-center justify-between">
            <h4 class="m-0">Agenda Telefônica</h4>
            <IconField>
              <InputIcon>
                <i class="pi pi-search" />
              </InputIcon>
              <InputText v-model="filters['global'].value" placeholder="Buscando..." />
            </IconField>
          </div>
        </template>

        <template #empty>
          <ContactItemLoading v-if="isLoading" />
          <ContactItemEmpty v-else />
        </template>
        <template #list="slotProps">
          <div class="flex flex-col max-h-192 overflow-auto">
            <div v-for="(item, index) in slotProps.items" :key="index">
              <div class="bg-surface-0 dark:bg-surface-950 px-4 py-4 md:px-8 lg:px-12">
                <div class="flex items-center flex-col lg:flex-row lg:justify-between">
                  <div class="flex items-center basis-6/12 flex-col md:flex-row gap-4">
                    <Avatar
                      :label="item.name[0]"
                      image="https://fqjltiegiezfetthbags.supabase.co/storage/v1/object/public/block.images/blocks/pageheading/kathryn.png"
                      size="xlarge"
                      style="background-color: #ece9fc; color: #2a1261"
                      shape="circle"
                    />
                    <div class="text-surface-900 dark:text-surface-0 font-semibold text-lg">
                      {{ item.name }}
                    </div>
                  </div>
                  <div class="flex items-start flex-col basis-5/12 md:flex-row gap-8">
                    <div class="flex flex-col">
                      <div class="text-surface-700 dark:text-surface-100 mt-1">
                        {{ item.phoneNumber }}
                      </div>
                      <div class="text-surface-500 dark:text-surface-300 mt-1">
                        {{ item.email }}
                      </div>
                    </div>
                  </div>

                  <div class="mt-6 lg:mt-0 flex items-center justify-end basis-1/12 gap-4">
                    <Button
                      icon="pi pi-pencil"
                      outlined
                      rounded
                      class="mr-2"
                      @click="editContact(item)"
                    />
                    <Button
                      icon="pi pi-trash"
                      outlined
                      rounded
                      severity="danger"
                      @click="confirmDeleteContact($event, item)"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </DataView>
    </div>

    <Dialog
      v-model:visible="contactDialog"
      :style="{ width: '450px' }"
      header="Detalhes do Contato"
      :modal="true"
    >
      <!-- <Form
        v-slot="$form"
        :initialValues
        :resolver="resolver"
        @submit="onFormSubmit"
        class="block m-auto pb-4"
      >
        <div class="mb-2">
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText id="name" name="name" type="text" placeholder="Nome" class="w-full" />
          <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
            $form.name.error.message
          }}</Message>
        </div>

        <div class="mb-2">
          <label for="phoneNumber" class="block font-bold mb-3">Telefone</label>
          <InputText name="phoneNumber" type="text" placeholder="Telefone" class="w-full" />
          <Message
            v-if="$form.phoneNumber?.invalid"
            severity="error"
            size="small"
            variant="simple"
            >{{ $form.phoneNumber.error.message }}</Message
          >
        </div>

        <div class="mb-2">
          <label for="email" class="block font-bold mb-3">E-mail</label>
          <InputText name="email" type="text" placeholder="E-mail" class="w-full" />
          <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
            $form.email.error.message
          }}</Message>
        </div>
        <div class="flex justify-end mb-2">
          <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
          <Button type="submit" icon="pi pi-check" severity="contrast" label="Submit" />
        </div>
      </Form> -->

      <div class="flex flex-col gap-6">
        <img
          v-if="contact?.image"
          :src="`https://primefaces.org/cdn/primevue/images/product/${contact.image}`"
          :alt="contact?.image"
          class="block m-auto pb-4"
        />
        <div>
          <label for="name" class="block font-bold mb-3">Name</label>
          <InputText
            id="name"
            v-model.trim="contact.name"
            required="true"
            autofocus
            :invalid="submitted && !contact.name"
            fluid
          />
          <small v-if="submitted && !contact.name" class="text-red-500">Nome é obrigatório.</small>
        </div>

        <div>
          <label for="email" class="block font-bold mb-3">E-mail</label>
          <InputText
            id="email"
            v-model.trim="contact.email"
            required="true"
            autofocus
            :invalid="submitted && !contact.email"
            fluid
          />
          <small v-if="submitted && !contact.email" class="text-red-500">
            E-mail é obrigatório.
          </small>
        </div>

        <div>
          <label for="phoneNumber" class="block font-bold mb-3">Telefone</label>
          <InputText
            id="phoneNumber"
            v-model.trim="contact.phoneNumber"
            required="true"
            autofocus
            :invalid="submitted && !contact.phoneNumber"
            fluid
          />
          <small v-if="submitted && !contact.phoneNumber" class="text-red-500">
            Telefone é obrigatório.
          </small>
        </div>
      </div>

      <template #footer>
        <Button label="Cancelar" icon="pi pi-times" text @click="hideDialog" />
        <Button label="Salvar" icon="pi pi-check" @click="saveContact" />
      </template>
    </Dialog>
  </div>
</template>
