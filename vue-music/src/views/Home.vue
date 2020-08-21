<template>
    <div id="home">
        <div>
            <div class="title">
                <h3>我的音乐盒</h3>
                <div><input type="text" placeholder="热门" v-model="keywords" @keydown="search($event)" ></div>
            </div>
            <div is='Music' class="music" :arr='arr' :palymusic='palymusic'> </div>
            <div class="footer" is='Footer' :playnext='playnext '></div>
        </div>
    </div>
</template>

<script>
import Music from '../components/Music'
import Footer from '../components/Footer'
export default {
    components:{Music,Footer},
    methods:{
        //搜索关键字获取数据
        getdata(){
            let {keywords}=this;
            this.$axios.get('/search',{params:{keywords}}).then(res=>{
                // console.log('搜索',res.data)
                if(res.data.code==200){
                    this.arr=res.data.result.songs
                    //默认获取第一首歌曲
                    this.palymusic(res.data.result.songs[0].id)
                }else{
                    alert('搜索失败')
                }
            })
        },
        
        //点击播放音乐获取数据
        async palymusic(id){
            
            this.$axios.get('/song/url',{params:{id}}).then(res=>{
                // console.log('播放',res.data)
                if(res.data.code==200){
                    //获取歌曲url
                    this.$bus.$emit('Url',res.data.data[0].url)
                    //获取歌曲id
                    this.$bus.$emit('Id',res.data.data[0].id)
                }
            }).catch(err=>{
                console.log('播放失败',err)
            })
        },

        //播放下一首
        playnext(){
            this.arr.forEach((item,i)=>{
                if (item.id==this.id) {
                    if(i < this.arr.length){
                        this.palymusic(this.arr[i+1].id);
                    }
                }
            })
        },
        //搜索事件
        search(ev){
            if(ev.keyCode==13){
                this.getdata()
            }
        }
    },
    created(){
        this.getdata();
    },
    mounted(){
        this.$bus.$on('Id',(val)=>{this.id=val});
    },
    data(){
        return {
            keywords:'热门',
            arr:[],
            id:0
        }
    }
}
</script>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    #home>div{
        width:900px;
        height: 600px;
        border: 1px solid black;
        display: flex;
        flex-direction: column;
    }
    #home{
        width:100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .footer{
        height: 60px;
        background-color: #f1f3f4;
    }
    .music{
        flex-grow: 1;
    }

    .title{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        height: 50px;
        background: rgb(15, 109, 250);
    }
    .title>h3{
        color: white;
        margin-left: 10px;
    }
    .title input{
        width: 250px;
        height:12px;
        padding: 10px;
        outline-style: none;
        border: none;
        background-image: url(../../imgs/zoom.png);
        background-repeat: no-repeat;
        background-size: 20px 20px;
        background-position: 240px 7px;
        font-size: 15px;
    }
    .title>div{
        border-radius: 25px;
        overflow: hidden;
    }
</style>