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

  return {
    checkDB,
    storeToDB,
    fetchData,
    addItem
  }
})
