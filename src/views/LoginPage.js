import React, { useState } from 'react'
import Layout from '../components/Layout'
import { InputForm, FormButton } from '../components/forms'
import firebase from '../firebase/firebase'
import { useHistory } from 'react-router'

const LoginPage = () => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()

    const invalidData = () => login.trim() === '' || password.trim() === ''

    const signInButton = () => {
        firebase.auth().signInWithEmailAndPassword(login, password)
        .then(() => history.push('/shop'))
        .catch(err => alert(`Brak dostępu! ${err.code}`))
    }

    const signUpButton = () => {
        firebase.auth().createUserWithEmailAndPassword(login, password)
            .then(() => history.push('/shop'))
            .catch(err => alert(`Błąd tworzenia konta! ${err.code}`))
    }

    const signInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithRedirect(provider)
            .then(() => history.push('/shop'))
            .catch(err => alert(`Błąd autoryzacji Google! ${err.code}`))
    }

    return(
        <Layout>
            <form>
                <InputForm type={'text'} maxLength={'15'} placeholder={'Login'} value={login} onChange={e => setLogin(e.target.value)} />
                <InputForm type={'password'} maxLength={'15'} placeholder={'Hasło'} value={password} onChange={e => setPassword(e.target.value)} />
                <FormButton type={'submit'} disabled={invalidData()} onClick={signInButton}>Zaloguj</FormButton>
            </form>
            <FormButton onClick={signInWithGoogle}>Zaloguj za pomocą Google</FormButton>
            <FormButton disabled={invalidData()} onClick={signUpButton}>Utwórz konto</FormButton>
        </Layout>
    )
}

export default LoginPage
