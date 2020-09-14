<template>
  <div :class="[remaining === 1 ? 'ended' : remaining < Math.min(15, parseFloat(seconds*0.5)) ? 'ending' : '', 'TimerQuestion']">
    <div class="content">
      <h1 v-html="question"></h1>
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
    <a class="startBtn" href="#" @click.prevent="startTimer()">
      start
    </a>
    <a class="stopBtn" href="#" @click.prevent="stopTimer()">
      stop
    </a>
  </div>
</template>

<script>
import CountdownMixin from '../mixins/countdown_mixins'


export default {
  name: 'TimerQuestion',
  mixins: [
    CountdownMixin
  ],
  props: {
    question: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .TimerQuestion{
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


  .timer{
    margin-top: 2em;
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
