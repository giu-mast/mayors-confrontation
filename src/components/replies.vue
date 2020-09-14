<template>
  <div :class="[remaining === 1 ? 'ended' : remaining < Math.min(15, parseFloat(seconds*0.5)) ? 'ending' : '', 'Replies']">
    <div class="content">
      <div class="mayors">
        <div class="mayor" v-for="m in mayors" :key="m.first_name">
          <div class="img">
            <img :src="imgPath(m.src)" :alt="m.last_name">
          </div>
          <div class="name">
            <small>{{ m.first_name }}</small> <br /> 
            <span>{{ m.last_name }}</span>
          </div>
          <div class="topic" v-html="m.topic || '-'">
          </div>
          <div :class="['replies', { 'ended': m.replies === 0 }]">
            Repliche: {{m.replies}}
          </div>
        </div>
      </div>

      <div class="flex">
        <h2 class="currentTopic">
          <small>Turno:</small> <br />
          <img v-if="currentMayor" :src="imgPath(currentMayor.src)">
          <span v-else>-</span>
        </h2>
        <h2 class="currentTopic">
          <small>Argomento</small>
          <br />
          <span v-if="currentTopic" v-html="currentTopic"></span>
          <span v-else>-</span>
        </h2>
        <div class="timer">
          <countdown 
            ref="countdown" 
            :auto-start="false" 
            :time="remaining * 1000"
            :transform="transform"
            @progress="handleProgress">
            <template slot-scope="props">{{ props.minutes }}:{{ props.seconds }}</template>
          </countdown>
        </div>
      </div>
    </div>
  </div>
</template>

<script>


import CountdownMixins from '../mixins/countdown_mixins';
export default {
  name: 'Replies',
  mixins: [
    CountdownMixins
  ],
  methods: {
    decreaseReply(slug){
      /* 
        Decrementa risposte
        es. cmp.decreaseReply('tommi')
      */
      if(this.mayors.find(a=>a.slug === slug).replies >= 0){
        this.mayors.find(a=>a.slug === slug).replies--
      }
    },

    setCurrentTopic(topic){
      this.currentTopic = topic
    },

    setTopic(slug, topic){
      /* 
        Assegna un tema al candidato sindaco 
        es. cmp.setTopic('tommi', 'Ambiente')
      */
      this.mayors.find(a=>a.slug === slug).topic = topic
    },

    setCurrentMayor(slug){
      this.currentMayor = this.mayors.find(a=>a.slug === slug)
    },

    imgPath(src){
      switch(src){
        case '../assets/amendolara_a.png':
          return require(`../assets/amendolara_a.png`)

        case '../assets/amendolara_t.png':
          return require(`../assets/amendolara_t.png`)

        case '../assets/giammaria.png':
          return require(`../assets/giammaria.png`)

        case '../assets/cutrone.png':
          return require(`../assets/cutrone.png`)

        case '../assets/viola.png':
          return require(`../assets/viola.png`)
      }
    }
  },
  data(){
    return {
      publicPath: process.env.BASE_URL,
      currentTopic: null,
      currentMayor: null,
      mayors: [
        {  
          slug: 'amendolara',
          first_name: 'Antonio',
          last_name: 'Amendolara',
          src: '../assets/amendolara_a.png',
          topic: "",
          replies: 2
        },
        {  
          slug: 'tommi',
          first_name: 'Tommaso',
          last_name: 'Amendolara',
          src: '../assets/amendolara_t.png',
          topic: "",
          replies: 2
        },
        {  
          slug: 'cutrone',
          first_name: 'Anna',
          last_name: 'Cutrone',
          src: '../assets/cutrone.png',
          topic: "",
          replies: 2
        },
        {  
          slug: 'giammaria',
          first_name: 'Alberto',
          last_name: 'Giammaria',
          src: '../assets/giammaria.png',
          topic: "",
          replies: 2
        },
        {  
          slug: 'viola',
          first_name: 'Luigi',
          last_name: 'Viola',
          src: '../assets/viola.png',
          topic: "",
          replies: 2
        },
      ],

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .Replies{
    height: 100vh;
    width: 100vw;
    position: fixed;
    top: 0;
    left: 0;
    background-image: url(../assets/bg.jpeg);
    background-position: center;
    background-repeat: no-repeat;
    background-color: rgb(43,42,136);
    background-size: contain;
    transition: all 0.5s linear;
    display: flex;
    justify-content: center;
    align-items: center;
    &.ending{
      animation: alert 0.5s infinite;
      animation-direction: alternate;
    }

    *{
      font-family: Helvetica-CondensedBlack;
      color: #fff;
    }
    
    &.ended{
      background-color: red;
    }

    &:after{
      content: "";
      background: rgb(2,0,36);
      background: linear-gradient(180deg, rgba(2,0,36,.6) 0%, rgba(0,0,0,.3) 35%, rgba(0,212,255,0) 100%);
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    .content{
      position: relative;
      z-index: 10;
      flex: 1;
    }
  }

  .mayors{
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .mayor{
      flex: 1;
      .topic{
        font-size: 0.8em;
        margin: 0.5em 0;
      }
    }
  }

  .flex{
    display: flex;
    justify-content: center;
    align-items: center;
    *{
      flex: 1
    }
  }

  .startBtn{
    position: absolute;
    right: 20px;
    bottom: 20px;
    z-index: 100;
  }

  .stopBtn{
    position: absolute;
    left: 20px;
    bottom: 20px;
    z-index: 100;
  }

  h1{
    font-family: Helvetica-CondensedBlack;
    color: #fff;
    font-size: 5em;
    margin: 0;
  }

  .mayor{
    font-size: 2rem;
  }

  .currentTopic{
    margin-top: 20px;
    font-size: 4rem;
    small{
      font-size: 0.5em;
    }
  }

  .ended{
    color: #ff0000
  }

  .flex{
    margin-top: 2.5em;
  }

  .timer{
    font-size: 30px;
    span{
      display: block;
      font-size: 5em;
      font-style: italic;
      font-weight: bold;
      color: #fff;
      font-family: Helvetica-CondensedBlack;
    }
  }

  @keyframes alert {
    from {background-color: rgb(43,42,136);}
    to {background-color: red;}
  }
</style>
