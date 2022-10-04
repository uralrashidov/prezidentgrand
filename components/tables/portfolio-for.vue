<template>
    <div>
        <a-table :scroll="{ x: 'calc(700px + 40%)', y: '100%' }" :pagination="false" :columns="columns" :data-source="items" :rowKey="
            (record, index) => {
            return index;
            }
        ">
            <div slot="name" slot-scope="text">{{ text }}</div>
            <span slot="action" slot-scope="text, record">
                <a download target="_blank" :href="record.fileUrl">Faylni ko'rish</a>
            </span>
        </a-table>
    </div>
</template>
<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    scopedSlots: { customRender: 'id' },
  },
  {
    title: 'Til',
    dataIndex: 'language',
    key: 'language',
    scopedSlots: { customRender: 'language' },
  },
  {
    title: 'Turi',
    dataIndex: 'certificateType',
    key: 'certificateType',
    scopedSlots: { customRender: 'certificateType' },
  },
  {
    title: 'Til darajasi',
    dataIndex: 'level',
    key: 'level',
    scopedSlots: { customRender: 'level' },
  },
  {
    title: 'Berilgan vaqti',
    dataIndex: 'givenDate',
    key: 'givenDate',
    scopedSlots: { customRender: 'givenDate' },
  },
  {
    title: 'Fayl',
    dataIndex: 'action',
    scopedSlots: { customRender: 'action' },
  },
];
export default {
    props: {
        data: {
            typeof: Array,
            default: null
        }
    },
    data() {
        return {
            columns,
            current: 1,
            total: 50,
            items: this.data
        };
    },
    methods: {
        handelChange(current){
            let num1 = (current-1)*5
            let num2 = current*5 - 1
            this.items.splice(num1, num2)
        }
    },
    mounted(){
        this.total = (this.data.length % 5 === 0) ? (this.data.length / 5)*10 : (parseInt(this.data.length / 5 )+1)*10 
    },
};
</script>
