<template>
<div class="container" style="max-width: 400px">
  <div class="row">
    <div id="cards">
    <ul class="list-inline">
      <h4 class="modal-title"> Your Bonuses: </h4>
      <li v-for="(card) in usedBonusCards" style="max-width: 90px; margin-right: 1px; padding-right: 1px">
        <card :cardData="card"></card>
      </li>
    </ul>
  </div>
  </div>
  <div class="row">
    <div id="cards2">
    <ul id="example-1" class="list-inline" style="padding: 10px">
      <h4 class="modal-title"> Your Handicaps: </h4>
      <li v-for="(card) in attackedCards" style="max-width: 90px; margin-right: 1px; padding-right: 2px; margin-bottom: 5px">
        <card :cardData="card"></card>
      </li>
    </ul>
  </div>
  </div>
</div>
</template>

<script>
  import Card from './Card'
  import {mapGetters} from 'vuex'

  /**
   * This component shows any attack cards used against the player, or any safety / overclock cards used.
   * This is used in the player info panel.
   */
  export default {
    data () {
      return {
        player: this.getCurrentPlayer()
      }
    },
    components: {
      'card': Card

    },
    methods: {
      ...mapGetters([
        'getCurrentPlayer'
      ])
    },
    computed: {
      attackedCards () {
        let cards = this.getCurrentPlayer().attackedCards
        if (cards === null) {
          return []
        } else {
          for (let card in cards) {
            cards[card].isUsed = true
          }
          return cards
        }
      },
      usedBonusCards () {
        let cards = this.getCurrentPlayer().usedBonusCards
        if (cards === null) {
          return []
        } else {
          for (let card in cards) {
            cards[card].isUsed = true
          }
          return cards
        }
      }
    }
  }
</script>

<style scoped>
  ul  {
    list-style-type: none;
    display: inline;
    padding: 0;
  }

  .selected {
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
    box-shadow: none;
  }


</style>
