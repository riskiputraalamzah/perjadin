import { defineStore } from 'pinia'
import { ref } from 'vue'
import { openDB } from 'idb'

export const useIDBStore = defineStore('idb', () => {
  const dbName = 'PERJADIN_DB'
  const db = ref(null)

  // mengecek apakah database sudah ada atau belum
  const checkDB = async () => {
    const databases = await indexedDB.databases()

    // jika true , maka database sudah ada,
    // jika false, maka database belum ada
    return databases.some((db) => db.name === dbName)
  }

  // jika sudah ada, buka dan buatkan objek di dalam nya
  const initDB = async (name) => {
    db.value = await openDB(dbName, 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(name)) {
          db.createObjectStore(name, { keyPath: 'id', autoIncrement: true })
        }
      }
    })
    return console.log('database berhasil di buat ')
  }

  const updateData = async (nameObject, key, value, newData) => {
    if (!db.value) await initDB(nameObject)
    const transaction = db.value.transaction(nameObject, 'readwrite')
    const store = transaction.objectStore(nameObject)

    // Dapatkan data yang ingin diupdate
    const allData = await store.getAll()

    const findData = allData.find((data) => data[key] === value)
    const findDataIsExist = findData ? findData.id : null // Mengembalikan ID jika ditemukan

    // Dapatkan data yang ingin diupdate
    const data = await store.get(findDataIsExist)
    // Jika data ditemukan, update dengan newData
    if (data) {
      const updatedData = { ...data, ...newData } // Gabungkan data lama dengan data baru
      await store.put(updatedData) // Update data
      return updatedData
    } else {
      throw new Error(`Data ${nameObject} dengan ${key} ${value} tidak ditemukan.`)
    }
  }
  // tambahkan data objek ke dalam yang telah di buat oleh initDB
  const saveToIndexedDB = async (name, data) => {
    const tx = db.value.transaction(name, 'readwrite')
    const store = tx.objectStore(name)

    // Simpan setiap item dalam array ke IndexedDB
    for (const item of data) {
      await store.add(item)
    }
    await tx.done
    return console.log(`Data ${name} berhasil disimpan ke database`)
  }

  // workflow
  const storeToDB = async (name, data) => {
    await initDB(name)
    await saveToIndexedDB(name, data)
    return console.log(`${name} telah berhasil di buat`)
  }

  // mengambil data objek
  const fetchData = async (name) => {
    if (!db.value) await initDB(name)
    const tx = db.value.transaction(name, 'readonly')
    const store = tx.objectStore(name)
    const result = await store.getAll()
    return result
  }

  // Fungsi untuk menambahkan data ke IndexedDB
  const addItem = async (name, data) => {
    if (!db.value) await initDB(name)
    const tx = db.value.transaction(name, 'readwrite')
    const store = tx.objectStore(name)
    await store.add(data)
    await tx.done
  }

  const createObjectURL = (file) => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return null
  }

  const updateUserLocalStorage = (dataUser) => {
    const user = JSON.parse(localStorage.getItem('user'))
    const newUser = JSON.stringify({ ...user, ...dataUser })
    localStorage.setItem('user', newUser)
  }

  return {
    checkDB,
    storeToDB,
    fetchData,
    addItem,
    updateData,
    updateUserLocalStorage,
    createObjectURL
  }
})
