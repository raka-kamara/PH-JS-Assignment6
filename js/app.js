
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
loadPost();

// display main posts.
const displayPosts = (posts) => {
  const postContainer = document.getElementById("post-container");

  // clear existing content;
  postContainer.textContent = "";

  const postClicked = document.getElementById("post_clicked");

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = `p-5 bg-[#12132D0D] rounded-2xl card shadow`;

    postCard.innerHTML = `
        <div class="px-5 lg:flex gap-5 ">
          <div class="relative">
          <img class="w-16 h-16 rounded-full" src="${post.image}" alt="">
          ${
            post.isActive
              ? '<img class="w-5 h-5 absolute top-1" src="images/Status_green.png" alt="">'
              : '<img class="w-5 h-5 absolute top-1" src="images/Status.png" alt="">'
          }
          </div>
          

          <div class="w-full">
          <div class="w-full">
            <div class="flex  lg:gap-20 w-full">
              <p class="opacity-90"># <span >${post.category}</span></p>
              <p class="opacity-90">Author: <span>${post.author.name}</span></p>
            </div>
            <p class="font-bold text-lg pt-5">${post.title}</p>
            <p class="opacity-90 pb-5">${post.description} </p>
            <hr class="border-dashed border-gray-400">
          </div>
          <div class="flex flex-col lg:flex-row items-center lg:justify-between py-5 w-full">
            <div class=" flex flex-col lg:flex-row lg:gap-4 ">
            <img class="w-8 h-8 " src="images/text.png" alt="">
            <p class="opacity-90">${post.comment_count}</p>
            <img class="w-8 h-8 " src="images/eye.png" alt="">
            <p class="opacity-90">${post.view_count}</p>
            <img class="w-8 h-8 " src="images/clock.png" alt="">
            <p class="opacity-90">${post.posted_time} min</p>
          </div>
          <div>
            <img id="clickButton" onclick="handleMsg('${post.title}', '${post.view_count}')" class="btn rounded-full " id="" src="images/message.png" alt="">
          </div>
          </div>
        </div>

        </div>`;

       

    postContainer.appendChild(postCard);
  });
  // hide loading spinner
  spinner(false);
};






// latest post section
const loadLatestPostSearch = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/retro-forum/latest-posts`
  );
  const data = await res.json();
  posts = data;
  displayLatestPosts(posts);
};

loadLatestPostSearch();


const displayLatestPosts = (posts) => {
  const latestPostContainer = document.getElementById("latest-postcontainer");

  posts.forEach((post) => {
    const postCard = document.createElement("div");
    postCard.classList = `py-10 `;

    postCard.innerHTML = `<div class="card w-fit lg:w-96 bg-base-100 shadow-xl ">
    <figure><img src="${post.cover_image}" alt="Shoes" /></figure>
    <div class="card-body">
      <p>${
        post.author.posted_date ? post.author.posted_date : "No publish date"
      }</p>
      <h2 class="card-title">  ${post.title}  </h2>
      <p class="opacity-90">${post.description}</p>
      <div class="card-actions justify-start">
        <div> <img class="h-16 w-16 rounded-full" src="${
          post.profile_image
        }" alt=""> </div> 
        <div class="opacity-90">
          <p>${post.author.name}</p>
          <p>${
            post.author.designation ? post.author.designation : "Unknown"
          }</p>
        </div>
      </div>
    </div>
  </div>
  `;

    latestPostContainer.appendChild(postCard);
  });
};


// search input function
const handleSearch = () => {
  spinner(true);
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;
  loadPostSearch(searchText);
};


// spinner function
const spinner = (isLoading) => {
  const spinner = document.getElementById("loading");
  if (isLoading) {
    spinner.classList.remove("hidden");
    setTimeout(() => {
      spinner.classList.add("hidden");
    }, 2000);
  } else {
    spinner.classList.add("hidden");
  }
};






let count = 0;

// Event delegation for dynamically generated click buttons
document.addEventListener('click', function(event) {
  if (event.target && event.target.id === 'clickButton') {
    const title = event.target.getAttribute('data-title');
    const view = event.target.getAttribute('data-view');
    if (title && view) {
      handleMsg(title, view);
    }
  }
});

// Function to handle message click
const handleMsg = (title, view) => {
  console.log("Handling message for:", title);
  const postClicked = document.getElementById("mark-read");
  const postCardClicked = document.createElement("div");

  postCardClicked.innerHTML = `
    <div class="flex gap-5 bg-white p-5 rounded-xl my-5 w-full">
      <p class="text-base font-semibold">${title}</p>
      <img class="w-8 h-8" src="images/eye.png" alt="">
      <p class="opacity-90">${view}</p>
    </div>`;

  postClicked.appendChild(postCardClicked);

  // Increment count and update display
  count++;
  document.getElementById('countDisplay').innerHTML = count;
};
