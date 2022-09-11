const buttonNext = document.querySelector('.button-next')
const buttonPrev = document.querySelector('.button-prev')

const sliderLine = document.querySelector('.slider__line')
const sliderItems = [...document.querySelectorAll('.slider__object')]
const sliderLength = sliderItems.length
const widthImage = 30 // rem

const dots = document.querySelector('.dots')

// get clones
sliderItems.map(item => {
  let clone = item.cloneNode(true)
  clone.classList.add('clone')
  sliderLine.appendChild(clone)

  dots.appendChild(document.createElement("div"))
})

// dots
const childrenOfDots = [...dots.children]
childrenOfDots.map(item => {
  item.classList.add('dot')
})

childrenOfDots[0].classList.add('active')
let numOfDot = 0

const setActiveDot = (thisSlidePosition, step) => {
  numOfDot = thisSlidePosition / widthImage
  numOfDot %= 7
  childrenOfDots.map((item) => {
    item.classList.remove('active')
  })
  childrenOfDots[numOfDot].classList.add('active')
}

childrenOfDots.map((item, index) => {
  item.addEventListener('click', () => {
    if (index < numOfDot) {
      const slideStep = (numOfDot - index) * widthImage
      slide(false, slideStep)
    }
    if (index > numOfDot) {
      const slideStep = (index - numOfDot) * widthImage
      console.log(slideStep)
      slide(true, slideStep)
    }
  })
})

// buttons
buttonNext.addEventListener('click', () => {
  slide(true)
})
buttonPrev.addEventListener('click', () => {
  slide(false)
})

// sliding
const setSliding = (num) => {
  sliderLine.style.transform = `translateX(${num}rem)`
}

let num = 0
const slide = (next, stepOfNum, time) => {
  time === undefined ? time = 300 : true
  stepOfNum === undefined ? stepOfNum = widthImage : true
  const stepOfTime = 1

  let latestFinishNum = next ? num + stepOfNum : num - stepOfNum

  const animate = () => {
    if (num % widthImage === 0) {
      const interval = setInterval(() => {
        next ? num += stepOfTime : num -= stepOfTime
        if (num === latestFinishNum) {
          clearInterval(interval)
        }
        setSliding(-num)
      }, Math.round(time / (stepOfNum / stepOfTime)))

      setActiveDot(latestFinishNum, stepOfNum)
    }
  }

  if (num === 0 && !next) {
    num = sliderLength * stepOfNum
    latestFinishNum = next ? num + stepOfNum : num - stepOfNum
    setSliding(-sliderLength * stepOfNum)
  }
  if (num === sliderLength * stepOfNum * 2 - stepOfNum && next) {
    num = sliderLength * stepOfNum - stepOfNum
    latestFinishNum = next ? num + stepOfNum : num - stepOfNum
    setSliding(-sliderLength * stepOfNum + stepOfNum)
  }

  animate()
}