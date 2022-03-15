<template>
  <div class="game">
    <h1>Rock Paper Scissors</h1>
    <div>
      <button v-for="item in itemList" :key="item" @click="select(item)">
        {{ item }}
      </button>
    </div>
    <table id="result-table">
      <colgroup>
        <col width="50%" />
        <col width="50%" />
      </colgroup>
      <tr>
        <th>Player</th>
        <th>PC</th>
      </tr>
      <tr>
        <td>
          <p>{{ playerSelect }}</p>
        </td>
        <td>
          <p>{{ pcSelect }}</p>
        </td>
      </tr>
      <tr>
        <td colspan="2">
          <h2>{{ result }}</h2>
          <!-- 연승 중일 때 표시 -->
          <p v-if="successive > 1">Successive : {{ successive }}</p>
        </td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "GameView",
  data() {
    return {
      successive: 0, // 연승
      playerSelect: undefined,
      pcSelect: undefined,
      itemList: ["rock", "paper", "scissors"],
      result: undefined,
    };
  },
  computed: {
    userId() {
      return window.sessionStorage.getItem("user_id");
    },
  },
  methods: {
    select(v) {
      this.playerSelect = v;
      this.pcSelect =
        this.itemList[Math.floor(Math.random() * this.itemList.length)];

      if (this.playerSelect == this.pcSelect) {
        this.result = "draw";
        this.successive = 0;
      } else if (
        (this.playerSelect == "rock" && this.pcSelect == "paper") ||
        (this.playerSelect == "paper" && this.pcSelect == "scissors") ||
        (this.playerSelect == "scissors" && this.pcSelect == "rock")
      ) {
        this.result = "lose";
        this.successive = 0;
      } else {
        this.result = "win";
        this.successive++;
      }

      this.saveEvent();
    },
    saveEvent() {
      this.$axios.post("collect", {
        user_id: this.userId,
        event_id: window.guid(),
        event: "game_played",
        parameters: JSON.stringify({
          player: this.playerSelect,
          pc: this.pcSelect,
          result: this.result,
          successive: this.successive,
        }),
      });
    },
  },
};
</script>

<style scoped>
#result-table {
  margin: auto;
  width: 100%;
  margin-top: 50px;
}

#result-table p {
  font-size: 30px;
  margin: 0;
}
</style>