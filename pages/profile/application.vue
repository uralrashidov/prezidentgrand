<template>
    <div>
        <div class="title">
            Mening arizam
        </div>
        <button class="app--btn" @click="showDrawer">
            Ariza to'ldirish
        </button>
        <a-drawer
            title="Ariza"
            :width="720"
            :visible="visible"
            :body-style="{ paddingBottom: '80px' }"
            @close="onClose"
        >
        <div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure, culpa?
        </div>
        <div
            :style="{
            position: 'absolute',
            right: 0,
            bottom: '30px',
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
            }"
        >
            <a-button size="large" :style="{ marginRight: '8px' }" @click="onClose">
            Bekor qilish
            </a-button>
            <a-button size="large" type="primary" @click="onClose">
            Saqlash
            </a-button>
        </div>
        </a-drawer>
    </div>
</template>
<script>
export default {
    layout: 'menuLayout',
    data(){
        return {
            visible: false,
        }
    },
    methods: {
        showDrawer() {
            this.visible = true;
        },
        onClose() {
            this.visible = false;
        },
    },
}
</script>