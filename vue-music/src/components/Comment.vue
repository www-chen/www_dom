<template>
    <div>
        <div v-if="!arr.length" class="nocom">暂无评论</div>
        <div v-else>
            <ul class="comlist" >
                <li v-for="(d,i) in arr" :key="i" >
                    <div class="comleft"><img :src="d.user.avatarUrl" ></div>
                    <div class="comright">
                        <h4>{{d.user.nickname}}</h4>
                        <p>{{d.content}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            id:0,
            arr:[]
        }
    },
    watch:{
        'id':{
            handler(){
                this.getcomData()
            }
        },
    },
    created(){
        this.$bus.$on('Id',(val)=>{this.id=val});
    },
    methods:{
        async getcomData(){
            this.$axios.get('/comment/hot?type=0',{params:{id:this.id}}).then(res=>{
                // console.log('comgeet',res.data)
                if(res.data.code==200){
                    this.arr=res.data.hotComments;
                }
            })
        }
    },

}
</script>

<style>
    .nocom{
        margin: 0 auto;
        width: 100px;
        text-align: center;
        margin-top: 30px;
    }
    .comright h4{
        padding-bottom: 8px;
    }
    .comright p{
        font-size: 14px;
        padding-bottom: 8px;
    }
    .comleft img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        margin:3px 5px;
    }
    .comright{
        flex-grow: 1;
    }
    .comleft{
        width: 60px;
    }
    .comlist>li{
        margin-top: 5px;
        display: flex;
        border-bottom: 1px solid white;
    }
</style>