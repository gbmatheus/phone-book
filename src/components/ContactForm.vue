<template>
  <div class="card flex flex-col justify-center items-center gap-5">
    <Toast />

    <Form
      v-slot="$form"
      :initialValues
      :resolver="resolver"
      @submit="onFormSubmit"
      class="flex flex-col gap-4 w-full sm:w-56"
    >
      <div class="flex flex-col gap-1">
        <FloatLabel>
          <InputText id="over_label" name="name" type="text" placeholder="Nome" fluid />
          <label for="over_label">Nome</label>
        </FloatLabel>
        <Message v-if="$form.name?.invalid" severity="error" size="small" variant="simple">{{
          $form.name.error.message
        }}</Message>
      </div>

      <div class="flex flex-col gap-1">
        <InputText name="phoneNumber" type="text" placeholder="Telefone" class="w-full sm:w-56" />
        <Message v-if="$form.phoneNumber?.invalid" severity="error" size="small" variant="simple">{{
          $form.phoneNumber.error.message
        }}</Message>
      </div>
      <div class="flex flex-col gap-1">
        <InputText name="email" type="text" placeholder="E-mail" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error.message
        }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { zodResolver } from '@primevue/forms/resolvers/zod'
import { z } from 'zod'
import { useToast } from 'primevue/usetoast'
import { Button, FloatLabel, InputText, Message, Toast } from 'primevue'
import { Form } from '@primevue/forms'

const toast = useToast()

const initialValues = ref({
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

const onFormSubmit = ({ valid }) => {
  if (valid) {
    toast.add({ severity: 'success', summary: 'Form is submitted.', life: 3000 })
  }
}
</script>
