document.addEventListener("DOMContentLoaded", () => {
    const topicsContainer = document.getElementById("topics");
    const postButton = document.getElementById("post-topic");

    // Load topics from LocalStorage
    function loadTopics() {
        const topics = JSON.parse(localStorage.getItem("topics")) || [];
        topicsContainer.innerHTML = "";

        topics.forEach((topic, index) => {
            const div = document.createElement("div");
            div.className = "topic";
            div.innerHTML = `
                <a href="#">${topic.title}</a>
                <p>${topic.description}</p>
                <button onclick="deleteTopic(${index})">Delete</button>
            `;
            topicsContainer.appendChild(div);
        });
    }

    // Post new topic
    postButton.addEventListener("click", () => {
        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();

        if (!title || !description) {
            alert("Please fill in both fields.");
            return;
        }

        const topics = JSON.parse(localStorage.getItem("topics")) || [];
        topics.push({ title, description });
        localStorage.setItem("topics", JSON.stringify(topics));

        document.getElementById("title").value = "";
        document.getElementById("description").value = "";
        loadTopics();
    });

    // Delete topic
    window.deleteTopic = (index) => {
        const topics = JSON.parse(localStorage.getItem("topics")) || [];
        topics.splice(index, 1);
        localStorage.setItem("topics", JSON.stringify(topics));
        loadTopics();
    };

    loadTopics();
});
