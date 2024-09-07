document.addEventListener("DOMContentLoaded", () => {
    const toggleButtons = document.querySelectorAll<HTMLButtonElement>("[id^='toggle']");
    
    toggleButtons.forEach(button => {
      const contentId = button.id.replace('toggle', '').toLowerCase() + '-content';
      const content = document.getElementById(contentId) as HTMLElement;
  
      button.addEventListener("click", () => {
        if (content.style.display === "none" || !content.style.display) {
          content.style.display = "block";
          button.classList.add("active");
        } else {
          content.style.display = "none";
          button.classList.remove("active");
        }
      });
    });
  });
  