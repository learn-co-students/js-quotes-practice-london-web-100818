// It might be a good idea to add event listener to make sure this file
// only runs after the DOM has finshed loading.

let listEl = document.getElementById("quote-list")
let formEl = document.getElementById("new-quote-form")
let quoteEl = document.getElementById("new-quote")
let authorEl = document.getElementById("author")
let sortEl = document.getElementById("sort")

let allQuotes = []

//Get quotes from server
const getQuotesFromServer = () =>
  fetch("http://localhost:3000/quotes")
    .then(response => response.json())
    .then((quotes) => {
      allQuotes = quotes
      addAllQuotesOntoPage(quotes)
    })

//Sorting
function compareAuthor(a, b) {
  return a.author.localeCompare(b.author)
}

function compareQuote(a, b) {
  return a.quote.localeCompare(b.quote)
}

sortEl.addEventListener("change", event => {
  console.log(event)
  event.preventDefault()
  let sortedQuotes = [...allQuotes]
  if (sortEl.value === "author") {
    sortedQuotes.sort(compareAuthor)
  }
  if (sortEl.value === "quotes") {
    sortedQuotes.sort(compareQuote)
  }
  addAllQuotesOntoPage(sortedQuotes)
})

//Add all quotes from server onto page using add quote function
const addAllQuotesOntoPage = (quotes) => {
  listEl.innerHTML = ""
  quotes.forEach(quote => addQuoteOntoPage(quote))
}

//Display quote on page and add event listeners for changes
const addQuoteOntoPage = quote => {
  const newQuote = document.createElement("li")
  newQuote.className = "quote-card"
  newQuote.id = quote.id
  newQuote.innerHTML = `
  <blockquote class="blockquote">
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success'>Likes: <span>${quote.likes}</span></button>
    <button class='btn-danger'>Delete</button>
    <button class='btn-edit'>Edit quote</button>
  </blockquote>
  <div class="edit-form" style="">
    <form>
      <input type="text" class="edit-quote" value="${quote.quote}"><br>
      <input type="text" class="edit-author" value="${quote.author}">
      <button class='btn-save'>Save changes</button>
    </form>
  </div>
  `
  listEl.appendChild(newQuote)
  const editFormEl = newQuote.querySelector(".edit-form")
  editFormEl.style.display = "none"
  const editButtonEl = newQuote.querySelector(".btn-edit")
  editButtonEl.addEventListener("click", event => {
    editFormEl.style.display = "block"
  })
  const editedQuoteEl = newQuote.querySelector(".edit-quote")
  const editedAuthorEl = newQuote.querySelector(".edit-author")
  const saveButtonEl = newQuote.querySelector(".btn-save")
  saveButtonEl.addEventListener("click", event => {
    event.preventDefault()
    updateQuoteOnServer(quote.id, editedQuoteEl.value, editedAuthorEl.value, quote.likes)
    editFormEl.style.display = "none"
    const quoteDisplayed = newQuote.querySelector(".mb-0")
    const authorDisplayed = newQuote.querySelector(".blockquote-footer")
    quoteDisplayed.innerText = editedQuoteEl.value
    authorDisplayed.innerText = editedAuthorEl.value
  })
  const likeButtonEl = newQuote.querySelector(".btn-success")
  likeButtonEl.addEventListener("click", event => {
    quote.likes += 1
    updateQuoteOnServer(quote.id, quote.quote, quote.author, quote.likes)
    const likesDisplayed = newQuote.querySelector(".btn-success")
    likesDisplayed.innerText = `Likes: ${quote.likes}`
  })
  const deleteButtonEl = newQuote.querySelector(".btn-danger")
  deleteButtonEl.addEventListener("click", event => {
    deleteQuoteFromServer(quote.id)
    newQuote.remove()
  })
  }

//Event listener for new quote submission
formEl.addEventListener("submit", event => {
  event.preventDefault()
  const quote = {
    quote: quoteEl.value,
    author: authorEl.value,
    likes: 0
  }
  addNewQuoteOntoServer(quote)
    .then(quote => {
      allQuotes.push(quote)
      addQuoteOntoPage(quote)
    })
    .catch(err => alert(err))
  formEl.reset()
})

//Add new quote onto server
const addNewQuoteOntoServer = (quote) =>
  fetch("http://localhost:3000/quotes", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(quote)
  })
  .then(response => response.json())
  .catch(err => alert(err))

//Delete quote from server
const deleteQuoteFromServer = (id) =>
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "DELETE",
  })
  .then(response => response.json())
  .catch(err => alert(err))

//Update quote on servers with new likes
const updateQuoteOnServer = (id, quote, author, likes) =>
  fetch(`http://localhost:3000/quotes/${id}`, {
    method: "PATCH",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({quote: quote, author: author, likes: likes})
  })
  .then(response => response.json())
  .catch(err => alert(err))

getQuotesFromServer()
