// Load from localStorage on page load
document.addEventListener("DOMContentLoaded", showJobs);

document.getElementById("job-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const jobTitle = document.getElementById("job-title").value;
  const companyName = document.getElementById("company-name").value;
  const status = document.getElementById("status").value;

  const job = { jobTitle, companyName, status };

  // Save to localStorage
  let jobs = JSON.parse(localStorage.getItem("jobs")) || [];
  jobs.push(job);
  localStorage.setItem("jobs", JSON.stringify(jobs));

  showJobs(); // Re-render list
  this.reset(); // Clear form
});

function showJobs() {
  const jobList = document.getElementById("job-list");
  jobList.innerHTML = ""; // Clear existing list

  const jobs = JSON.parse(localStorage.getItem("jobs")) || [];

  jobs.forEach((job, index) => {
    const li = document.createElement("li");
    li.textContent = `${job.jobTitle} at ${job.companyName}`;
    if (job.status === "Applied") {
      li.setAttribute("data-status", "[Applied]");
    } else {
      li.innerHTML += ` — [${job.status}]`;
    }
    jobList.appendChild(li);
  });
}
