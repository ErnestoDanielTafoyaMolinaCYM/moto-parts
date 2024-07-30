document.addEventListener('DOMContentLoaded', function () {
    const createBtn = document.getElementById('createBtn');
    const formModal = document.getElementById('formModal');
    const closeModal = document.getElementsByClassName('close')[0];
    const partForm = document.getElementById('partForm');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    let parts = JSON.parse(localStorage.getItem('parts')) || [];
    let isEditing = false;
    let editIndex = null;

    createBtn.onclick = function () {
        formTitle.textContent = 'Crear Parte';
        submitBtn.textContent = 'Crear';
        partForm.reset();
        isEditing = false;
        formModal.style.display = 'block';
    }

    closeModal.onclick = function () {
        formModal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == formModal) {
            formModal.style.display = 'none';
        }
    }

    partForm.onsubmit = function (event) {
        event.preventDefault();
        const id = document.getElementById('id').value;
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const price = document.getElementById('price').value;
        const quantity = document.getElementById('quantity').value;

        if (isEditing) {
            parts[editIndex] = { id, name, description, price, quantity };
        } else {
            parts.push({ id: parts.length + 1, name, description, price, quantity });
        }

        localStorage.setItem('parts', JSON.stringify(parts));
        formModal.style.display = 'none';
        loadParts();
    }

    function loadParts() {
        const tableBody = document.querySelector('#partsTable tbody');
        tableBody.innerHTML = '';
        parts.forEach((part, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${part.id}</td>
                <td>${part.name}</td>
                <td>${part.description}</td>
                <td>${part.price}</td>
                <td>${part.quantity}</td>
                <td>
                    <button onclick="editPart(${index})">Editar</button>
                    <button onclick="deletePart(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editPart = function (index) {
        const part = parts[index];
        document.getElementById('id').value = part.id;
        document.getElementById('name').value = part.name;
        document.getElementById('description').value = part.description;
        document.getElementById('price').value = part.price;
        document.getElementById('quantity').value = part.quantity;

        formTitle.textContent = 'Editar Parte';
        submitBtn.textContent = 'Actualizar';
        isEditing = true;
        editIndex = index;
        formModal.style.display = 'block';
    }

    window.deletePart = function (index) {
        parts.splice(index, 1);
        localStorage.setItem('parts', JSON.stringify(parts));
        loadParts();
    }

    loadParts();
});

document.addEventListener('DOMContentLoaded', () => {
    const ordersTable = document.getElementById('ordersTable').getElementsByTagName('tbody')[0];
    const orderForm = document.getElementById('orderForm');
    const orderIdInput = document.getElementById('orderId');
    const descriptionInput = document.getElementById('description');

    let orders = [
        { id: 1, description: 'Pedido 1' },
        { id: 2, description: 'Pedido 2' }
    ];

    const renderOrders = () => {
        ordersTable.innerHTML = '';
        orders.forEach(order => {
            const row = ordersTable.insertRow();
            row.insertCell(0).textContent = order.id;
            row.insertCell(1).textContent = order.description;
            const actionsCell = row.insertCell(2);
            const editButton = document.createElement('button');
            editButton.textContent = 'Editar';
            editButton.addEventListener('click', () => editOrder(order.id));
            actionsCell.appendChild(editButton);
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Borrar';
            deleteButton.addEventListener('click', () => deleteOrder(order.id));
            actionsCell.appendChild(deleteButton);
        });
    };

    const editOrder = (id) => {
        const order = orders.find(o => o.id === id);
        orderIdInput.value = order.id;
        descriptionInput.value = order.description;
    };

    const deleteOrder = (id) => {
        orders = orders.filter(o => o.id !== id);
        renderOrders();
    };

    orderForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = orderIdInput.value;
        const description = descriptionInput.value;
        if (id) {
            const order = orders.find(o => o.id == id);
            order.description = description;
        } else {
            const newOrder = {
                id: orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1,
                description
            };
            orders.push(newOrder);
        }
        orderIdInput.value = '';
        descriptionInput.value = '';
        renderOrders();
    });

    renderOrders();
});
document.addEventListener('DOMContentLoaded', () => {

});
