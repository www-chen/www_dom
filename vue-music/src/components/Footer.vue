<template>
    <div>
        <audio :src="url" controls autoplay ref="mp3"></audio>
    </div>
</template>

<script>


export default {
    props:['playnext'],
    data(){
        return {
            url:''
        }
    },
    created(){
        this.$bus.$on('Url',(val)=>{this.url=val})
    },
    mounted(){
        this.$refs.mp3.addEventListener('play',()=>{
            this.$bus.$emit('flag',true)
        }),
        this.$refs.mp3.addEventListener('pause',()=>{
            this.$bus.$emit('flag',false)
        })

        let timer=setInterval(()=>{
            if (this.$refs.mp3.ended) {
                this.playnext()
            }
        },500)
    }
}
</script>

<style>

.footer>audio{
    width:100%;
    height: 100%;
}

</style>