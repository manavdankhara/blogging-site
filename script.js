// Default blogs

let blogs = JSON.parse(localStorage.getItem("blogs")) || [
    {
        title: "The Future of Technology",
        author: "manav",
        category: "Technology",
        content: "Technology is changing our lives every day. Artificial intelligence, cloud computing and modern web technologies are creating new opportunities."
    },

    {
        title: "Why Education Matters",
        author: "manav",
        category: "Education",
        content: "Education helps us develop knowledge, skills and confidence. Learning continuously can help us achieve our personal and professional goals."
    },

    {
        title: "My Travel Experience",
        author: "manav",
        category: "Travel",
        content: "Travel gives us an opportunity to explore new places, meet new people and experience different cultures."
    }
];


// Display blogs

function displayBlogs(list = blogs) {

    const container = document.getElementById("blogContainer");

    container.innerHTML = "";

    if (list.length === 0) {
        container.innerHTML = "<p>No blogs found.</p>";
        return;
    }

    list.forEach((blog, index) => {

        const card = document.createElement("div");

        card.className = "blog-card";

        card.innerHTML = `
            <span class="category">${blog.category}</span>

            <h3>${blog.title}</h3>

            <div class="author">
                By ${blog.author}
            </div>

            <p>${blog.content}</p>

            <div class="card-buttons">

                <button
                    class="edit-btn"
                    onclick="editBlog(${index})">
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteBlog(${index})">
                    Delete
                </button>

            </div>
        `;

        container.appendChild(card);
    });
}


// Add Blog

document.getElementById("blogForm").addEventListener("submit", function(event) {

    event.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const category = document.getElementById("category").value;
    const content = document.getElementById("content").value;

    const newBlog = {
        title: title,
        author: author,
        category: category,
        content: content
    };

    blogs.push(newBlog);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    displayBlogs();

    this.reset();

    alert("Blog published successfully!");

    document.getElementById("blogs").scrollIntoView();
});


// Delete Blog

function deleteBlog(index) {

    if (confirm("Are you sure you want to delete this blog?")) {

        blogs.splice(index, 1);

        localStorage.setItem("blogs", JSON.stringify(blogs));

        displayBlogs();
    }
}


// Edit Blog

function editBlog(index) {

    const blog = blogs[index];

    document.getElementById("title").value = blog.title;
    document.getElementById("author").value = blog.author;
    document.getElementById("category").value = blog.category;
    document.getElementById("content").value = blog.content;

    blogs.splice(index, 1);

    localStorage.setItem("blogs", JSON.stringify(blogs));

    document.getElementById("add-blog").scrollIntoView();

}


// Search Blogs

document.getElementById("searchInput").addEventListener("input", filterBlogs);

document.getElementById("categoryFilter").addEventListener("change", filterBlogs);


function filterBlogs() {

    const searchText =
        document.getElementById("searchInput").value.toLowerCase();

    const selectedCategory =
        document.getElementById("categoryFilter").value;

    const filtered = blogs.filter(function(blog) {

        const matchesSearch =
            blog.title.toLowerCase().includes(searchText) ||
            blog.content.toLowerCase().includes(searchText) ||
            blog.author.toLowerCase().includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            blog.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBlogs(filtered);
}


// Dark Mode

const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", function() {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeBtn.textContent = "☀️";

        localStorage.setItem("theme", "dark");

    } else {

        themeBtn.textContent = "🌙";

        localStorage.setItem("theme", "light");
    }
});


// Load saved theme

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeBtn.textContent = "☀️";
}


// Display blogs when page loads

displayBlogs();