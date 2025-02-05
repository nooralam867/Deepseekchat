document.getElementById('chatForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const textInput = document.getElementById('textInput').value;
    const imageInput = document.getElementById('imageInput').files;

    if (!textInput && imageInput.length === 0) {
        alert('Please enter text or upload images.');
        return;
    }

    const formData = new FormData();
    formData.append('text', textInput);

    for (let i = 0; i < imageInput.length; i++) {
        formData.append('images', imageInput[i]);
    }

    try {
        const response = await fetch('https://api.deepseek.com/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-205a054430a74656b7de9b9b059efd16'
            },
            body: formData
        });

        const data = await response.json();
        document.getElementById('response').innerText = JSON.stringify(data, null, 2);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('response').innerText = 'An error occurred while processing your request.';
    }
});
