// 'http://localhost:5128/api/Contacts'
import { ref } from 'vue'

const endpoint = 'http://localhost:3000/contacts'

var myRequest = new Request(endpoint, {
  method: 'GET',
  cache: 'default',
  mode: 'no-cors',
})

fetch('http://localhost:3000/contacts', {
  headers: {
    accept: '*/*',
    'accept-language': 'pt-BR,pt;q=0.8',
    'sec-ch-ua': '"Chromium";v="142", "Brave";v="142", "Not_A Brand";v="99"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'sec-gpc': '1',
    Referer: 'http://localhost:5173/',
  },
  body: null,
  method: 'GET',
})

export async function useFetch() {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)

  try {
    const response = await fetch(urlServer)
    var result = await response.json()

    if (!response.ok) error.value = result
    else data.value = result
  } catch (err) {
    error.value = err.message
    console.log(err)
  } finally {
    loading.value = false
  }

  return { data, error, loading: loading.value }
}

export const ContactService = {
  getContactsData() {
    return [
      {
        id: 1,
        name: 'Name',
        email: 'teste@mail.com',
        phoneNumber: '122321223',
      },
      {
        id: 2,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 3,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 4,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 5,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 6,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 7,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 8,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 9,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 10,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 11,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 12,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 13,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 14,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 15,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 16,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 17,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 18,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 19,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 20,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
      {
        id: 21,
        name: 'string',
        email: 'teste@mail.com',
        phoneNumber: 'string',
      },
    ]
  },

  getContactsById(id) {
    return [
      {
        id: 1,
        name: 'Name',
        email: 'teste@mail.com',
        phoneNumber: '122321223',
      },
    ]
  },

  saveContact(contact) {
    // {
    //   name: String,
    //   email: String,
    //   phoneNumber: String
    // }
  },

  updateContact(id, contact) {
    // {
    //   name: String,
    //   email: String,
    //   phoneNumber: String
    // }
  },

  deleteContact(id) {
    // {
    //   name: String,
    //   email: String,
    //   phoneNumber: String
    // }
  },
}
