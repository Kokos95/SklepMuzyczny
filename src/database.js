import firebase from './firebase/firebase'

const LOCAL_STORAGE_KEY = 'sklepMuzycznyDB'

let db = {
    cart: []
}

export const loadDatabase = () => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY)
    if(data) db = JSON.parse(data)
    console.log('LOADED', db)
}

export const saveDatabase = () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(db))
    console.log('SAVED', db)
}

export const clearDatabase = () => {
    db = {
        cart: []
    }
    saveDatabase()
    alert('Baza danych została usunięta!')
}

export const getUserCart = () => {
    return db.cart
}

export const addToCart = (item) => {
    if(db.cart.some(i => i.id === item.id)) {
        return 'EXIST'
    }else{
        db.cart.push(item)
        saveDatabase()
        return 'OK'
    }
}

export const removeFromCart = (productId) => {
    const idx = db.cart.findIndex(i => i.id === productId)
    if(idx >= 0) {
        db.cart.splice(idx, 1)
        saveDatabase()
        return 'OK'
    }
    return 'ERROR'
}

export const clearCart = (login) => {
    db.cart = []
    saveDatabase()
    return 'OK'
}

export const getUserOrders = () => {
    const user = firebase.auth().currentUser
    if(!user) return Promise.resolve([])
    return firebase.firestore().collection('orders').where('user', '==', user.uid).get()
    .then(snap => {
        const docs = []
            snap.forEach(doc => {
                docs.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            return docs
    })
    .catch(err => {
        console.error(err)
        return []
    })
}

export const createNewOrderFromCart = () => {
    const cart = getUserCart()
    const user = firebase.auth().currentUser
    if(!user) return Promise.resolve([])
    let sum = 0
    cart.forEach(item => sum += item.price)
    const data = {
        date: Date.now(),
        items: cart,
        total: sum,
        user: user.uid,
    }
    saveDatabase()
    clearCart()
    return firebase.firestore().collection('orders').add(data)
}
