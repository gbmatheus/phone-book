import { body } from '@primeuix/themes/aura/card'
import { ref } from 'vue'

// const urlServer = 'http://localhost:3000/contacts'
// http://localhost:5128/swagger/index.html
// /api/Contacts

const urlApi = import.meta.env.VITE_API_URL
console.log({ urlApi })

// export function useFetch(url = 'http://localhost:3000') {
export function useFetch(url = `${urlApi}/api`) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  const httpRequest = async (endpoint, options = {}) => {
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await fetch(`${url}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      })

      if (!response.ok) {
        const err = await response.json()
        let messageError = `Error ${response.status}: ${response.statusText}`
        if (err.errorsMessages) {
          error.value = err.errorsMessages
          messageError += ` ErrorMessages: ${err.errorsMessages}`
        }

        throw new Error(messageError)
      }

      const contentType = response.headers.get('content-type')
      if (contentType && contentType.includes('application/json'))
        data.value = await response.json()
      else data.value = await response.text()

      return data.value
    } catch (err) {
      if (error.value === null) error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  const get = async (endpoint, options = {}) => {
    return httpRequest(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  const post = async (endpoint, body, options = {}) => {
    return httpRequest(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    })
  }

  const put = async (endpoint, body, options = {}) => {
    return httpRequest(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
      ...options,
    })
  }

  const patch = async (endpoint, body, options = {}) => {
    return httpRequest(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    })
  }

  const del = async (endpoint, options = {}) => {
    return httpRequest(endpoint, {
      method: 'DELETE',
      ...options,
    })
  }

  return { data, error, loading: loading.value, get, post, put, patch, del }
}
