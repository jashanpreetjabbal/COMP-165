document.addEventListener('DOMContentLoaded', () => {
    const messages = document.querySelector('#messages');
    messages.style.display = 'none';
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', submitForm);
    hideFormFetchDataWithAsyncAwait();
});
async  function submitForm() {
    const name = document.querySelector('#name').value.trim();
    const feedback = document.querySelector('#feedback').value.trim();
    if (name || feedback) {
        const data = {
        name: name,
        feedback: feedback
        };
        try {
            const response = await fetch('https://comp-165-default-rtdb.firebaseio.com/msg.json', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error('Error saving data');
            }
            //hideForm();
            hideFormFetchDataWithAsyncAwait();
        } catch (error) {
            console.error('Error saving data: ', error.message);
        }
    } else {
        alert('Please fill in the field of course feedback.');
    }

}
   function hideForm() {
    const submitForm = document.querySelector('#submitForm');
    const messages = document.querySelector('#messages');

    //submitForm.style.display = 'none';
    messages.style.display = 'block';
   }
   const databaseRef = new EventSource('https://comp-165-default-rtdb.firebaseio.com/msg.json');
         databaseRef.addEventListener('put', async (event) => {
             try {
                 const newData = JSON.parse(event.data);
                 const messageData = newData.data;
                 if (messageData.name || messageData.feedback) { // Check if data is valid
                     dataContainer.innerHTML += `
                     <p><u><strong>Name:</strong>${messageData.name}</u>
                             <strong>Messages:</strong>${messageData.feedback}</p>
                     `;
                 }
             } catch (error) {
                 console.error('Error handling real-time update:', error);
             }
        });
        
async function hideFormFetchDataWithAsyncAwait() {
    hideForm();
    // Add your code here to fetch data from this url:
    // 'https://lab6-165-default-rtdb.firebaseio.com/msg.json'
    // And present the data on the webpage.
    try {
        const response = await fetch('https://comp-165-default-rtdb.firebaseio.com/msg.json');
        const data = await response.json();
        const dataContainer = document.querySelector('#messages');
        dataContainer.innerHTML = "<h2>Messages</h2>";
        for (const postId in data) {
            const post = data[postId];
            dataContainer.innerHTML += `
                    <p><u><strong>Name:</strong> ${post.name}</u>
                        <strong>Messages:</strong> ${post.feedback}</p>
            `;
        }  
    } catch (error) {
        throw new Error('Error fetching data:', error);
    }
}

        // Subscribe to real-time updates
    const datatbaseRef = new EventSource('https://comp-165-default-rtdb.firebaseio.com/msg.json');
        databaseRef.addEventListener('put', async (event) => {
             try {
                 const newData = JSON.parse(event.data);
                 const messageData = newData.data;
                 if (messageData.name || messageData.feedback) { // Check if data is valid
                     dataContainer.innerHTML += `
                     <p><u><strong>Name:</strong>${messageData.name}</u>
                             <strong>Messages:</strong>${messageData.feedback}</p>
                     `;
                 }
             } catch (error) {
                 console.error('Error handling real-time update:', error);
             }
        });
         
