export default {
        todos(state) {
            return state.todos.filter(todo => todo.deleted === false && todo.complete === false)
        },
        completedTodos(state) {
          return state.todos.filter(todo => {
              return todo.complete && !todo.deleted
          })
        },
        deletedTodos(state) {
          return state.todos.filter(todo => {
              return todo.deleted
          })
        },
        getCurrentPlayerHand(state) {
          return Object.assign({}, state.hands.find(hand => hand.playerId === state.activePlayer))
        },
        getCurrentPlayerId(state) {
          return state.activePlayer
        },
        maxplayers(state) {
          return state.players.length
        },
        topCard(state){//added way to draw the top card from the deck -Lance
          if(!state.deck.cards.length()){
            return state.deck.cards.draw();
          }
          else(
            console.log('The deck was empty, that shouldnt have happened...')
          )
        },
        currentPlayerName(state)
        {
          return state.players.find(player => player.id === state.activePlayer).name;
        },
        getCurrentPlayerStacks(state) {
          return state.stacks.filter(st => st.playerId === state.activePlayer)
        },
        getActiveCard(state) {
          return state.activeCard
        },
        getStacks(state) {
          return state.stacks
        },
        getPlayers(state) {
          return state.players
        },
        getDiscard(state) {
          return state.deck.discard_cards
        },
        getHasPlayed(state) {
          return state.activeHasPlayed
        }
}
