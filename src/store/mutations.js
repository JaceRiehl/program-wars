const uuidV1 = require('uuid/v1');

import { bus } from '../components/Bus';

import Stack from '../classes/Stack'


export default {
        addPlayer(state, todoString) {
            const date = new Date

            const todo = {
                text: todoString,
                id:   uuidV1(),
                date: date,
                complete: false,
                deleted: false
            }

            state.todos.push(todo)

        },
        setCurrentPlayer(state, playerId) {
          state.activePlayer = playerId

        },
        endTurn(state, maxplayers) {

          console.log(maxplayers)
          state.activePlayer += 1
          state.activePlayer = state.activePlayer % maxplayers
          console.log(state.activePlayer)


        },
        updateCurrentPlayerHand(state, hand) {
          console.log(hand)
          for(let h of state.hands) {
            console.log("HAND: ", h)
            if(h.playerId == hand.playerId) {
              delete state.hands[state.hands.indexOf(h)];
            }
          }
          state.hands.push(hand)
        },
        selectCard(state, c) {
          let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)

          for (var card of playerHand.cards) {

            console.log("card: ", card)

            if (card.id === c.id) {

              card.selected = !card.selected
              if (!card.selected) {
                bus.$emit('cardDeselected')
              } else {
                state.activeCard = c
              }
            } else {
              card.selected = false
            }
          }
        },
        addCardToDeck(state, card){//changed this to have cards
          state.deck.cards.push(card);
        },
        shuffleTheDeck(state) {
          state.deck.shuffle();
          // shuffle the deck
          // for (let i = state.deck.length; i; i--) {
          //   let j = Math.floor(Math.random() * i);
          //   [state.deck[i - 1], state.deck[j]] = [state.deck[j], state.deck[i - 1]];
          // }

        },
        addHandToPlayer(state, playerId) {
          let hand = {
            handId: uuidV1(),
            playerId: playerId,
            cards: []
          };
          let localState = state;
          let cardsTemp = [];
          for(let i = 0; i < 5; i++){//Changed pop() to draw() using function in deck.js -Lance
            cardsTemp.push(localState.deck.draw());
            console.log('deckSize:'+localState.deck.cards.length);
          }
          state = localState;
          hand.cards = cardsTemp;

          state.hands.push(hand);

          state.players.find(player => player.id === playerId).hand = hand.id;

        },
        addCardToHand(state) {

          state.hands.find(hand => hand.playerId === state.activePlayer).cards.push(state.deck.cards.pop())
        },
        initDeck(state){
          state.deck.initDeck();
        },
        addStackToPlayer(state, payload) {
          console.log(' addStackToPlayer mutation called ')

          console.log(payload.playerId)
          console.log("Payload: ", payload)

          //changed this code to use the new stack constructor
          /*
          let stack = {}
          // { stackId:1,
          //   //   playerId:1,t
          //   //   boolSide: true,
          //   //   cards: [
          //   //     new Card(0, 'I')
          //   //   ],
          //   //   score: 0
          //   // }
          stack.stackId = uuidV1();
          stack.playerId = payload.playerId;
          stack.boolSide = payload.boolSide;
          stack.cards = [];
          stack.score = 0;
          */


          // new Stack()

          state.stacks.push(new Stack(payload.playerId, payload.boolSide))
        },
        addCardToStack(state, payload) {
          // this is undefined
          console.log("add card to stack mutation called")
          console.log("payload ", payload)
          let stackToAdd = state.stacks.find(st => st.stackId === payload.stackId)
          console.log("stack to add: ", stackToAdd)
          payload.card.selected = false;

          //changed to use new method defined in Stack.js
          //stackToAdd.cards.push(payload.card)
          stackToAdd.addCardToStack(payload.card);
          console.log("stack to add: ", stackToAdd)
          //calculate the score of the stack once a card is added
          stackToAdd.calculateStackScore();
          //display this for logging purpose
          console.log("score of the stack: ", stackToAdd.score);

          //display the score of the stack calculated


        },
        setActiveCard(state, payload) {
          state.activeCard = payload.cardId;
        },
        setActiveCardUndefined(state) {
          state.activeCard = undefined;
        },
        removeActiveCardFromHand(state) {
          let playerHand = state.hands.find(hand => hand.playerId === state.activePlayer)
          let playerHandUpdated = playerHand.cards.filter(card => card.id !== state.activeCard.id)
          state.hands.find(hand => hand.playerId === state.activePlayer).cards = playerHandUpdated

          // we removed the active card from the active player hand, lets set activeCard state to undefined as well
          state.activeCard = undefined
        },
        stackDiscard(state, payload) {
          let card = state.stacks.find(stack => stack.stackId === payload.stackId).popTopCard()

          state.deck.discard_cards.push(card)
        },
        discardSelectedCard(state) {
          let tempActiveCard = state.activeCard
          state.deck.discard_cards.push(tempActiveCard)
        },
        setHasPlayed(state, payload) {
          state.activeHasPlayed = payload.hasPlayed
        },
        setGameState(state, payload) {
          state.currentGameState = payload.gameState
        }


}
