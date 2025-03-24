const API_URL = "https://jsonplaceholder.typicode.com/todos/";

async function loadData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const table = document.getElementById("data-table");
    table.innerHTML = "";

    data.slice(0, 10).forEach(item => {
      const row = `
        <tr class="hover:bg-gray-100 transition">
          <td class="border p-3">${item.id}</td>
          <td class="border p-3">${item.title}</td>
          <td class="border p-3">
            <span class="${item.completed ? 'text-green-500' : 'text-red-500'}">
              ${item.completed ? "✅ Completed" : "❌ Not Completed"}
            </span>
          </td>
        </tr>
      `;
      table.innerHTML += row;
    });

  } catch (error) {
    console.error("Failed to fetch data:", error);
  }
}

function clearTable() {
  document.getElementById("data-table").innerHTML = "";
}
