<template>
    <div>
        <div class="list">
            <ul>
                <li v-for="d in arr" :key='d.id'>
                    <div class="audio" @click='palymusic(d.id)'>{{d.name}}</div>
                    <div class="video" :style="(d.mvid==0) ? 'display: none':'display: block' "  @click="palyavdio(d.mvid)"></div>
                </li>
            </ul>
        </div>
        <div class="play" is='Play' ></div>
        <div class="comment" is='Comment' ></div>
    </div>   
</template>

<script>
import Play from './Play'
import Comment from './Comment'
export default {
    props:['arr','palymusic'],
    components:{Play,Comment},
    methods:{
        //点击播放视频
        palyavdio(id){
            this.$router.push({path:'/video',query:{id}})
        },

        
    },
}
</script>

<style>

    /* 设置滚动条样式 */
    ::-webkit-scrollbar{
        width: 5px;
        background-color: rgb(136, 168, 168);
    }
    /* 设置滚动槽 */
    ::-webkit-scrollbar-track{
        border-radius: 4px;
    }
    /* 设置滚动条滑块 */
    ::-webkit-scrollbar-thumb{
        border-radius: 4px;
        background-color: rgb(76, 247, 238);
    }
    .audio{
        flex-grow: 1;
        background: url(../../imgs/table.png) no-repeat;
        background-position: -18px -23px;
        padding-left: 25px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .audio:hover{
        color: red;
    }
    .video{
        width: 25px;
        background: url(../../imgs/table.png) no-repeat;
        background-position: 2px -46px;
    }
    .list li:nth-child(odd){
        background-color: rgb(228, 228, 227);
    }
    .list li:nth-child(even){
        background-color:rgb(207, 205, 204)
    }
    .list li{
        padding:5px 10px 5px 10px ;
        display: flex;
    }
    .music{
        display: flex;
    }
    .play{
        flex-grow: 1;
    }
    .list,.play,.comment{
        height: 470px;
    }
    .list{
        width: 220px;
        overflow: auto;
    }
    .comment{
        width: 220px;
        background: rgb(169, 186, 190);
        overflow: auto;
    }
    li{
        list-style: none;
    }
</style>