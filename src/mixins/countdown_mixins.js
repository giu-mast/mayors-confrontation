import VueCountdown from '@chenfengyuan/vue-countdown';


const CountdownMixin = {
  components: {
    'countdown': VueCountdown
  },

  props: {
    seconds: String
  },
  
  data(){
    return {
      remaining: 0
    }
  },
  methods: {
    transform(props) {
      Object.entries(props).forEach(([key, value]) => {
        // Adds leading zero
        const digits = value < 10 ? `0${value}` : value;

        props[key] = `${digits}`;
      });

      return props;
    },
    handleProgress(data){
      this.remaining = data.totalSeconds
    },
    startTimer(){
      this.$refs.countdown.start();
    },
    stopTimer(){
      this.$refs.countdown.abort();
    },
    restartTimer(){
      this.stopTimer()
      this.startTimer()
    }
  },
  mounted(){
    this.remaining = parseInt(this.seconds)
  }
}

export default CountdownMixin