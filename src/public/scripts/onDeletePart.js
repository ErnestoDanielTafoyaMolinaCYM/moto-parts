const deleteBtns = document.querySelectorAll('.delete');

deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', async(e) => {
        const id = deleteBtn.getAttribute('data-id');

        try {
            const response = await fetch(`/part/${id}`, {
                method: 'DELETE'
            });
            if (response.ok) {
                window.location.href = '/';  // Redirige a la página principal si la respuesta es correcta
            } else {
                alert('Error al eliminar la parte');
            }
        } catch (error) {
            console.error(error);
            alert('Error al eliminar la parte');
        }
    });
})