import firebase from 'firebase/app'


export default {
    actions: {
        async login({dispatch, commit}, {email, password}){
            try{
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch (e) {
                console.log(dispatch)
                commit('setError', e)
                throw e
            }
        },
    async register({dispatch, commit},{email,password,name}){
        try{
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            const uid = await dispatch('getUid')
            console.log(uid);
            await firebase.database().ref(`/users/${uid}/info`).set({
                bill: 1000,
                name
            })
        } catch (e){
            commit('setError', e)
            console.log(dispatch)
            throw e
        }
    },
    getUid(){
        const user = firebase.auth().currentUser
        return user ? user.uid : null
    },
    async logout() {
        await firebase.auth().signOut()
    }
}}