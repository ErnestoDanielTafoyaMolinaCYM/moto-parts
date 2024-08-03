const form = document.querySelector('form');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);

    const part = {
        name: formData.get('name'),
        description: formData.get('description'),
        price: formData.get('price'),
    };

    try {
        const response = await fetch('/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(part)
        });

        if (response.ok) {
            window.location.href = '/';  // Redirige a la página principal si la respuesta es correcta
        } else {
            alert('Error al crear la parte');
        }

    } catch (error) {
        console.error(error);
        alert('Error al crear la parte');
    }
});
    