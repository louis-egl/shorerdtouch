document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('order-form');
  if (!form) return; // Don't run if the form doesn't exist

  const preview = document.getElementById('jersey-preview');
  const confirmation = document.getElementById('confirmation');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const team = document.getElementById('team').value;
    const size = document.getElementById('size').value;
    const number = document.getElementById('number').value;
    const backName = document.getElementById('backName').value.trim();

    try {
      const res = await fetch('teamData.json');
      const teamData = await res.json();

      if (!teamData[team] || !teamData[team].includes(name)) {
        alert("You're not listed in this team!");
        return;
      }

      preview.innerHTML = `Jersey for ${name} in ${team} (Size: ${size}, #${number}, Name: ${backName})`;
      confirmation.innerText = "✅ Registration complete (no payment yet)";
      confirmation.style.display = 'block';
      form.reset();
    } catch (err) {
      alert("Could not load team list.");
      console.error(err);
    }
  });
});
