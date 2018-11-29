// ***FORM***
const newQuoteForm = document.querySelector('#new-quote-form')
const newQuoteInput = newQuoteForm.querySelector('#new-quote')
const quoteAuthorInput = newQuoteForm.querySelector('#author')
// ***RENDER***
const quoteList = document.querySelector('#quote-list')


newQuoteForm.addEventListener('submit', event => createQuoteAndRender(event))

const createQuoteAndRender = event => {
  event.preventDefault()

  const quoteToCreate = {
    quote: newQuoteInput.value,
    author: quoteAuthorInput.value,
    likes: 0
  }

  createQuote(quoteToCreate)
    .then(renderQuote)
}

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

  createEditQuoteForm(quoteListEl, quote)

  const blockquoteEl = quoteListEl.querySelector('blockquote')

  const likeBtn = document.createElement('button')
  likeBtn.className = 'btn-success'
  likeBtn.innerHTML = `Likes: <span>${quote.likes}</span>`
  blockquoteEl.appendChild(likeBtn)
  likeBtn.addEventListener('click', () => updateLikesAndRender(likeBtn, quote))

  const editBtn = document.createElement('button')
  editBtn.className = 'btn-primary'
  editBtn.innerText = 'Edit'
  blockquoteEl.appendChild(editBtn)
  editBtn.addEventListener('click', () => toggleEditForm(quoteListEl))

  const deleteBtn = document.createElement('button')
  deleteBtn.className = 'btn-danger'
  deleteBtn.innerText = 'Delete'
  blockquoteEl.appendChild(deleteBtn)
}

const createEditQuoteForm = (quoteListEl, quote) => {
  const editQuoteForm = document.createElement('form')
  editQuoteForm.id = "edit-quote-form"
  editQuoteForm.style.display = 'none'
  editQuoteForm.innerHTML = `
  <div class="form-group">
    <label for="edit-quote">Edit Quote</label>
    <input type="text" class="form-control" id="edit-quote" value="${quote.quote}">
  </div>
  <div class="form-group">
    <label for="edit-author">Edit Author</label>
    <input type="text" class="form-control" id="edit-author" value="${quote.author}">
  </div>
  <button type="submit" class="btn btn-primary">Edit</button>
  `
  quoteListEl.appendChild(editQuoteForm)

  editQuoteForm.addEventListener('submit', event => editQuoteAndRender(event, quoteListEl, editQuoteForm, quote))
}

const toggleEditForm = parentEl => {
  const editForm = parentEl.querySelector('#edit-quote-form')
  if(editForm.style.display === "none") {
    editForm.style.display = "block"
  } else {
    editForm.style.display = "none"
  }
}

const updateLikesAndRender = (elToUpdate, quoteToUpdate) => {
  updateLikes = {
    likes: ++quoteToUpdate.likes
  }
  
  updateQuote(quoteToUpdate, updateLikes)
    .then(updatedQuote => {
      elToUpdate.innerHTML = `Likes: <span>${updatedQuote.likes}</span>`
    })
}

const editQuoteAndRender = (event, parentEl, editForm, quoteToUpdate) => {
  event.preventDefault()
  
  const quoteInput = editForm.querySelector('#edit-quote')
  const authorInput = editForm.querySelector('#edit-author')

  const updateContent = {
    quote: quoteInput.value,
    author: authorInput.value
  }

  updateQuote(quoteToUpdate, updateContent)
    .then(updatedQuote => {
      const paragraphEl = parentEl.querySelector('p')
      const footerEl = parentEl.querySelector('footer')

      paragraphEl.innerText = updatedQuote.quote
      footerEl.innerText = updatedQuote.author

      toggleEditForm(parentEl)
    })
}

getQuotes()
  .then(renderQuotes)