Vue.component('error_message',
    /* Компонент для сообщения об ошибке */
    {
        template: `
            <div v-show="$root.error">
             
                <h3>Ошибка доступа к API</h3>
            </div>`
    });
