// ===== UCC Gigs - JavaScript =====

// 1. Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {

  // 2. Grab the gig list and the search box
  const gigs = document.querySelectorAll(".gig");
  const searchInput = document.getElementById("search");

  // 3. Live search: hide gigs that don't match what you type
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      const query = searchInput.value.toLowerCase();
      gigs.forEach(function (gig) {
        const text = gig.textContent.toLowerCase();
        gig.style.display = text.includes(query) ? "block" : "none";
      });
    });
  }

  // 4. "Post a gig" form: adds new gigs to the list
  const form = document.getElementById("gig-form");
  const gigList = document.getElementById("gig-list");

  if (form && gigList) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const title = document.getElementById("gig-title").value.trim();
      const desc  = document.getElementById("gig-desc").value.trim();

      if (!title || !desc) return;

      const newGig = document.createElement("div");
      newGig.className = "gig";

      const h3 = document.createElement("h3");
      h3.textContent = title;

      const p = document.createElement("p");
      p.textContent = desc;

      newGig.appendChild(h3);
      newGig.appendChild(p);
      gigList.appendChild(newGig);

      // Save new gig to phone storage so it survives refresh
      const saved = JSON.parse(localStorage.getItem("uccGigs") || "[]");
      saved.push({ title: title, desc: desc });
      localStorage.setItem("uccGigs", JSON.stringify(saved));

      form.reset();
    });

    // Load any gigs saved earlier
    const saved = JSON.parse(localStorage.getItem("uccGigs") || "[]");
    saved.forEach(function (g) {
      const newGig = document.createElement("div");
      newGig.className = "gig";
      newGig.innerHTML = "<h3>" + g.title + "</h3><p>" + g.desc + "</p>";
      gigList.appendChild(newGig);
    });
  }
});
