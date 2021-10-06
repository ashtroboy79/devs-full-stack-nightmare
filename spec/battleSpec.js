describe('Battle', () => {  
  describe("when battle has been called with default values", function() {
    let player1;
    let player2;

    beforeEach(function() {
      battle = new Battle(player1, player2);
    });

    it('inititalizes with player 1', () => {
      expect(battle.player1).toEqual('Captain Planet')
    })

    it('inititalizes with player 2', () => {
      expect(battle.player2).toEqual('Skeletor')
    })
  })
    
  it('inititalizes with player 1 and allows user to input own variable', () => {
    // This also works if you pass the string directly into the constructor
    let player1 = 'Wolverine'
    let player2
    const battle = new Battle(player1, player2);
    expect(battle.player1).toEqual('Wolverine')
  })

  describe("when a user is playing the game", function() {
    let player1;
    let player2;
    
    beforeEach(function() {
      battle = new Battle(player1, player2);
    });
    
    it('lets player 1 win if their roll is higher', () => {
      let player1Roll = 5
      let player2Roll = 2
      expect(battle.winner(player1Roll, player2Roll)).toEqual('Player1 Wins!')
    })

    it('lets player 2 win if they roll higher', () => {
      let player1Roll = 6
      let player2Roll = 7
      expect(battle.winner(player1Roll, player2Roll)).toEqual('Player 2 Wins!')
    })

    it('allows for the characters to draw', () => {
      let player1Roll = 1
      let player2Roll = 1
      expect(battle.winner(player1Roll, player2Roll)).toEqual('Boo!! Draw Try Harder!')
    })
  })
})

