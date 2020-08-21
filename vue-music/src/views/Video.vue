<template>
    <div>
        <div class="videoshow">
            <div class="wait_img" :style="waitflag?'display:block':'display:none'"></div>
            <video :src="videourl" controls autoplay></video>
            <button @click="back">X</button>
        </div>
    </div>
</template>

<script>
export default {
    created(){
        let id = this.$route.query.id;
        this.$bus.$on('waitflag',(val)=>{this.waitflag=val})
        this.getvideo(id)
    },
    methods:{
        getvideo(id){
            this.$axios.get('/mv/url',{params:{id}}).then(res=>{
                // console.log('video',res.data)
                if (res.data.code==200){
                    this.videourl=res.data.data.url
                }
            })
        },
        back(){
            this.$router.push('/')
        }
    },
    data(){
        return {
            videourl:'',
            waitflag:false
        }
    },
    // beforeRouterEnter(to,from,next){
    //     if(from.path=='/'){
    //         next();
    //     }
    // }
}
</script>

<style>
.wait_img{
    position: absolute;
    width:254px;
    height: 254px;
    margin-top: -158px;
    margin-left: -117px;
    top:50%;
    left: 50%;
    background-image: url(../../imgs/loading.gif);
    background-repeat: no-repeat;
    background-size: 254px 254px;
    z-index: 5
}

.videoshow>button{
    border: 1px solid black;
    text-align: center;
    padding: 10px;
    width: 40px;
    height: 40px;
    font-size: 20px;
    position: fixed;
    top: 10px;
    right: 10px;
}
.videoshow{
    height: 100vh;
    width:100vm;
    display: flex;
    justify-content: center;
    align-items: center;
    
}
.videoshow>video{
    width:900px;
    height:600px;
}
</style>