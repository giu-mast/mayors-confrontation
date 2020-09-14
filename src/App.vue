<template>
  <div id="app">
    <Replies
      ref="cmp" 
      seconds=15
    />

    <!-- 
      REPLIES DOCS 
      ogni volta che un candidato sindaco estrae un argomento:

      var topic = "Campo sportivo";
      var mayor = "tommi";
      cmp.remaining = 120;
      cmp.setTopic(mayor, topic);
      cmp.setCurrentMayor(mayor);
      cmp.setCurrentTopic(topic);
      
      a parte:
      cmp.startTimer()

      ogni volta che un candidato replica:
      cmp.remaining = 60;
      cmp.decreaseReply('viola')
      a parte:
      cmp.startTimer()
    -->

    <!--
    <TimerQuestion 
      ref="cmp"
      question="Qual è la vostra visione su periferie e frazioni e attraverso quali aspetti passa secondo voi l'attività amministrativa di queste aree della città?"
      seconds=100
    />
    -->

  </div>
</template>

<script>
// import TimerQuestion from './components/TimerQuestion.vue'
import Replies from './components/replies.vue'

export default {
  name: 'App',
  components: {
    Replies,
  },
  mounted(){
    window.cmp = this.$refs.cmp
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
