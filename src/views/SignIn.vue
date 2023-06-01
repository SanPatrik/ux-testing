
<template class="v-card">
    <div class="search-container">
        <div class="card">
            <div class="card-content">
                <div class="content">
<!--                    <div class="columns is-mobile is-vcentered">-->

<!--                        <div class="column has-text-left">-->
<!--                            <div><b>Username</b></div>-->
<!--                            <div><b>Email</b></div>-->
<!--                            <div><b>Password</b></div>-->
<!--                        </div>-->

<!--                        <div class="column has-text-right is-5">-->

<!--                        </div>-->



<!--                    </div>-->
                    <v-layout row wrap class="is-align-items-center">
                            <v-divider></v-divider>
                            <span class="mx-2 w-66">Google SignIn</span>
                            <v-divider></v-divider>
                    </v-layout>
                    <button @click="bounce(); googleSignIn()" :class="{ bounce: isBouncing }">
                        <svg-icon type="mdi" :path="path"></svg-icon>
                    </button>
                    <v-divider></v-divider>
                </div>
            </div>
        </div>

    </div>


    <FooterComp/>
</template>

<script>
import {defineComponent} from 'vue';
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiGoogle  } from '@mdi/js';
import {auth, googleProvider, db} from "@/firebase";
import {doc, setDoc} from "firebase/firestore";
import { signInWithPopup } from 'firebase/auth';
// Components
import FooterComp from "@/components/FooterComp";
import router from "@/router";





// Exports
export default defineComponent({
    name: 'SignIn',

    components: {
        SvgIcon,
        FooterComp,

    },
    data() {
        return {
            path: mdiGoogle ,
            isBouncing: false,
        }
    },
    methods: {
        async googleSignIn(){
            try {
                const result = await signInWithPopup(auth, googleProvider);
                console.log('User signed in:', result.user);
                await this.saveUserToFirestore(result.user);
                await router.push("/dashboard")
            } catch (error) {
                console.error('Google Sign-In error:', error);
            }
        },
        async saveUserToFirestore(user) {
            const userRef = doc(db, 'Authors', user.uid);

            const userData = {
                Username: user.displayName,
                Email: user.email,
            };

            await setDoc(userRef, userData, { merge: true });
        },
        bounce() {
            this.isBouncing = true;
            setTimeout(() => {
                this.isBouncing = false;
            }, 1000);
        },
    },

});
</script>
<style scoped lang="scss">
@keyframes bounce {
    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-10px);
    }
    60% {
        transform: translateY(-7px);
    }
}

.bounce {
    animation: bounce 1s ease;
}



.search-container{
    max-width: 600px;
    padding: 20px;
    margin: 0 auto;
}

</style>
