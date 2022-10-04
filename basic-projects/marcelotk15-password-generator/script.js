const App = {
  password: '',
  charsLength: 12,
  chars: {
    lower: 'abcdefghijklmnopqrstuvwxyz',
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numeric: '0123456789',
    symbols: '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~'
  },

  shuffleArray(string) {
    const strArray = string.split('')

    for (let i = strArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      const temp = strArray[i]

      strArray[i] = strArray[j]
      strArray[j] = temp
    }

    return strArray.join('')
  },

  generatePassword: () => {
    const passwordShuffled = App.shuffleArray(
      (document.getElementById('charsLower').checked ? App.chars.lower : '') +
      (document.getElementById('charsUpper').checked ? App.chars.upper : '') +
      (document.getElementById('charsNumeric').checked ? App.chars.numeric : '') +
      (document.getElementById('charsSymbols').checked ? App.chars.symbols : '')
    )

    App.password = passwordShuffled.substring(0, App.charsLength)

    document.getElementById('password').value = App.password
  },

  setInputCharsLengthValue: (initEvent = false) => {
    const inputs = document.querySelectorAll('input[type="number"], input[type="range"]')
      
    inputs.forEach(input => {        
      input.value = App.charsLength

      if (initEvent)
        input.addEventListener('change', App.handleCharsLengthChange)

      App.generatePassword()
    })
  },

  handleCharsLengthChange: (event) => {
    App.charsLength = event.target.value

    App.setInputCharsLengthValue()
  },

  handleCopyPassword: () => {
    navigator.clipboard.writeText(App.password)

    const passwordInput = document.getElementById('password')

    passwordInput.value = "Copied to Clipboard"

    setTimeout(() => {
      passwordInput.value = App.password
    }, 1000)
  },

  init: () => {
    App.setInputCharsLengthValue(true)
  },
}

document.addEventListener('DOMContentLoaded', () => {
  App.init()
})
