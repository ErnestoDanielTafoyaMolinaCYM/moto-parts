const form = document.querySelector('form');
const button = document.querySelector('button');

// Asegúrate de agregar el listener al formulario
form.addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    const part = {
        id: formData.get('idParte'),
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
    };

    try {
        const response = await fetch(`/part/${part.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(part)
        });

        if (response.ok) {
            window.location.href = '/';  // Redirige a la página principal si la respuesta es correcta
        } else {
            alert('Error al editar la parte');
        }
    } catch (error) {
        console.error(error);
        alert('Error al editar la parte');
    }
});
