function hidElementById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.add("hidden");
}

function showElementById(elementId) {
  const element = document.getElementById(elementId);
  element.classList.remove("hidden");
}

const loadPostSearch = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`
  );
  const data = await res.json();
  posts = data.posts;
  displayPosts(posts);
};

const loadPost = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/posts`
  );
  const data = await res.json();
  posts = data.posts;
  displayPosts(posts);
};

const displayPosts = (posts) => {
  const postContainer = document.getElementById("post-container");

  // clear existing content;
  postContainer.textContent = "";

  

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = `p-5 bg-[#12132D0D] rounded-2xl `;

   

    postCard.innerHTML = `
        <div class="px-5 flex gap-5 ">
          <div class="relative">
          <img class="w-16 h-16 lg:rounded-full" src="${post.image}" alt="">
          ${post.isActive ? '<img class="w-5 h-5 absolute top-1" src="images/Status_green.png" alt="">' : '<img class="w-5 h-5 absolute top-1" src="images/Status.png" alt="">' }
          </div>
          

          <div class="">
          <div>
            <div class="flex  lg:gap-20">
              <p class="opacity-90"># <span >${post.category}</span></p>
              <p class="opacity-90">Author: <span>${post.author.name}</span></p>
            </div>
            <p class="font-bold text-lg pt-5">${post.title}</p>
            <p class="opacity-90 pb-5">${post.description} </p>
            <hr class="border-dashed border-gray-400">
          </div>
          <div class="flex flex-col lg:flex-row items-center lg:justify-between py-5">
            <div class=" flex flex-col lg:flex-row lg:gap-4 ">
            <img class="w-8 h-8 " src="images/text.png" alt="">
            <p class="opacity-90">${post.comment_count}</p>
            <img class="w-8 h-8 " src="images/eye.png" alt="">
            <p class="opacity-90">${post.view_count}</p>
            <img class="w-8 h-8 " src="images/clock.png" alt="">
            <p class="opacity-90">${post.posted_time} min</p>
          </div>
          <div>
            <img src="images/message.png" alt="">
          </div>
          </div>
        </div>

        </div>
        `;

    postContainer.appendChild(postCard);
    
  });
};

const handleSearch = () => {
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPostSearch(searchText);
};

loadPost();
