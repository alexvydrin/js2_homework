Vue.component('filter_field',
    /* Компонент для фильтра (поиска) */
    {
        template: `
            <form action="#" class="search-form" @submit.prevent="$root.filter">
                <!-- при нажатии кнопки OK вызываем метод filter -->
                <input type="text" class="search-field" v-model="$root.userSearch">  <!-- связь со строкой для фильтра -->
                <button type="submit" class="btn-search">
                    <i class="fas fa-search"></i>
                </button>
            </form>`
    });
