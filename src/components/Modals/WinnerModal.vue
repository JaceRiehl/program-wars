<template>
  <div>
    <div class="modal-dialog" role="document">
      <div class="modal-content" style="border-radius: 30px">
        <div class="modal-header" style="padding-bottom: 0;"> <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="newGame">
          <span aria-hidden="true">&times;</span></button>
        </div>
        <div class="modal-body" style="padding-top: 0;" v-if="oneWinner">
          <h3 class="modal-title"><b>Congratulations {{ winner }}!!</b></h3>
          <div style="border: 4px ridge darkblue; padding: 5px; border-radius: 5px; background-color: royalblue;">
            <h5 style="color: white">{{ winner }} is the winner with a score of {{ winnerScore }}</h5>
          </div>
          </div>
            <div class="modal-body" style="padding-top: 0;" v-else>
              <h4><b>Congratulations: </b></h4>
              <ul style="list-style-type: none; text-align: center; margin-right: 40px; margin-top: 10px;">
                <li v-for="(win, index) in winnerList"><h4 v-if="!(index === winnerList.length - 1)">{{ win }},</h4>
                <h4 v-else> and {{ win }}</h4></li>
              </ul>
              <h4 v-if="winnerList.length === 2">You both reached the winning score!</h4>
              <h4 v-if="winnerList.length > 2">You all reached the winning score!</h4>

            </div>
          <div>
            <h5><b>Scores</b></h5>
            <table class="table table-condensed" style="width: 60%; margin: auto">
              <thead>

              <tr>
                <th>Player Name:</th>
                <th v-for="player in playerList" >{{ player.name }}</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <th>True Score:</th>
                <td v-for="player in playerList">{{ Math.ceil(getScore(player.id).trueScore) }}</td>
              </tr>
              <tr>
                <th>False Score:</th>
                <td v-for="player in playerList">{{ Math.ceil(getScore(player.id).falseScore) }}</td>
              </tr>
              <tr>
                <th>Completion Bonus:</th>
                <td v-for="player in playerList">{{player.completionBonus}}</td>
              </tr>
              <tr>
                <th>Defensive Bonus:</th>
                <td v-for="player in playerList">{{player.defensiveBonus}}</td>
              </tr>
              <tr>
                <th>No Viruses Bonus:</th>
                <td v-for="player in playerList">{{player.virusBonus}}</td>
              </tr>
              <tr>
                <th>No Overclocking Bonus:</th>
                <td v-for="player in playerList">{{Math.ceil(player.overClockBonus)}}</td>
              </tr>
              <tr>
                <th>Master Coder Bonus:</th>
                <td v-for="player in playerList">{{player.instructionBonus}}</td>
              </tr>
              <tr>
                <th>Protection Cards Bonus:</th>
                <td v-for="player in playerList">{{player.protectionCardsBonus}}</td>
              </tr>
              <tr>
                <th>Overclock Card Bonus:</th>
                <td v-for="player in playerList">{{ Math.ceil(player.overclockIncrease) }}</td>
              </tr>
              <tr>
                <th>Grouping Cards Bonus:</th>
                <td v-for="player in playerList">{{player.groupingBonus}}</td>
              </tr>
              <tr>
                <th>Repetition Cards Bonus:</th>
                <td v-for="player in playerList">{{player.repetitionBonus}}</td>
              </tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" style="float: right" data-dismiss="modal" @click="newGame">Close</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

import {mapGetters, mapMutations} from 'vuex'
export default {
  props: ['playerList'],
  methods: {
    ...mapGetters([
      'getPlayers',
      'getCurrentPlayer',
      'getScoreLimit',
      'getWinnerName',
      'getWinnerScore',
      'getActiveSide'
    ]),
    ...mapMutations([
      'setPlayfieldColour'
    ]),
    newGame () {
      this.setPlayfieldColour(false)
      this.$router.push('/')
    },
    getScore (player) {
      let trueSide = 0
      let falseSide = 0
      trueSide = this.getPlayers()[player].trueScore
      falseSide = this.getPlayers()[player].falseScore
      if (this.getPlayers()[player].hasVirus) {
        trueSide = trueSide * 0.75
        falseSide = falseSide * 0.75
      } else if (this.getPlayers()[player].hasOverclock) {
        trueSide = trueSide * 1.25
        falseSide = falseSide * 1.25
      }
      return {trueScore: trueSide, falseScore: falseSide}
    }
  },
  computed: {
    winner () {
      return this.getWinnerName()
    },
    winnerScore () {
      return this.getWinnerScore()
    },
    oneWinner () {
      return (this.winnerList.length < 2)
    },
    winnerList () {
      let winList = []
      for (let player of this.playerList) {
        if (this.getActiveSide()) {
          if (this.getScore(this.getCurrentPlayer().id).trueScore >= this.getScoreLimit()) {
            winList.push(player.name)
          }
        } else {
          if (this.getScore(this.getCurrentPlayer().id).falseScore >= this.getScoreLimit()) {
            winList.push(player.name)
          }
        }
      }
      return winList
    }
  }
}

</script>

<style scoped>
th {
  text-align: center;
}
  h4 {
    padding:0;
    margin: 0;
  }
</style>
