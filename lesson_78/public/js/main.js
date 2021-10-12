const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    methods: {
        async getJson(url) {
            try {
                const result = await fetch(url);
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.setError(error);
            }
        },
        async postJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.setError(error);
            }
        },
        async putJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error5);
                this.$refs.error.setError(error);
            }
        },
        async deleteJson(url, data) {
            try {
                const result = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });
                return await result.json();
            } catch (error) {
                // console.log(error);
                this.$refs.error.setError(error);
            }
        },
    }
})

