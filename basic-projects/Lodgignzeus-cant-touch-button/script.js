const button = document.getElementById('btn')

button.addEventListener('click', () =>{
    alert("Alright then")
    window.close()
})

button.addEventListener('mouseenter', (e) => {
    getRandomPosition(e)
})

const getRandomPosition = (e) => {
    const x = document.body.offsetHeight - e.target.clientHeight
    const y = document.body.offsetWidth - e.target.clientWidth
    const randomX = Math.floor(Math.random() * x)
    const randomY = Math.floor(Math.random() * y)
    console.log([randomX, randomY])

    button.style.top = `${randomX}px`
    button.style.left = `${randomY}px`
}