import './style.scss'
import imgData from './data.csv'

// FOR TESTING: copy imgData multiple times to populate matrix
let testImgData = imgData
for (let i = 0; i < 9; i++) {
  testImgData = testImgData.concat(...imgData)
}
testImgData.push(imgData[0])
// Name of the folder containing the image assets, must be located in 'src' folder
const imgFolder = `test-img`

const matrix = document.querySelector('.matrix')

// This function takes in an image source path and a title to create an img element with alt-text. It returns the created img element.
const createImgElements = function (imgSrc, title) {
  const img = document.createElement('img')
  img.src = require(`./${imgFolder}/${imgSrc}`)
  img.alt = title
  img.className = 'matrix-item'
  img.dataset.title = title
  return img
}

// An array containing the image elements of the matrix
const matrixImgs = testImgData.map(d => createImgElements(d.imgName, d.title))

// Append matrix images to the matrix container
matrixImgs.forEach(function (img) {
  matrix.appendChild(img)
})

// This function takes in an array of objects with key values specified in 'data.csv' and returns an object with keys of 'title' and values of relative popup assets
const preparePopupAssets = function (assetsObject, value) {
  assetsObject[value.title] = {
    title: value.title,
    text: value.storyText,
    storyMedia: [
      value.storyMedia1,
      value.storyMedia2,
      value.storyMedia3,
      value.storyMedia4
    ]
  }

  return assetsObject
}

const popupAssets = testImgData.reduce(preparePopupAssets, {})
console.log(popupAssets)

const showPopup = function (e) {
  e.stopPropagation()
  console.log('popup!')
  const storyPopup = document.querySelector('.matrix-popup')
  storyPopup.classList.add('visible')

  const removePopup = function () {
    console.log('popup!')
    storyPopup.classList.remove('visible')
    document.querySelector('body').removeEventListener('click', removePopup)
  }
  document.querySelector('body').addEventListener('click', removePopup)
}

matrixImgs.forEach(d =>
  d.addEventListener('click', showPopup)
)
