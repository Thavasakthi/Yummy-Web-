document.addEventListener('DOMContentLoaded', () => {
  const menuLinks = document.querySelectorAll('.menu');
  const sections = document.querySelectorAll('main section[id]');
  const contactForm = document.querySelector('.contact-form');
  const bookingButtons = document.querySelectorAll('.button, .btn');

  menuLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menuLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        menuLinks.forEach((link) => {
          const sectionId = link.getAttribute('href');
          link.classList.toggle('active', sectionId === `#${entry.target.id}`);
        });
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));

  bookingButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('Contact')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('name')?.focus();
    });
  });

  if (!contactForm) return;

  const statusMessage = document.createElement('p');
  statusMessage.className = 'form-status';
  contactForm.appendChild(statusMessage);

  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim();
    const email = document.getElementById('email')?.value.trim();
    const subject = document.getElementById('subject')?.value.trim();

    if (!name || !email || !subject) {
      statusMessage.textContent = 'Please fill in your name, email and subject.';
      statusMessage.style.color = '#ce1212';
      return;
    }

    statusMessage.textContent = `Thanks ${name}! Your message has been sent.`;
    statusMessage.style.color = '#0b8e5d';
    contactForm.reset();
  });
});
