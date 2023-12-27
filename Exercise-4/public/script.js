function getRandomNumber() {
  return Math.floor(Math.random() * 72395) + 1;
}

async function updateList() {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    
    if (response.ok) {
      const result = await response.json();
      displayCards(result.data);
    } else {
      console.error("Error with initial fetch. Status:", response.status);
    }
  } catch (error) {
    console.error("Error with initial fetch:", error);
  }
}

function displayCards(data) {
  const cardsContainer = document.querySelector("#cards");
  cardsContainer.innerHTML = "";

  if (Array.isArray(data)) {
    data.forEach((book) => {
      const template = document
        .getElementById("card-template")
        .content.cloneNode(true);

      template.querySelector(".card-id").innerText = `Book ID: ${book._id}`;
      template.querySelector(".card-title").innerText = `Title: ${book.title}`;

      const authorsContainer = template.querySelector(".card-authors");
      const authorNames = `Authors: ${book.authors.map((author) => author.name).join(', ')}`;
      authorsContainer.innerText = authorNames;

      cardsContainer.appendChild(template);
    });
  } else {
    console.error("Data is not an array:", data);
  }
}


async function deleteRandomBook() {
  try {
    const response = await fetch("http://localhost:8080/api/posts");
    const result = await response.json();
    const data = await result.data

    if (Array.isArray(data)) {
      const ids = data.map((book) => book._id);

      if (ids.length === 0) {
        console.error("Error: No books found in the array.");
        return;
      }

      const randomIndex = Math.floor(Math.random() * ids.length);
      const randomId = ids[randomIndex];

      const deleteResponse = await fetch(
        `http://localhost:8080/api/posts/${randomId}`,
        {
          method: "DELETE",
        }
      );

      if (deleteResponse.ok) {
        console.log(`Book with ID ${randomId} deleted successfully.`);
        updateList();
      } else {
        console.error(`Failed to delete book with ID ${randomId}.`);
      }
    } else {
      console.error("Error: Received data is not an array.", data);
    }
  } catch (error) {
    console.error("Error deleting book:", error);
  }
}


async function getRandomBook() {
  try {
    const randomId = getRandomNumber();
    const response = await fetch(`https://gutendex.com/books/${randomId}`);
    const data = await response.json();

    const postData = {
      _id: data.id,
      title: data.title,
      authors: data.authors.map((author) => ({ name: author.name })),
    };

    const createResponse = await fetch(
      "http://localhost:8080/api/posts/create",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      }
    );

    const createData = await createResponse.json();
    console.log("New post created:", createData);
    updateList();
  } catch (error) {
    console.error("Error encountered:", error);
  }
}

updateList();
