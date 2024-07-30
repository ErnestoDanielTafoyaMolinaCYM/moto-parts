document.addEventListener('DOMContentLoaded', function () {
    loadParts();

    const createForm = document.getElementById('createPartForm');
    if (createForm) {
        createForm.addEventListener('submit', function (event) {
            event.preventDefault();
            createPart();
        });
    }

    const editForm = document.getElementById('editPartForm');
    if (editForm) {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        loadPart(id);

        editForm.addEventListener('submit', function (event) {
            event.preventDefault();
            updatePart();
        });
    }
});

function loadParts() {
    fetch('/api/parts')
        .then(response => response.json())
        .then(parts => {
            const tableBody = document.querySelector('#partsTable tbody');
            tableBody.innerHTML = '';
            parts.forEach(part => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${part.id}</td>
                    <td>${part.name}</td>
                    <td>${part.description}</td>
                    <td>${part.price}</td>
                    <td>${part.quantity}</td>
                    <td>
                        <button onclick="window.location.href='edit.html?id=${part.id}'">Editar</button>
                        <button onclick="deletePart(${part.id})">Eliminar</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        });
}

function loadPart(id) {
    fetch(`/api/parts/${id}`)
        .then(response => response.json())
        .then(part => {
            document.getElementById('id').value = part.id;
            document.getElementById('name').value = part.name;
            document.getElementById('description').value = part.description;
            document.getElementById('price').value = part.price;
            document.getElementById('quantity').value = part.quantity;
        });
}

function createPart() {
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    fetch('/api/parts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, description, price, quantity })
    }).then(response => {
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Error al crear la parte');
        }
    });
}

function updatePart() {
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const quantity = document.getElementById('quantity').value;

    fetch(`/api/parts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id, name, description, price, quantity })
    }).then(response => {
        if (response.ok) {
            window.location.href = 'index.html';
        } else {
            alert('Error al actualizar la parte');
        }
    });
}

function deletePart(id) {
    fetch(`/api/parts/${id}`, {
        method: 'DELETE'
    }).then(response => {
        if (response.ok) {
            loadParts();
        } else {
            alert('Error al eliminar la parte');
        }
    });
}
