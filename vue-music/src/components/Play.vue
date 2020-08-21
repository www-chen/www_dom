<template>
    <div>
        <div class="wait_img" :style="waitflag?'display:block':'display:none'"></div>
        <div class="playimg active"   :style="flag?'animation-play-state:running':'animation-play-state:paused'">
            <div v-if="playimgurl"><img :src="playimgurl" ></div>
            <div v-else><img src="../../imgs/cover.jpg" ></div>
            <img src="../../imgs/disc.png" >
        </div>
        <div class="name">{{name}}</div>
        <div class="bar" :class="flag?'topaly':'tostop'"><img src="../../imgs/player_bar.png" ></div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            playimgurl:'',
            name:'',
            flag:false,
            id:'',
            waitflag:false
        }
    },
    watch:{
        'id':{
            handler(){
                this.getimg();
            }
        }
    },
    created(){
        this.$bus.$on('Id',(val)=>{this.id=val});
        this.$bus.$on('flag',(val)=>{this.flag=val})
        this.$bus.$on('waitflag',(val)=>{this.waitflag=val})
    },
    methods:{
        async getimg(){
            this.$axios.get('/song/detail',{params:{ids:this.id}}).then(res=>{
                // console.log('封面',res.data)
                if(res.data.code==200){
                    this.playimgurl=res.data.songs[0].al.picUrl;
                    this.name=res.data.songs[0].al.name
                }
            }).catch(err=>{
                console.log('获取封面图片失败')
            })
        }
    }
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
    .active{
        animation: 5s move linear infinite;
    }
    @keyframes move {
        from {transform: rotate(0deg);}
        to {transform: rotate(360deg);}
    }

    .bar{
        position: absolute;
        top: 0px;
        left: 217px;
        transform-origin: 12px 12px;
        transform:rotateZ(-30deg);
    }

    .topaly{
        animation: 0.5s play linear 1 both;
    }
    .tostop{
        animation: 0.5s stop linear 1 both;
    }
    @keyframes play {
        from{transform:rotateZ(-30deg)} 
        to{transform:rotateZ(0deg)} 
    }
    @keyframes stop {
        from{transform:rotateZ(0deg)} 
        to{transform:rotateZ(-30deg)} 
    }

    .play{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-image: url(../../imgs/timg9.jpg);
        background-repeat: no-repeat;
        background-size: 777px 470px;
        position: relative;
    }
    .playimg>div>img{
        width: 160px;
        height: 160px;
        margin-left: 44px;
        margin-top: 44px;
    }
    .playimg>img{
        position: absolute;
        top:0px;
        left: 0px;
    }
    .name{
        padding-top: 30px;
        font-size: 18px; 
    }
    .playimg{
        width:254px;
        height: 254px;
        position: relative;
    }
</style>