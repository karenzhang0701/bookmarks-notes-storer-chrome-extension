/* JSON.parse converts to object
JSON.stringify converts to string
local storage = python dictionary
stored with keys and values */

var urlList = []
var saveBtn = document.getElementById("btn1")
var deleteBtn = document.getElementById("btn2")
var inputBtn = document.getElementById("btn3")
var inputBox = document.getElementById("txt1")
var localStorageLinks = JSON.parse(localStorage.getItem("urlList"))
var urlHtml = document.getElementById("saved-urls")

if (localStorageLinks) {  
  urlList=localStorageLinks
  render(urlList)
}

function render(links) {
  let listItems = " "
  for (let i =0; i < links.length; i++) {
    if (links[i].startsWith("https://") || links[i].startsWith("http://") || links[i].startsWith("chrome://")) {
      listItems += `
      <li>
      <a target='_blank' href='${links[i]}'> ${links[i]}</a>
      </li>
      `
    }

    else {
      listItems += links[i]
    }
  }  
  urlHtml.innerHTML = listItems
}

saveBtn.addEventListener("click", function() {
  chrome.tabs.query ({active:true, currentWindow: true}, function (tabs) {
    urlList.push(tabs[0].url) //tab currently on
    localStorage.setItem ("urlList", JSON.stringify(urlList))
    render(urlList)
  })
})

inputBtn.addEventListener("click", function () {
  urlList.push(inputBox.value)
  localStorage.setItem ("urlList", JSON.stringify(urlList))
  render(urlList)
  inputBox.value = " " //clear textbox
})

deleteBtn.addEventListener("click", function() {
  localStorage.clear()
  urlList = []
  render(urlList)
})