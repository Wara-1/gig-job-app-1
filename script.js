function registerUser(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const role = document.getElementById('role').value;
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  users.push({ username, role });
  localStorage.setItem('users', JSON.stringify(users));
  alert('ลงทะเบียนเรียบร้อย');
}

function postJob(event) {
  event.preventDefault();
  const title = document.getElementById('jobTitle').value;
  const desc = document.getElementById('jobDesc').value;
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  jobs.push({ title, desc, bookedBy: null, rating: null });
  localStorage.setItem('jobs', JSON.stringify(jobs));
  alert('โพสต์งานเรียบร้อย');
}

function loadJobs() {
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  const jobList = document.getElementById('jobList');
  jobList.innerHTML = '';
  jobs.forEach((job, i) => {
    if (!job.bookedBy) {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${job.title}</strong><br>${job.desc}<br>
      <button onclick="bookJob(${i})">จองงานนี้</button><hr>`;
      jobList.appendChild(div);
    }
  });
}

function bookJob(index) {
  const name = prompt('กรุณาใส่ชื่อผู้จองงาน:');
  if (name) {
    const jobs = JSON.parse(localStorage.getItem('jobs'));
    jobs[index].bookedBy = name;
    localStorage.setItem('jobs', JSON.stringify(jobs));
    alert('จองงานสำเร็จ');
    const rating = prompt('ให้คะแนนนายจ้าง 1-5 ดาว:');
    jobs[index].rating = parseInt(rating);
    localStorage.setItem('jobs', JSON.stringify(jobs));
  }
}

function showRatings() {
  const jobs = JSON.parse(localStorage.getItem('jobs') || '[]');
  const ratingsDiv = document.getElementById('ratings');
  ratingsDiv.innerHTML = '';
  jobs.forEach(job => {
    if (job.rating != null) {
      const div = document.createElement('div');
      div.innerHTML = `งาน: ${job.title} | คะแนน: ${job.rating} ดาว`;
      ratingsDiv.appendChild(div);
    }
  });
}