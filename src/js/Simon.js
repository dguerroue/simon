class Simon {
  // buttons: nodes array
  constructor(params) {
    this.buttons = params.buttons
    this.pattern = []
    this.patternTry = []
    this.points = 0

    if(typeof(this.buttons) == 'object') {
      this.init()
    } else {
      throw('buttons is undefined or bad format, must be a nodes array')
    }
  }

  init() {
    
    this.addEvents();
    this.startPattern();

  }

  highlightButton(buttonIndex) {
    let button = this.buttons[buttonIndex]
    button.classList.add('active')

    setTimeout(() => {
      button.classList.remove('active')
    }, 250)
  }

  generateNewPattern() {
    const min = 0
    const max = this.buttons.length
    let newPatternItem = Math.floor(Math.random() * (max - min)) + min;
    
    this.pattern.push(newPatternItem)

    console.log('this.pattern', this.pattern)
    
    return this.pattern
  }

  startPattern() {
    const pattern = this.generateNewPattern()

    for(let i = 0; i < pattern.length; i++) {
      let buttonSelected = pattern[i];

      // put delay in loop
      setTimeout(() => {

        this.highlightButton(buttonSelected)

      }, 500*i);
    }
  }

  checkPatternTry() {
    return true
  }

  //events
  addEvents() {
    for(let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].addEventListener('click', (e) => {
        let indexButton = this.buttons.indexOf(e.target)
        
        this.patternTry.push(indexButton)
        this.checkPatternTry()
      })
    }
  }
}
