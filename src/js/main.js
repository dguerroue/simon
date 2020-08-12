document.addEventListener('DOMContentLoaded', () => {

  const simon = new Simon({
    buttons: [
      document.querySelector('.simon-block--green'),
      document.querySelector('.simon-block--red'),
      document.querySelector('.simon-block--yellow'),
      document.querySelector('.simon-block--blue')
    ],
    pointsElem: document.querySelector('.simon-points--value')
  })

  window.simon = simon

})