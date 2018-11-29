// ***FORM***
const newQuoteForm = document.querySelector('#new-quote-form')
const newQuoteInput = newQuoteForm.querySelector('#new-quote')
const quoteAuthorInput = newQuoteForm.querySelector('#author')
// ***RENDER***
const quoteList = document.querySelector('#quote-list')

const renderQuotes = quotes => {
  quotes.forEach(renderQuote)
}

const renderQuote = quote => {
  const quoteListEl = document.createElement('li')
  quoteListEl.className = 'quote-card'
  quoteListEl.innerHTML = `
    <blockquote class="blockquote">
      <p class="mb-0">${quote.quote}</p>
      <footer class="blockquote-footer">${quote.author}</footer>
      <br>
    </blockquote>
  `
  quoteList.appendChild(quoteListEl)

  const blockquoteEl = quoteListEl.querySelector('blockquote')

  const likeBtn = document.createElement('button')
  likeBtn.className = 'btn-success'
  likeBtn.innerHTML = `Likes: <span>${quote.likes}</span>`
  blockquoteEl.appendChild(likeBtn)


  const editBtn = document.createElement('button')
  editBtn.className = 'btn-success'
  editBtn.innerText = 'Edit'
  blockquoteEl.appendChild(editBtn)


  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn-danger'
  deleteBtn.innerText = 'Delete'
  blockquoteEl.appendChild(deleteBtn)
}

getQuotes()
  .then(renderQuotes)