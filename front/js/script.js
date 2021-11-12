var socket = io("http://localhost:8000")
const buttons = document.getElementsByClassName('add')

for(let i = 0; i<buttons.length; i++) {
  const button = buttons[i]
  const value = button.innerHTML
  button.addEventListener('click', () => {
    socket.emit('addVote', value)
  })
}

socket.on('fileChange', (file) => {
  const parent = document.getElementById('results')
  parent.innerHTML = ""
  Object.keys(file).forEach(function(key) {
    const value = file[key];
    const name = key;
    const element = document.createElement('p');
    var result = document.createTextNode(name + " : " + value);
    element.appendChild(result);
    parent.appendChild(element)
  });
})