const newFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#patient-name').value.trim();
  const age = document.querySelector('#patient-age').value.trim();
  const weight = document.querySelector('#patient-weight').value.trim();
  const height = document.querySelector('#patient-height').value.trim();
  const description = document.querySelector('#patient-desc').value.trim();

  if (name && age && weight && height && description) {
    try {
      const response = await fetch('/api/patients', {
        method: 'POST',
        body: JSON.stringify({ name, age, weight, height, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to create patient: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An unexpected error occurred while creating the patient.');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.classList.contains('delete-patient-btn')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/patient/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const errorMessage = await response.text();
        alert(`Failed to delete patient: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Error during fetch:', error);
      alert('An unexpected error occurred while deleting the patient.');
    }
  }
};

// Use a higher-level parent element for event delegation
document.body.addEventListener('submit', (event) => {
  if (event.target.classList.contains('new-patient-form')) {
    newFormHandler(event);
  }
});

document.body.addEventListener('click', delButtonHandler);
