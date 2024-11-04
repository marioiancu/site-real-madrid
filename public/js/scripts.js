
document.getElementById('changeStyleBtn').addEventListener('click', function() {
    document.getElementById('element').style.backgroundColor = 'blue';
});


document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseover', event => {
        event.target.style.color = 'red';
    });
});

const newElement = document.createElement('div');
newElement.innerText = 'New Element';
document.body.appendChild(newElement);

setTimeout(() => {
    document.body.removeChild(newElement);
}, 3000);


localStorage.setItem('username', 'JohnDoe');

document.getElementById('form').addEventListener('submit', function(event) {
    const input = document.getElementById('inputField').value;
    if (!/^[a-zA-Z]+$/.test(input)) {
        event.preventDefault();
        alert('Please enter only letters.');
    }
});

