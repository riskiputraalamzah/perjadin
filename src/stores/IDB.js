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
  const initDB = async (storeName) => {
    // Buka database untuk memeriksa versi saat ini
    db.value = await openDB(dbName)

    // Cek apakah object store sudah ada
    if (db.value.objectStoreNames.contains(storeName)) {
      console.log(`Object store ${storeName} sudah ada.`)
      return db.value // Kembalikan database tanpa perubahan
    }

    // Jika object store belum ada, tingkatkan versi
    const newVersion = db.value.version + 1
    db.value.close() // Tutup database sebelum membuka dengan versi baru

    // Buka database dengan versi baru dan tambahkan object store
    db.value = await openDB(dbName, newVersion, {
      upgrade(upgradedDb) {
        if (!upgradedDb.objectStoreNames.contains(storeName)) {
          upgradedDb.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
          console.log(`Object store ${storeName} berhasil dibuat.`)
        }
      }
    })

    return db.value
  }

  const updateData = async (nameObject, key, value, newData) => {
    if (!db.value) await initDB(nameObject)
    const transaction = db.value.transaction(nameObject, 'readwrite')
    const store = transaction.objectStore(nameObject)

    try {
      // Gunakan key utama untuk mendapatkan data yang ingin diupdate
      const data = await store.get(value) // Mengambil data berdasarkan key utama

      if (data) {
        // Gabungkan data lama dengan data baru
        const updatedData = { ...data, ...newData }
        await store.put(updatedData) // Update data

        console.log('Data berhasil diupdate:', updatedData)
        return updatedData
      } else {
        throw new Error(`Data ${nameObject} dengan ${key} ${value} tidak ditemukan.`)
      }
    } catch (error) {
      console.error('Error saat mengupdate data di IndexedDB:', error)
      throw error
    }
  }

  // tambahkan data objek ke dalam yang telah di buat oleh initDB
  const saveToIndexedDB = async (name, data) => {
    const tx = db.value.transaction(name, 'readwrite')
    const store = tx.objectStore(name)

    // Simpan setiap item dalam array ke IndexedDB
    for (const item of data) {
      // Tambahkan createdAt ke dalam data
      item.createdAt = new Date().toISOString()

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
    try {
      // Periksa apakah nama objek valid
      if (!name?.trim()) {
        console.error('Nama objek store tidak boleh kosong')
        return [] // Kembalikan array kosong jika nama tidak valid
      }

      // Inisialisasi database jika belum ada atau jika transaksi gagal

      await initDB(name)
      console.log(name, 'berhasil di buatkan object store nya')
      // Mulai transaksi dan ambil data dari object store
      const tx = db.value.transaction(name, 'readonly')
      const store = tx.objectStore(name)
      const allData = await store.getAll()
      // Sortir data berdasarkan createdAt
      return allData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } catch (error) {
      console.error(`Gagal mengambil data ${name}:`, error)
      return [] // Kembalikan array kosong jika terjadi kesalahan
    }
  }

  // Fungsi untuk menambahkan data ke IndexedDB
  // Fungsi untuk menambahkan data ke IndexedDB dan mengembalikan ID
  const addItem = async (name, data) => {
    if (!db.value) await initDB(name)
    const tx = db.value.transaction(name, 'readwrite')
    const store = tx.objectStore(name)

    // Tambahkan createdAt ke dalam data
    data.createdAt = new Date().toISOString()

    // Tambahkan data dan dapatkan ID
    const id = await store.add(data)

    await tx.done

    // Kembalikan ID dari data yang baru ditambahkan
    return id
  }

  const deleteItem = async (nameObject, key, value) => {
    // Inisialisasi database jika belum diinisialisasi
    if (!db.value) await initDB(nameObject)

    const transaction = db.value.transaction(nameObject, 'readwrite')
    const store = transaction.objectStore(nameObject)

    // Ambil semua data dalam object store
    const allData = await store.getAll()

    // Cari data berdasarkan key dan value yang diberikan
    const findData = allData.find((data) => data[key] === value)

    // Jika data ditemukan, hapus dari object store
    if (findData) {
      await store.delete(findData.id)
      console.log(`Data dengan ${key} = ${value} berhasil dihapus.`)
    } else {
      throw new Error(`Data ${nameObject} dengan ${key} ${value} tidak ditemukan.`)
    }
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

  const deleteItemById = async (nameStore, id) => {
    if (!db.value) await initDB(nameStore)
    try {
      const transaction = db.value.transaction(nameStore, 'readwrite') // Ganti 'storeName' dengan nama object store Anda
      const objectStore = transaction.objectStore(nameStore)
      objectStore.delete(id)
      return true
    } catch (error) {
      console.error(`Gagal Mendelete data ${nameStore}:`, error)
      return false
    }
  }

  const findData = async (objectStore, id) => {
    // Jika id null, langsung return false
    if (id === null || id === undefined) {
      return false
    }

    // Pastikan IndexedDB sudah diinisialisasi
    if (!db.value) await initDB(dbName) // Ganti 'dbName' dengan nama database yang benar

    const tx = db.value.transaction(objectStore, 'readonly') // Gunakan object store yang ditentukan
    const store = tx.objectStore(objectStore)

    // Ambil data berdasarkan id
    const data = await store.get(id)

    await tx.done

    // Jika data ditemukan, kembalikan data, jika tidak, return false
    return data ? data : false
  }

  const getAllDataFromStore = async (storeName) => {
    try {
      if (!db.value) await initDB(dbName)
      const tx = db.value.transaction(storeName, 'readonly')
      const store = tx.objectStore(storeName)
      const allData = await store.getAll()
      await tx.done
      return allData
    } catch (error) {
      console.error(`Error getting data from store ${storeName}:`, error)
      return [] // Return an empty array if there is an error
    }
  }

  return {
    getAllDataFromStore,
    initDB,
    checkDB,
    storeToDB,
    fetchData,
    findData,
    addItem,
    updateData,
    updateUserLocalStorage,
    createObjectURL,
    deleteItem,
    deleteItemById
  }
})
