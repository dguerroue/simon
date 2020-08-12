class Simon {
  // buttons: nodes array
  constructor(params) {
    this.buttons = params.buttons
    this.pattern = []
    this.patternTry = []
    this.points = 0
    this.pointsElem = params.pointsElem

    if(typeof(this.buttons) == 'object') {
      this.init()
    } else {
      throw('buttons is undefined or bad format, must be a nodes array')
    }
  }

  init() {

    setTimeout(() => {
      this.addEvents()
      this.pushNewPatternItem()

      this.startPattern()
    }, 1500)

  }

  restartGame() {
    // Reset
    this.pattern = []
    this.patternTry = []
    this.points = 0
    this.pointsElem.innerHtml = this.points


    setTimeout(() => {
      this.pushNewPatternItem()

      this.startPattern()
    }, 1000)
  }

  highlightButton(buttonIndex) {
    let button = this.buttons[buttonIndex]
    button.classList.add('active')

    setTimeout(() => {
      button.classList.remove('active')
    }, 250)
  }

  toggleButtons() {
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].classList.toggle('disabled')
    }
  }

  pushNewPatternItem() {
    const min = 0
    const max = this.buttons.length
    let newPatternItem = Math.floor(Math.random() * (max - min)) + min;
    
    //reset patternTry
    this.patternTry = []

    this.pattern.push(newPatternItem)
    
    return this.pattern
  }

  startPattern() {

    this.toggleButtons()

    for(let i = 0; i < this.pattern.length; i++) {
      let buttonSelected = this.pattern[i];

      // put delay in loop
      setTimeout(() => {

        this.highlightButton(buttonSelected)
        if(i == this.pattern.length - 1) {
          setTimeout(() => {
            this.toggleButtons()
            // console.log('realPattern:', this.pattern)
          }, 250)
        }
      }, 500*i);

    }
  }

  checkTry(tryIndexButton) {
    const elemToCompare = this.pattern[this.patternTry.length - 1]

    // console.log('patternTry', this.patternTry)
    // console.log('compare: ', elemToCompare, tryIndexButton)

    if(tryIndexButton == elemToCompare) {
      return true
    } else {
      return false
    }
  }

  gameover() {
    console.log('GAME OVER !')
    if(confirm('Game over !, recommencer ?')) {
      this.restartGame()
    }
  }

  //events
  addEvents() {
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', (e) => {

        let indexButton = this.buttons.indexOf(e.target)
        this.patternTry.push(indexButton)

        // console.log('pattern', this.pattern)
        // console.log('patternTry', this.patternTry)

        if(!this.checkTry(indexButton)) {
          this.gameover()
        } else {
          // Point up if all pattern is good 
          if(this.patternTry.length == this.pattern.length) {
            this.points++
            this.pointsElem.innerHTML = this.points

            setTimeout(() => {
              this.pushNewPatternItem()
              this.startPattern()
            }, 800);
          }
        }
      })
    }
  }
}
