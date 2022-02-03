const task = document.getElementById('task')

const submit = document.getElementById('submit')

const form = document.querySelector('form')



submit.addEventListener('click', function (e) {
  e.preventDefault() //default work refreshes web , to prevent default

  addTask(task)
})

function addTask(task) {
  if (task.value.length == 0) {
    alert('Please enter a valid task')
  } else {
    // creating elements dynamically
    const ulist = document.createElement('ul')
    const list = document.createElement('li')
    const text = document.createTextNode(task.value) //taking sting values of task inpout element and assigning to text.
    const deletebtn = document.createElement('button')

    // setting up delete button
    deletebtn.textContent = 'Delete'
    deletebtn.addEventListener('click', function (e) {
      e.preventDefault()
      ulist.remove(list)
    })

    //assigning classes dynamically
    list.classList.add('list')
    ulist.classList.add('ul')
    deletebtn.classList.add('delete')

    list.append(text)
    list.appendChild(deletebtn)
    ulist.append(list)
    // ulist.appendChild(deletebtn)
    form.append(ulist)

    // clearing input field
    task.value = ''

    // changging the color of taks when on mouse hover
    list.addEventListener('mouseover', function (e) {
      e.preventDefault()
      list.classList.add('colorchange')
    })
    list.addEventListener('mouseout', function (e) {
      e.preventDefault()
      list.classList.remove('colorchange')
    })

    // Tasks event listeners
    list.addEventListener('click', function (e) {
      e.preventDefault()
      list.classList.remove('list')
      list.classList.add('marker')
    })
  }
}

